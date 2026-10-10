library ieee;
use ieee.std_logic_1164.all;
use std.env.all;

entity and_gate_tb is end entity;
architecture test of and_gate_tb is
  signal a, b, y : std_logic := '0';
begin
  dut: entity work.and_gate port map (a => a, b => b, y => y);
  process
  begin
    a <= '0'; b <= '0'; wait for 10 ns;
    assert y = '0' report "00 must produce 0" severity failure;
    a <= '0'; b <= '1'; wait for 10 ns;
    assert y = '0' report "01 must produce 0" severity failure;
    a <= '1'; b <= '0'; wait for 10 ns;
    assert y = '0' report "10 must produce 0" severity failure;
    a <= '1'; b <= '1'; wait for 10 ns;
    assert y = '1' report "11 must produce 1" severity failure;
    report "AND-Gate: all four switch combinations passed";
    stop;
    wait;
  end process;
end architecture;
