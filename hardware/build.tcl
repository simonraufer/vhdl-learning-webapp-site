# Build either example for Basys 3. Never connect to or program hardware.
# Usage: vivado -mode batch -source hardware/build.tcl -tclargs and|counter
if {$argc != 1 || [lindex $argv 0] ni {and counter}} {
    error "Choose one lesson: -tclargs and or -tclargs counter"
}
set lesson [lindex $argv 0]
set root [file dirname [file normalize [info script]]]
set top [expr {$lesson eq "and" ? "and_gate" : "led_counter"}]
set output [file join $root build $lesson]
if {[llength [get_parts -quiet xc7a35tcpg236-1]] == 0} {
    error "Basys 3 target xc7a35tcpg236-1 is unavailable. Add Artix-7 device support to Vivado and check your license tier before building."
}
create_project -force basys3_$lesson $output -part xc7a35tcpg236-1
set_property target_language VHDL [current_project]
add_files [file join $root ${top}.vhd]
set_property file_type {VHDL 2008} [get_files ${top}.vhd]
add_files -fileset constrs_1 [file join $root ${top}.xdc]
add_files -fileset sim_1 [file join $root ${top}_tb.vhd]
set_property file_type {VHDL 2008} [get_files ${top}_tb.vhd]
set_property top $top [get_filesets sources_1]
set_property top ${top}_tb [get_filesets sim_1]
update_compile_order -fileset sources_1
launch_runs synth_1 -jobs 2
wait_on_run synth_1
if {[get_property PROGRESS [get_runs synth_1]] ne "100%"} {error "Synthesis failed; inspect synth_1/runme.log"}
launch_runs impl_1 -to_step write_bitstream -jobs 2
wait_on_run impl_1
if {[get_property PROGRESS [get_runs impl_1]] ne "100%"} {error "Implementation failed; inspect impl_1/runme.log"}
open_run impl_1
report_timing_summary -file [file join $output timing_summary.rpt]
report_drc -file [file join $output drc.rpt]
report_utilization -file [file join $output utilization.rpt]
set errors [get_drc_violations -quiet -filter {SEVERITY == Error}]
if {[llength $errors] > 0} {error "DRC errors remain; inspect drc.rpt"}
if {$lesson eq "counter"} {
    foreach delay_type {max min} {
        set paths [get_timing_paths -quiet -delay_type $delay_type -max_paths 1]
        if {[llength $paths] == 0} {error "No internal counter timing path found"}
        if {[get_property SLACK [lindex $paths 0]] < 0} {error "Counter timing failed; inspect timing_summary.rpt"}
    }
} else {
    puts "AND example is combinational; manual switch/LED paths have no clock timing contract."
}
puts "Built $top. Bitstream: [file join $output basys3_${lesson}.runs impl_1 ${top}.bit]"
close_project
