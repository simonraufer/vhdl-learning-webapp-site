# Basys 3 hardware lessons / Hardware-Lektionen

These optional lessons target a Digilent Basys 3 (Artix-7 `xc7a35tcpg236-1`) and Windows with Vivado 2026.1. They follow the eight simulation lessons. The web app and its GHDL service remain independent of Vivado.

**Validation status:** both GHDL testbenches pass. Vivado 2026.1 is installed, but its part catalog currently contains no devices, including the required `xc7a35tcpg236-1`; both builds stop before synthesis. Add Artix-7 device support through the AMD installer before retrying. Check licensing separately if later diagnostics report a licensing problem. No bitstreams or implementation reports have been generated. **Physical board verification is pending:** no board is connected and no device has been programmed.

## English

### 1. Build an AND-Gate

`and_gate.vhd` connects switch SW0 (`a`) and SW1 (`b`) to LED0 (`y`). LED0 should light only when both switches are on. The XDC file maps the VHDL ports to the board pins; VHDL signal names alone do not choose physical connectors.

From PowerShell in the project directory:

```powershell
$vivadoExe = 'C:\AMDDesignTools\2026.1\Vivado\bin\vivado.bat'
& $vivadoExe -mode batch -source hardware/build.tcl -tclargs and
```

The script creates `hardware/build/and/basys3_and.xpr`, synthesizes and implements the circuit, and writes `hardware/build/and/basys3_and.runs/impl_1/and_gate.bit`. It also writes `timing_summary.rpt`, `drc.rpt`, and `utilization.rpt` in `hardware/build/and`. A build produces a configuration file; it does not program a board. Rerunning recreates the generated project, so make source changes in `hardware/and_gate.vhd` and `hardware/and_gate.xdc` rather than only in the generated project.

Open the `.xpr` in Vivado to inspect Sources, the schematic, reports, or the supplied simulation. Choose **Run Simulation → Run Behavioral Simulation**. The testbench `and_gate_tb.vhd` checks all four input combinations.

### 2. Build an LED counter

`led_counter.vhd` counts from 0 to 15 on LED3–LED0, then wraps to 0. LED0 is the least significant bit. With the default `TICK_CYCLES = 100_000_000` and the board's 100 MHz clock, the count advances once per second. Holding the center button (`reset`, btnC) resets the count to zero after synchronization.

```powershell
& $vivadoExe -mode batch -source hardware/build.tcl -tclargs counter
```

The project is `hardware/build/counter/basys3_counter.xpr`; the bitstream is `hardware/build/counter/basys3_counter.runs/impl_1/led_counter.bit`. Reports are in `hardware/build/counter`. Its testbench uses a smaller tick count so simulation finishes quickly without changing the hardware default.

Every register uses the same 100 MHz clock. A terminal-count condition enables a count update; no slow clock is generated from logic. The asynchronous pushbutton passes through two synchronizer registers before it controls the counter. This lowers metastability risk; it is not a mechanical-button debounce filter. Reset takes a few clock edges to affect the count. Holding the button is the intended initial test.

### 3. Program and test when your board is connected

1. Connect the board's programming USB port with a data-capable cable, power the board, and open the generated project in Vivado.
2. Open **Hardware Manager → Open Target → Auto Connect**. If no target appears, check the USB cable, board power, and Vivado cable-driver installation.
3. Choose **Program Device**, select the matching `.bit` above, and program the FPGA. This is temporary FPGA configuration; these lessons do not write configuration flash.
4. For AND-Gate, test SW0/SW1 as 00, 01, 10, 11; LED0 should be 0, 0, 0, 1.
5. For the counter, watch LED3–LED0 count in binary once per second, wrap after 15, and return to 0 while holding the center button.

Record these observations before considering physical verification complete. After power loss the temporary configuration is gone; program the device again for another session.

### Run source tests with GHDL

From the repository directory, use a separate generated working directory:

```powershell
New-Item -ItemType Directory -Force hardware/build/ghdl | Out-Null
Push-Location hardware/build/ghdl
try {
    ghdl -a --std=08 ../../and_gate.vhd ../../led_counter.vhd ../../and_gate_tb.vhd ../../led_counter_tb.vhd
    if ($LASTEXITCODE -ne 0) { throw 'GHDL analysis failed' }
    ghdl --elab-run --std=08 and_gate_tb --assert-level=error --stop-time=2us
    if ($LASTEXITCODE -ne 0) { throw 'AND-Gate test failed' }
    ghdl --elab-run --std=08 led_counter_tb --assert-level=error --stop-time=2us
    if ($LASTEXITCODE -ne 0) { throw 'Counter test failed' }
} finally {
    Pop-Location
}
```

GHDL validates the logic and testbench assertions. Vivado validates synthesis, implementation, constraints, and bitstream generation. Neither replaces testing the actual switches, LEDs, and USB connection.

## Deutsch

