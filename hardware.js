const copy = {
  "en": {
    "counterDiagram": "100 MHz clock → clock enable every 100,000,000 cycles\n             → 4-bit count → LED3 … LED0\nBTN C → two-flop synchronizer → reset",
    "validationStatus": "Validation: both GHDL testbenches pass. The installed Vivado could not find the Basys 3 FPGA part, so bitstream builds and physical testing remain pending. Add Artix-7 device support before building.",
    "language": "Language",
    "appearance": "Appearance",
    "system": "System",
    "light": "Light",
    "dark": "Dark",
    "title": "From simulation to your Basys 3",
    "intro": "Two optional hardware lessons after the simulation course. About 15–25 minutes each, plus Vivado build time. Physical board testing is pending until you connect your board.",
    "back": "← Back to simulation course",
    "prepare": "Before you begin",
    "prepareText": "You need a Basys 3, a USB data cable, Windows and Vivado 2026.1 with Artix-7 device support and cable drivers. These projects target xc7a35tcpg236-1 directly; board definition files are not required.",
    "downloadText": "Use the project checkout, or save these files into its hardware folder. Links open the source; save using the shown filename.",
    "folder": "Run the commands below in PowerShell from the project folder (the folder containing hardware). Replace the Vivado path if yours differs.",
    "andTitle": "Hardware lesson 1 · AND-Gate",
    "andText": "The entity ports become real FPGA pins through the XDC constraints. SW0 drives a, SW1 drives b, and LED0 shows y = a and b. The FPGA continuously responds to both inputs. Compare this with simulation lesson 2.",
    "andExercise": "Predict the LED for 00, 01, 10 and 11. Build the project, then check all four switch combinations after programming. Only 11 should light LED0.",
    "buildText": "The script creates a Vivado project, runs synthesis and implementation, checks timing and DRC, then writes a bitstream under hardware/build. It never programs a board. Open the generated .xpr in Vivado to inspect the design and reports.",
    "counterTitle": "Hardware lesson 2 · A clocked LED counter",
    "counterText": "The oscillator provides 100 million clock edges each second. A divider creates a clock enable once a second, while every register still uses the same clock. Four LEDs display a binary count from 0 through 15, then wrap to 0. The centre button resets the count through a two-flop synchronizer. Hold it briefly; synchronization takes a few clock edges.",
    "counterExercise": "Predict 0011 → 0100 and 1111 → 0000. Identify which LED is the least significant bit. After programming, observe the count and hold BTN C to reset. The simulation testbench uses a short divider value so you do not simulate millions of cycles.",
    "programTitle": "Program when your board is connected",
    "programOne": "Connect the USB data cable to the board’s programming USB port and power it on.",
    "programTwo": "In Vivado, open Hardware Manager → Open Target → Auto Connect. Check that the detected device is the Basys 3 Artix-7.",
    "programThree": "Choose Program Device and select the matching .bit file from hardware/build/and or hardware/build/counter. No debug probes file is needed.",
    "programFour": "Program the device, then perform the switch or counter checks above.",
    "temporary": "This uses temporary FPGA configuration over JTAG. It does not write the board’s flash. Power loss clears this configuration; the board may load its previous flash image at the next startup.",
    "checkTitle": "Checks and troubleshooting",
    "checkText": "Before hardware, run the GHDL testbenches described in the downloadable manual. Vivado build results and physical checks are separate: a successful bitstream build does not confirm the board behaviour.",
    "trouble": "No device found: check power, USB data cable, programming port and cable drivers. Unknown FPGA part: add Artix-7 support to Vivado. Incorrect LEDs: verify the XDC matches your top-level ports. For failed builds, inspect the terminal and generated timing/DRC reports rather than ignoring warnings.",
    "manual": "Detailed English/German manual and simulation commands"
  },
  "de": {
    "counterDiagram": "100-MHz-Takt → Clock Enable alle 100.000.000 Zyklen\n            → 4-Bit-Zähler → LED3 … LED0\nBTN C → Synchronisierer mit zwei Flipflops → Reset",
    "validationStatus": "Prüfstatus: Beide GHDL-Testbenches bestehen. Das installierte Vivado findet den FPGA-Part der Basys 3 nicht; Bitstream-Builds und physische Tests stehen daher aus. Ergänze vor dem Build die Artix-7-Geräteunterstützung.",
    "language": "Sprache",
    "appearance": "Darstellung",
    "system": "System",
    "light": "Hell",
    "dark": "Dunkel",
    "title": "Von der Simulation zur Basys 3",
    "intro": "Zwei optionale Hardware-Lektionen nach dem Simulationskurs. Je etwa 15–25 Minuten plus Vivado-Buildzeit. Der physische Board-Test steht noch aus, bis du dein Board anschließt.",
    "back": "← Zurück zum Simulationskurs",
    "prepare": "Vor dem Start",
    "prepareText": "Du brauchst eine Basys 3, ein USB-Datenkabel, Windows und Vivado 2026.1 mit Artix-7-Unterstützung und Kabeltreibern. Die Projekte verwenden direkt xc7a35tcpg236-1; Board-Definitionsdateien sind nicht erforderlich.",
    "downloadText": "Verwende den Projekt-Checkout oder speichere diese Dateien im hardware-Ordner. Die Links öffnen den Quelltext; speichere ihn unter dem angegebenen Dateinamen.",
    "folder": "Führe die folgenden Befehle in PowerShell im Projektordner aus (dem Ordner, der hardware enthält). Passe den Vivado-Pfad bei Bedarf an.",
    "andTitle": "Hardware-Lektion 1 · AND-Gate",
    "andText": "Die Entity-Ports werden durch XDC-Constraints mit echten FPGA-Pins verbunden. SW0 steuert a, SW1 steuert b und LED0 zeigt y = a and b. Der FPGA reagiert kontinuierlich auf beide Eingänge. Vergleiche das mit Simulationslektion 2.",
    "andExercise": "Sage die LED für 00, 01, 10 und 11 voraus. Baue das Projekt und prüfe nach dem Programmieren alle vier Schalterkombinationen. Nur 11 darf LED0 einschalten.",
    "buildText": "Das Skript erzeugt ein Vivado-Projekt, führt Synthese und Implementierung aus, prüft Timing und DRC und schreibt einen Bitstream unter hardware/build. Es programmiert kein Board. Öffne die erzeugte .xpr-Datei in Vivado, um Entwurf und Berichte zu untersuchen.",
    "counterTitle": "Hardware-Lektion 2 · Ein getakteter LED-Zähler",
    "counterText": "Der Oszillator liefert 100 Millionen Taktflanken pro Sekunde. Ein Teiler erzeugt einmal pro Sekunde ein Clock Enable; alle Register verwenden weiterhin denselben Takt. Vier LEDs zeigen einen Binärzähler von 0 bis 15, danach beginnt er bei 0. Der mittlere Button setzt den Zähler über einen Synchronisierer mit zwei Flipflops zurück. Halte ihn kurz; die Synchronisierung benötigt einige Taktflanken.",
    "counterExercise": "Sage 0011 → 0100 und 1111 → 0000 voraus. Welche LED zeigt das niederwertigste Bit? Beobachte nach dem Programmieren den Zähler und halte BTN C zum Zurücksetzen. Die Simulations-Testbench verwendet einen kurzen Teilerwert, damit du keine Millionen Taktzyklen simulieren musst.",
    "programTitle": "Programmieren, sobald dein Board angeschlossen ist",
    "programOne": "Verbinde das USB-Datenkabel mit dem Programmier-USB-Anschluss und schalte das Board ein.",
    "programTwo": "Öffne in Vivado Hardware Manager → Open Target → Auto Connect. Prüfe, ob das erkannte Gerät der Artix-7 deiner Basys 3 ist.",
    "programThree": "Wähle Program Device und die passende .bit-Datei aus hardware/build/and oder hardware/build/counter. Eine Debug-Probes-Datei ist nicht erforderlich.",
    "programFour": "Programmiere das Gerät und führe anschließend die Schalter- oder Zählerprüfungen oben durch.",
    "temporary": "Dies konfiguriert den FPGA temporär über JTAG und schreibt nicht in den Flash-Speicher. Stromverlust löscht diese Konfiguration; beim nächsten Einschalten kann das Board sein bisheriges Flash-Abbild laden.",
    "checkTitle": "Prüfen und Fehler beheben",
    "checkText": "Führe vor der Hardware die GHDL-Testbenches aus dem verlinkten Handbuch aus. Vivado-Build und physischer Test sind getrennte Prüfungen: Ein erfolgreicher Bitstream-Build bestätigt nicht das Verhalten auf dem Board.",
    "trouble": "Kein Gerät gefunden: Prüfe Stromversorgung, USB-Datenkabel, Programmieranschluss und Kabeltreiber. Unbekannter FPGA-Part: Ergänze Artix-7-Unterstützung in Vivado. Falsche LEDs: Prüfe, ob XDC und Top-Level-Ports zusammenpassen. Bei Buildfehlern prüfst du Terminal und Timing-/DRC-Berichte, statt Warnungen zu ignorieren.",
    "manual": "Ausführliches deutsches/englisches Handbuch und Simulationsbefehle"
  }
};
const files = ['and_gate.vhd','and_gate.xdc','and_gate_tb.vhd','led_counter.vhd','led_counter.xdc','led_counter_tb.vhd','build.tcl'];
let language = 'en';
let theme = 'system';
try {
  const saved = JSON.parse(localStorage.getItem('signal-school-progress') || 'null');
  if (saved && ['en','de'].includes(saved.language)) language = saved.language;
  if (saved && ['system','light','dark'].includes(saved.theme)) theme = saved.theme;
} catch (error) {
  console.error('Could not read course appearance preferences', error);
  document.getElementById('hardware-notice').textContent = 'Could not read saved preferences. Choose language and appearance above.';
}
/** Render static bilingual instructions. Appearance changes apply to this page only. */
function render() {
  document.documentElement.lang = language;
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('[data-copy]').forEach(element => { element.textContent = copy[language][element.dataset.copy]; });
}
const languageControl = document.getElementById('language');
const themeControl = document.getElementById('theme');
languageControl.value = language; themeControl.value = theme;
languageControl.addEventListener('change', () => { language = languageControl.value; render(); });
themeControl.addEventListener('change', () => { theme = themeControl.value; render(); });
files.forEach(name => {
  const item = document.createElement('li'); const link = document.createElement('a');
  link.href = './hardware/' + name; link.textContent = name; item.append(link);
  document.getElementById('hardware-files').append(item);
});
render();
