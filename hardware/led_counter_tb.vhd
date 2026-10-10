library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;
use std.env.all;

entity led_counter_tb is end entity;
architecture test of led_counter_tb is
  signal clk : std_logic := '0';
  signal reset : std_logic := '1';
  signal led, fast_led : std_logic_vector(3 downto 0);
begin
  clk <= not clk after 5 ns;
  dut: entity work.led_counter generic map (TICK_CYCLES => 3)
    port map (clk => clk, reset => reset, led => led);
  boundary_dut: entity work.led_counter generic map (TICK_CYCLES => 1)
    port map (clk => clk, reset => reset, led => fast_led);

  process
    procedure edges(amount : positive) is
    begin
      for index in 1 to amount loop
        wait until rising_edge(clk);
        wait for 1 ns;
      end loop;
    end procedure;
    variable expected : natural;
  begin
    edges(4);
    assert led = "0000" and fast_led = "0000"
      report "Held synchronized reset must clear both counters" severity failure;
    reset <= '0';
    -- Two edges transport the button level; old synchronized reset still acts on edge two.
    edges(2);
    assert led = "0000" and fast_led = "0000"
      report "Reset release must pass through both synchronizer stages" severity failure;
    for index in 1 to 48 loop
      edges(1);
      expected := (index / 3) mod 16;
      assert unsigned(led) = to_unsigned(expected, 4)
        report "Divider interval or modulo-16 wrap is wrong" severity failure;
      assert unsigned(fast_led) = to_unsigned(index mod 16, 4)
        report "TICK_CYCLES=1 must count every edge" severity failure;
      wait until falling_edge(clk);
      wait for 1 ns;
      assert unsigned(led) = to_unsigned(expected, 4)
        report "Counter must hold between rising edges" severity failure;
    end loop;
    edges(3);
    assert led = "0001" report "Prepare a nonzero value before reset" severity failure;
    reset <= '1';
    wait for 1 ns;
    assert led = "0001" report "Button must not clear the counter asynchronously" severity failure;
    edges(3);
    assert led = "0000" and fast_led = "0000"
      report "Reset must override a nonzero count after synchronization" severity failure;
    edges(3);
    assert led = "0000" report "Holding reset must keep LEDs off" severity failure;
    report "LED counter: divider, wrap, edge hold, synchronizer and reset passed";
    stop;
    wait;
  end process;
end architecture;