**Prüfstand:** Beide GHDL-Testbenches bestehen. Vivado 2026.1 ist installiert, findet aber derzeit keine FPGA-Parts, auch nicht `xc7a35tcpg236-1`. Beide Builds stoppen vor der Synthese. Ergänze Artix-7-Geräteunterstützung im AMD-Installer, bevor du den Build erneut startest. Prüfe die Lizenz getrennt, falls spätere Meldungen ein Lizenzproblem nennen. Es wurden keine Bitstreams oder Implementierungsberichte erzeugt. Die Prüfung am physischen Board steht ebenfalls noch aus.

### 1. Ein AND-Gate aufbauen

`and_gate.vhd` verbindet SW0 (`a`) und SW1 (`b`) mit LED0 (`y`). LED0 soll nur leuchten, wenn beide Schalter eingeschaltet sind. Die XDC-Datei ordnet den VHDL-Ports die Pins des Boards zu; Signalnamen allein legen keine physische Verbindung fest.

Öffne PowerShell im Projektverzeichnis:

```powershell
$vivadoExe = 'C:\AMDDesignTools\2026.1\Vivado\bin\vivado.bat'
& $vivadoExe -mode batch -source hardware/build.tcl -tclargs and
```

Das Skript erzeugt `hardware/build/and/basys3_and.xpr`, führt Synthese und Implementierung aus und schreibt `hardware/build/and/basys3_and.runs/impl_1/and_gate.bit`. Die Berichte `timing_summary.rpt`, `drc.rpt` und `utilization.rpt` liegen unter `hardware/build/and`. Das Skript programmiert kein Board. Beim erneuten Aufruf wird das generierte Projekt neu erstellt. Bearbeite deshalb `hardware/and_gate.vhd` und `hardware/and_gate.xdc` als Quelldateien.

Öffne die `.xpr` in Vivado, um Quellen, Schaltbild und Berichte anzusehen. **Run Simulation → Run Behavioral Simulation** startet den mitgelieferten Testbench `and_gate_tb.vhd`, der alle vier Eingangskombinationen prüft.

### 2. Einen LED-Zähler aufbauen

`led_counter.vhd` zählt mit LED3–LED0 binär von 0 bis 15 und beginnt dann wieder bei 0. LED0 ist das niederwertigste Bit. Bei `TICK_CYCLES = 100_000_000` und dem 100-MHz-Takt des Boards steigt der Zähler einmal pro Sekunde. Der mittlere Taster (`reset`, btnC) setzt den Zähler nach der Synchronisierung auf 0 zurück, solange du ihn gedrückt hältst.

```powershell
& $vivadoExe -mode batch -source hardware/build.tcl -tclargs counter
```

Das Projekt liegt unter `hardware/build/counter/basys3_counter.xpr`, die Bitstream-Datei unter `hardware/build/counter/basys3_counter.runs/impl_1/led_counter.bit`. Die Berichte liegen unter `hardware/build/counter`. Der Testbench verwendet einen kleineren Zählintervall, damit die Simulation schnell läuft; der Standardwert für das Board bleibt unverändert.

Alle Register verwenden denselben 100-MHz-Takt. Eine Bedingung am Ende des Intervalls erlaubt die Aktualisierung des Zählers; aus Logik wird kein langsamer Takt erzeugt. Der asynchrone Taster wird über zwei Register synchronisiert, bevor er den Zähler steuert. Das verringert das Metastabilitätsrisiko, ersetzt aber keine Entprellung eines mechanischen Tasters. Reset wirkt nach einigen Taktflanken. Halte den Taster für den ersten Test gedrückt.

### 3. Das angeschlossene Board programmieren und prüfen

1. Verbinde den Programmier-USB-Anschluss über ein Datenkabel, schalte das Board ein und öffne das generierte Projekt in Vivado.
2. Wähle **Hardware Manager → Open Target → Auto Connect**. Wird kein Target gefunden, prüfe USB-Kabel, Stromversorgung und Vivado-Kabeltreiber.
3. Wähle **Program Device** und die passende `.bit`-Datei. Die FPGA-Konfiguration ist temporär; diese Lektionen schreiben keinen Konfigurations-Flash.
4. Prüfe beim AND-Gate die Kombinationen SW0/SW1: 00, 01, 10, 11. LED0 soll 0, 0, 0, 1 anzeigen.
5. Prüfe beim Zähler den Sekundentakt, den Überlauf von 15 auf 0 und den Reset über den mittleren Taster.

**Die Prüfung am physischen Board steht noch aus.** Notiere deine Beobachtungen. Nach dem Ausschalten geht die temporäre Konfiguration verloren; programmiere das FPGA für die nächste Sitzung erneut.

Die GHDL-Befehle im englischen Abschnitt prüfen beide Testbenches ohne Board. GHDL prüft Logik und Assertions, Vivado prüft Synthese, Implementierung, Constraints und Bitstream-Erzeugung. Die Prüfung am echten Board bleibt ein eigener Schritt.

## Sources / Quellen

The pin mappings and 100 MHz clock constraint follow [Digilent's Basys 3 master XDC](https://github.com/Digilent/digilent-xdc/blob/master/Basys-3-Master.xdc). For target connections, consult [AMD Vivado 2026.1 UG908: Opening Hardware Target Connections](https://docs.amd.com/r/en-US/ug908-vivado-programming-debugging/Opening-Hardware-Target-Connections).


