library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

-- TICK_CYCLES uses the board's 100 MHz clock: 100,000,000 cycles = one second.
-- Use a small generic in a testbench without changing the hardware default.
entity led_counter is
  generic (TICK_CYCLES : positive := 100_000_000);
  port (
    clk : in std_logic;
    reset : in std_logic;
    led : out std_logic_vector(3 downto 0)
  );
end entity;

architecture rtl of led_counter is
  signal reset_meta : std_logic := '0';
  signal reset_sync : std_logic := '0';
  signal ticks : natural range 0 to TICK_CYCLES - 1 := 0;
  signal count : unsigned(3 downto 0) := (others => '0');
  attribute ASYNC_REG : string;
  attribute ASYNC_REG of reset_meta, reset_sync : signal is "TRUE";
begin
  led <= std_logic_vector(count);

  -- The pushbutton is asynchronous. Only the synchronized value controls state.
  -- Initialization is supported by this FPGA; it supplies a deterministic power-up state.
  process (clk)
  begin
    if rising_edge(clk) then
      reset_meta <= reset;
      reset_sync <= reset_meta;
      if reset_sync = '1' then
        ticks <= 0;
        count <= (others => '0');
      elsif ticks = TICK_CYCLES - 1 then
        ticks <= 0;
        count <= count + 1;
      else
        ticks <= ticks + 1;
      end if;
    end if;
  end process;
end architecture;
