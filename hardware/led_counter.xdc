# Selected Basys 3 rev B pins from Digilent's official master XDC:
# https://github.com/Digilent/digilent-xdc/blob/master/Basys-3-Master.xdc
set_property -dict {PACKAGE_PIN W5 IOSTANDARD LVCMOS33} [get_ports clk]
create_clock -name board_clk -period 10.000 [get_ports clk]
set_property -dict {PACKAGE_PIN U18 IOSTANDARD LVCMOS33} [get_ports reset]
set_property -dict {PACKAGE_PIN U16 IOSTANDARD LVCMOS33} [get_ports {led[0]}]
set_property -dict {PACKAGE_PIN E19 IOSTANDARD LVCMOS33} [get_ports {led[1]}]
set_property -dict {PACKAGE_PIN U19 IOSTANDARD LVCMOS33} [get_ports {led[2]}]
set_property -dict {PACKAGE_PIN V19 IOSTANDARD LVCMOS33} [get_ports {led[3]}]
set_property CONFIG_VOLTAGE 3.3 [current_design]
set_property CFGBVS VCCO [current_design]
# Ignore only the asynchronous button-to-first-synchronizer input path.
# The synchronizer's second stage and all counter paths still require 100 MHz timing.
set_false_path -from [get_ports reset] -to [get_cells -hier -filter {NAME =~ *reset_meta_reg}]
# LEDs are human indicators, with no external device setup/hold requirement.
set_false_path -to [get_ports {led[*]}]
