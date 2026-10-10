library ieee;
use ieee.std_logic_1164.all;

-- Map a and b to SW0/SW1, and y to LED0 in and_gate.xdc.
entity and_gate is
  port (a, b : in std_logic; y : out std_logic);
end entity;

architecture rtl of and_gate is
begin
  y <= a and b;
end architecture;
