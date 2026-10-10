import { LESSON_IDS } from './state.js';

/** Reference entries grouped by the course lesson that introduces them. */
export const COMPENDIUM = [
  {
    "lesson": 0,
    "keyword": "bit",
    "en": "A binary value: 0 or 1.",
    "de": "Ein binärer Wert: 0 oder 1.",
    "example": "'0'  '1'",
    "deKeyword": "Bit"
  },
  {
    "lesson": 0,
    "keyword": "input / output",
    "en": "Inputs enter a circuit; outputs leave it.",
    "de": "Eingänge führen in eine Schaltung; Ausgänge führen heraus.",
    "example": "a, b → circuit → y",
    "deKeyword": "Eingang / Ausgang"
  },
  {
    "lesson": 0,
    "keyword": "truth table",
    "en": "Lists the output for every input combination. Two input bits give four rows.",
    "de": "Zeigt den Ausgang für jede Eingangskombination. Zwei Bits ergeben vier Zeilen.",
    "example": "00 → 0\n01 → 0\n10 → 0\n11 → 1",
    "deKeyword": "Wahrheitstabelle"
  },
  {
    "lesson": 0,
    "keyword": "concurrency",
    "en": "Hardware connections act at the same time; source order is not execution order between concurrent assignments.",
    "de": "Hardwareverbindungen wirken gleichzeitig; die Quelltextreihenfolge bestimmt nicht die Ausführungsreihenfolge nebenläufiger Zuweisungen.",
    "example": "a → circuit 1\na → circuit 2",
    "deKeyword": "Gleichzeitigkeit"
  },
  {
    "lesson": 1,
    "keyword": "library / use",
    "en": "library names a library; use makes declarations from a package available. These lines enable the standard logic types.",
    "de": "library nennt eine Bibliothek; use macht Deklarationen eines Packages verfügbar. Diese Zeilen stellen die Standard-Logiktypen bereit.",
    "example": "library ieee;\nuse ieee.std_logic_1164.all;",
    "deKeyword": "library / use"
  },
  {
    "lesson": 1,
    "keyword": "entity / is / end",
    "en": "The entity declares a circuit interface. is begins its declaration; end closes it.",
    "de": "Die Entity deklariert die Schnittstelle. is beginnt die Deklaration; end schließt sie.",
    "example": "entity and_gate is\n  port (a, b : in std_logic; y : out std_logic);\nend entity;",
    "deKeyword": "entity / is / end"
  },
  {
    "lesson": 1,
    "keyword": "port / in / out",
    "en": "Ports connect a circuit to its surroundings. in receives a value; out sends a value.",
    "de": "Ports verbinden eine Schaltung mit ihrer Umgebung. in empfängt Werte; out gibt Werte aus.",
    "example": "port (a : in std_logic; y : out std_logic);",
    "deKeyword": "port / in / out"
  },
  {
    "lesson": 1,
    "keyword": "architecture / begin",
    "en": "The architecture describes behaviour. Declarations go before begin; concurrent statements go after it.",
    "de": "Die Architecture beschreibt das Verhalten. Deklarationen stehen vor begin; nebenläufige Anweisungen danach.",
    "example": "architecture rtl of and_gate is\nbegin\n  y <= a and b;\nend architecture;",
    "deKeyword": "architecture / begin"
  },
  {
    "lesson": 1,
    "keyword": "std_logic",
    "en": "A single logic signal, including 0, 1 and simulation states such as U and X. Bit literals use single quotes.",
    "de": "Ein einzelnes Logiksignal mit 0, 1 und Simulationszuständen wie U und X. Bitwerte stehen in einfachen Anführungszeichen.",
    "example": "signal ready : std_logic;\nready <= '1';",
    "deKeyword": "std_logic"
  },
  {
    "lesson": 1,
    "keyword": "<=",
    "en": "Assigns a value to a signal. Signal updates are scheduled; a concurrent assignment remains active.",
    "de": "Weist einem Signal einen Wert zu. Signaländerungen werden eingeplant; eine nebenläufige Zuweisung bleibt aktiv.",
    "example": "y <= a and b;",
    "deKeyword": "<="
  },
  {
    "lesson": 1,
    "keyword": "and",
    "en": "AND-Gate: outputs 1 only when both binary inputs are 1.",
    "de": "AND-Gate: Der Ausgang ist nur 1, wenn beide binären Eingänge 1 sind.",
    "example": "y <= a and b;",
    "deKeyword": "and"
  },
  {
    "lesson": 1,
    "keyword": "; / --",
    "en": "A semicolon ends a statement. Two hyphens start a comment lasting to the end of the line.",
    "de": "Ein Semikolon beendet eine Anweisung. Zwei Bindestriche beginnen einen Kommentar bis zum Zeilenende.",
    "example": "y <= a and b; -- output connection",
    "deKeyword": "; / --"
  },
  {
    "lesson": 2,
    "keyword": "not",
    "en": "Inverts a binary bit: 0 becomes 1 and 1 becomes 0.",
    "de": "Invertiert ein binäres Bit: 0 wird 1 und 1 wird 0.",
    "example": "n <= not a;",
    "deKeyword": "not"
  },
  {
    "lesson": 2,
    "keyword": "or",
    "en": "Outputs 1 when at least one binary input is 1.",
    "de": "Liefert 1, wenn mindestens ein binärer Eingang 1 ist.",
    "example": "o <= a or b;",
    "deKeyword": "or"
  },
  {
    "lesson": 2,
    "keyword": "xor",
    "en": "Outputs 1 when two binary inputs differ. Repeated XOR gives parity.",
    "de": "Liefert 1, wenn sich zwei binäre Eingänge unterscheiden. Wiederholtes XOR ergibt Parität.",
    "example": "x <= a xor b;",
    "deKeyword": "xor"
  },
  {
    "lesson": 3,
    "keyword": "signal",
    "en": "Declares an internal connection between parts of the architecture.",
    "de": "Deklariert eine interne Verbindung zwischen Teilen der Architecture.",
    "example": "signal both_on : std_logic;\n-- after begin:\nboth_on <= a and b;\ny <= both_on or c;",
    "deKeyword": "signal"
  },
  {
    "lesson": 3,
    "keyword": "( … )",
    "en": "Parentheses group an expression or select an indexed element. Make intended logic grouping explicit.",
    "de": "Klammern gruppieren einen Ausdruck oder wählen ein indiziertes Element. Zeige die beabsichtigte Logikgruppierung ausdrücklich.",
    "example": "y <= (a and b) or c;",
    "deKeyword": "( … )"
  },
  {
    "lesson": 3,
    "keyword": "delta cycle",
    "en": "A zero-time simulation update step. Connected concurrent assignments may need several delta cycles to settle. It is not a physical gate delay.",
    "de": "Ein Simulationsschritt ohne Zeitfortschritt. Verbundene Zuweisungen können mehrere Delta-Zyklen zum Einschwingen brauchen. Das ist keine physische Gate-Verzögerung.",
    "example": "both_on <= a and b;\ny <= both_on or c;",
    "deKeyword": "Delta-Zyklus"
  },
  {
    "lesson": 4,
    "keyword": "multiplexer",
    "en": "Selects which input reaches an output, controlled by a selection signal.",
    "de": "Wählt anhand eines Steuersignals, welcher Eingang zum Ausgang gelangt.",
    "example": "y <= a when sel = '0' else b;",
    "deKeyword": "Multiplexer"
  },
  {
    "lesson": 4,
    "keyword": "when / else",
    "en": "A conditional concurrent assignment chooses a value. Include the fallback to define the output for every condition.",
    "de": "Eine bedingte nebenläufige Zuweisung wählt einen Wert. Der else-Zweig definiert den Ausgang auch bei nicht erfüllter Bedingung.",
    "example": "y <= a when sel = '0' else b;",
    "deKeyword": "when / else"
  },
  {
    "lesson": 4,
    "keyword": "=",
    "en": "Tests equality. Unlike <=, it does not assign a signal value.",
    "de": "Prüft Gleichheit. Anders als <= weist es keinem Signal einen Wert zu.",
    "example": "sel = '0'",
    "deKeyword": "="
  },
  {
    "lesson": 5,
    "keyword": "std_logic_vector",
    "en": "An ordered collection of logic bits; it is not automatically an arithmetic number. Vector literals use double quotes.",
    "de": "Eine geordnete Gruppe von Logikbits; nicht automatisch eine arithmetische Zahl. Vektorwerte stehen in doppelten Anführungszeichen.",
    "example": "signal bus_in : std_logic_vector(3 downto 0);\nbus_in <= \"1010\";",
    "deKeyword": "std_logic_vector"
  },
  {
    "lesson": 5,
    "keyword": "downto / to",
    "en": "Specify descending or ascending index ranges. 3 downto 0 contains four positions.",
    "de": "Geben absteigende oder aufsteigende Indexbereiche an. 3 downto 0 enthält vier Positionen.",
    "example": "std_logic_vector(3 downto 0)\nstd_logic_vector(0 to 3)",
    "deKeyword": "downto / to"
  },
  {
    "lesson": 5,
    "keyword": "index / slice",
    "en": "An index selects one bit; a slice selects several. Match the width of the assignment destination.",
    "de": "Ein Index wählt ein Bit; ein Slice mehrere. Die Breite muss zum Ziel der Zuweisung passen.",
    "example": "bus_in(2)\nlow_bits <= bus_in(1 downto 0);",
    "deKeyword": "Index / Slice"
  },
  {
    "lesson": 5,
    "keyword": "binary / parity",
    "en": "Binary positions have weights 1, 2, 4, 8. XOR parity is 1 for an odd number of set bits.",
    "de": "Binäre Stellen haben die Gewichte 1, 2, 4, 8. XOR-Parität ist bei einer ungeraden Anzahl gesetzter Bits 1.",
    "example": "\"1010\" → 10\nparity <= bus_in(3) xor bus_in(2) xor bus_in(1) xor bus_in(0);",
    "deKeyword": "Binärzahl / Parität"
  },
  {
    "lesson": 5,
    "keyword": "numeric_std / unsigned",
    "en": "numeric_std provides numeric types such as unsigned for arithmetic. Convert a logic vector explicitly when treating it as a number.",
    "de": "numeric_std stellt numerische Typen wie unsigned für Arithmetik bereit. Wandle einen Logikvektor ausdrücklich um, wenn er eine Zahl darstellen soll.",
    "example": "use ieee.numeric_std.all;\n-- bus_in is a std_logic_vector:\nunsigned(bus_in)",
    "deKeyword": "numeric_std / unsigned"
  },
  {
    "lesson": 6,
    "keyword": "testbench",
    "en": "Simulation code that drives the design inputs and observes its outputs. It is separate from the circuit you synthesize.",
    "de": "Simulationscode, der Eingänge ansteuert und Ausgänge beobachtet. Er ist von der synthetisierten Schaltung getrennt.",
    "example": "stimulus → design under test → observations",
    "deKeyword": "Testbench"
  },
  {
    "lesson": 6,
    "keyword": "wait for / ns",
    "en": "Advances simulated time in a testbench. It does not implement a hardware delay or wait that long in your browser.",
    "de": "Lässt simulierte Zeit in einer Testbench verstreichen. Das erzeugt keine Hardwareverzögerung und wartet nicht so lange im Browser.",
    "example": "a <= '1';\nwait for 10 ns;",
    "deKeyword": "wait for / ns"
  },
  {
    "lesson": 6,
    "keyword": "U / X",
    "en": "U means uninitialized. X means an unknown value, for example from conflicting drivers. Do not silently treat either as 0.",
    "de": "U bedeutet nicht initialisiert. X bedeutet unbekannt, etwa durch widersprüchliche Treiber. Behandle beide nicht stillschweigend wie 0.",
    "example": "'U' and '1' → 'U'\n'X' and '0' → '0'\n'X' and '1' → 'X'",
    "deKeyword": "U / X"
  },
  {
    "lesson": 6,
    "keyword": "waveform / sample",
    "en": "A waveform relates signal values to time. This app displays recorded GHDL transitions; the table separately shows grading samples. VCD does not expose every internal delta-cycle change.",
    "de": "Ein Signalverlauf ordnet Werte der Zeit zu. Diese App zeigt aufgezeichnete GHDL-Übergänge; die Tabelle zeigt separat die Abtastwerte zur Bewertung. VCD zeigt nicht jeden internen Delta-Zyklus.",
    "example": "10 ns: y=0\n20 ns: y=1",
    "deKeyword": "Signalverlauf / Abtastwert"
  },
  {
    "lesson": 7,
    "keyword": "process / sensitivity list",
    "en": "A process executes sequential statements when a listed signal changes. The process itself is concurrent with other processes.",
    "de": "Ein Prozess führt seine Anweisungen der Reihe nach aus, wenn sich ein aufgeführtes Signal ändert. Der Prozess selbst besteht nebenläufig zu anderen Prozessen.",
    "example": "process(clk)\nbegin\n  -- sequential statements\nend process;",
    "deKeyword": "process / Sensitivitätsliste"
  },
  {
    "lesson": 7,
    "keyword": "rising_edge",
    "en": "Detects a rising clock transition. Place register updates inside this condition.",
    "de": "Erkennt eine steigende Taktflanke. Registeränderungen stehen innerhalb dieser Bedingung.",
    "example": "if rising_edge(clk) then\n  q <= d;\nend if;",
    "deKeyword": "rising_edge"
  },
  {
    "lesson": 7,
    "keyword": "if / then / else / end if",
    "en": "Selects sequential statements within a process. Nested conditions can give reset priority over capture.",
    "de": "Wählt Anweisungen innerhalb eines Prozesses. Verschachtelte Bedingungen können Reset gegenüber der Datenübernahme priorisieren.",
    "example": "if reset = '1' then\n  q <= '0';\nelse\n  q <= d;\nend if;",
    "deKeyword": "if / then / else / end if"
  },
  {
    "lesson": 7,
    "keyword": "register / clock",
    "en": "A register remembers a value between clock edges. Changing d alone does not update q in this clocked design.",
    "de": "Ein Register speichert einen Wert zwischen Taktflanken. Eine Änderung von d allein aktualisiert q in diesem getakteten Entwurf nicht.",
    "example": "rising edge → capture d\nbetween edges → hold q",
    "deKeyword": "Register / Takt"
  },
  {
    "lesson": 7,
    "keyword": "synchronous reset",
    "en": "Resets a register only at its active clock edge. Active-high means reset is asserted by 1.",
    "de": "Setzt ein Register nur an seiner aktiven Taktflanke zurück. Aktiv-high bedeutet, dass 1 den Reset auslöst.",
    "example": "if rising_edge(clk) then\n  if reset = '1' then\n    q <= '0';\n  else\n    q <= d;\n  end if;\nend if;",
    "deKeyword": "Synchroner Reset"
  },
  {
    "lesson": 7,
    "keyword": "latch",
    "en": "Storage that follows data while enabled. An unintended latch can result from missing assignments in a combinational process; a clocked register holds intentionally.",
    "de": "Speicher, der Daten bei aktivem Enable folgt. Fehlende Zuweisungen in einem kombinatorischen Prozess können unbeabsichtigte Latches erzeugen; ein getaktetes Register hält seinen Wert absichtlich.",
    "example": "Combinational process: assign every output in every branch.",
    "deKeyword": "latch"
  }
];

/** Return the highest completed lesson index, or -1. Unlocks do not mark earlier lessons complete. */
export function unlockedThrough(state) {
  return LESSON_IDS.reduce((highest, id, index) => state.lessons[id].completed ? index : highest, -1);
}

/** Filter unlocked entries by keyword, current-language explanation or example. Returns catalog entries. */
export function referenceEntries(state, search = '') {
  const level = unlockedThrough(state);
  const query = search.trim().toLocaleLowerCase(state.language);
  return COMPENDIUM.filter(entry => entry.lesson <= level &&
    `${entry.keyword} ${entry.deKeyword} ${entry[state.language]} ${entry.example}`.toLocaleLowerCase(state.language).includes(query));
}
