# Selected Basys 3 rev B pins from Digilent's official master XDC:
# https://github.com/Digilent/digilent-xdc/blob/master/Basys-3-Master.xdc
set_property -dict {PACKAGE_PIN V17 IOSTANDARD LVCMOS33} [get_ports a]
set_property -dict {PACKAGE_PIN V16 IOSTANDARD LVCMOS33} [get_ports b]
set_property -dict {PACKAGE_PIN U16 IOSTANDARD LVCMOS33} [get_ports y]
set_property CONFIG_VOLTAGE 3.3 [current_design]
set_property CFGBVS VCCO [current_design]
# Manual switches and an indicator have no external synchronous timing contract.
set_false_path -from [get_ports {a b}] -to [get_ports y]
