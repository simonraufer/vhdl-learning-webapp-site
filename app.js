import { initialPreview, changePreview, renderPreview } from './circuit-preview.js';
import { renderTrace } from './waveform.js';
import { COMPENDIUM, unlockedThrough, referenceEntries } from './compendium.js';
import { LESSONS } from './lessons.js';
import { initialState, validateState, validateServiceUrl, localStartupSession } from './state.js';

const $ = id => document.getElementById(id);
const translations = {
  en: {
    pulseNote:"Teaching animation; timing is illustrative, not a simulated gate delay.",
    referenceTitle:"Syntax and concept compendium",
    referenceIntro:"Completing a lesson unlocks its entries and all earlier entries. Jumping ahead gives you the full reference up to that lesson, without marking earlier lessons complete.",
    referenceSearch:"Search unlocked entries",
    referenceOpen:"Syntax reference ↓",
    referenceEmpty:"Complete a lesson to unlock your first reference entries.",
    referenceNoMatch:"No unlocked entries match your search.",

    hardwareLink: "Basys 3 hardware lessons →",
    backgroundMotion:'Background motion',
    startupReady:'Local access code loaded. Choose Run simulation. If the service restarts, open its new startup link.',
    setupBash:'Bash (Git Bash / Linux / macOS)',
    setupBashHelp:"Alternative to PowerShell: run this from the folder containing server.py. Replace python with python3 if needed.",
    setupTitle:"Simulator setup and service controls",
    setupIntro:"Start locally below. Reconnection, status and stopping instructions are in separate sections; XAMPP and sharing are optional.",
    setupLocal:"1. Start locally",
    setupLocalOne:"Open PowerShell and paste the commands below. This path matches this laptop; on another computer, replace it with your project folder. Python serves both the website and GHDL API, so XAMPP does not need to be running. Python and GHDL must be installed:",
    setupLocalTwo:"Keep the terminal open and open its “Open locally (access code filled automatically)” link. It fills the service URL and code. Choose Run simulation in the editor. Keep this startup link private.",
    setupLocalThree:"After reloading, reopen the startup link from the service terminal. Alternatively, enter http://127.0.0.1:8000 below and paste the value after “Session access code:”. A restart generates a new code unless you configured a fixed one. If the terminal is gone and you lost the link/code, stop the service below and start it again.",
    setupLocalFour:"In the original service terminal, press Ctrl+C. If that terminal is no longer available, open a new PowerShell window and follow these steps. The examples use port 8000; replace it if you configured another port.",
    setupXampp:"Using XAMPP for the website",
    setupXamppText:"Apache serves the page, but the Python service still runs GHDL. Before starting Python, allow the Apache origin. For http://localhost/vhdl/, use the command below, followed by the startup commands above. If Apache uses another port, include it (for example http://localhost:8080). Keep the Service URL set to http://127.0.0.1:8000.",
    setupRemote:"From GitHub Pages or a friend’s computer",
    setupRemoteOne:"As a learner, ask the host for the current HTTPS service URL and session access code. A connection link can fill the URL for you; enter the code separately and choose Run simulation. You do not need to install GHDL.",
    setupRemoteTwo:"As the host, allow your GitHub Pages origin before starting the service: replace OWNER in the command below with your GitHub username. Do not include the repository path. Use a comma-separated list if you also need localhost origins.",
    setupRemoteThree:"Start the service, then use a temporary HTTPS tunnel that forwards to http://127.0.0.1:8000. Paste the tunnel’s HTTPS address into Service URL, without /api/simulations or other paths. Choose Copy connection link from the GitHub Pages website and share the access code separately. A tunnel provider has not been configured yet.",
    setupRemoteFour:"127.0.0.1 always means the computer running the browser: your friends cannot use it to reach your laptop. Keep your laptop awake and both the service and tunnel running. If the tunnel URL changes, share a new connection link.",
    setupTrusted:"Use laptop simulation only with people you trust. The access code controls access; it does not isolate submitted VHDL from your computer.",
    setupTrouble:"If the connection fails",
    setupTroubleText:"Missing or incorrect code: copy the current code from the service terminal. Unreachable service: check that the terminal and tunnel are still running and the URL is current. Origin rejected: update VHDL_ALLOWED_ORIGINS and restart Python. GHDL not found: set GHDL_PATH to its executable before startup. Compilation errors mean the service was reached; open GHDL diagnostics and correct your code. Your edits remain available if simulation is offline.",
    language:'Language',theme:'Appearance',system:'System',light:'Light',dark:'Dark',course:'YOUR FIRST CIRCUIT · LESSON 01',headline:'Small signals. Real circuits.',subhead:'Learn how two inputs become one output — then bring your VHDL to life.',guided:'GUIDED LESSON',next:'Next concept →',hint:'Need a hint?',hintText:'Keep the entity name and_gate and ports a, b, y. Inside the architecture, connect the output with y <= a and b; — VHDL describes connections that act concurrently.',play:'EXPLORE THE CIRCUIT',gate:'The AND gate',preview:'Concept preview',previewText:'Toggle the inputs. This teaching preview always shows AND; run your code below to test your design.',truth:'AND truth table',expected:'Expected y',actual:'Your y',write:'WRITE THE HARDWARE',downloadCode:'Download VHDL',editorLabel:'VHDL source · edit the architecture and run all four inputs',editorHelp:'The testbench samples each input pair after 10 ns. Use entity and_gate with std_logic ports a, b and y.',run:'▶ Run simulation',reset:'Reset code',inspect:'READ THE SIGNALS',waveform:'Simulation waveform',notRun:'Run your design to see real GHDL results.',diagnostics:'GHDL diagnostics',complete:'Complete lesson ✓',connection:'Simulation connection',connectionText:'Lessons and edits work without the service. Real simulation needs your local GHDL service. The access code stays in memory for this session.',serviceUrl:'Service URL',accessCode:'Session access code',share:'Copy connection link',exportProgress:'Export progress / backup',importProgress:'Import progress',privacy:'Saved in this browser. No accounts. No tracking.',footer:'Built for curious minds. One circuit at a time.',importTitle:'Replace your saved progress?',importWarning:'Download a backup before replacing your current code and preferences.',backup:'Download current backup',cancel:'Cancel',replace:'Replace progress',saved:'Saved locally',saveError:'Browser storage unavailable. Export a backup to keep your progress.',running:'GHDL is compiling and simulating…',passed:'All four inputs passed. Your AND gate works!',failed:'Some outputs differ. Compare the sampled outputs with the expected values.',stale:'Code changed. Results below belong to the previous run.',finished:'Lesson complete — you built and tested an AND gate!',resetConfirm:'Replace the current code with the starting example?',offline:'Simulation unavailable. Check the service URL, access code and service console. Your edits are preserved.',invalidImport:'Import rejected. Check the JSON format and version 1 or 2; current progress was preserved.',fileLarge:'Progress file exceeds 200 KB.',imported:'Progress imported.',copied:'Connection link copied. It contains no access code.',shareFallback:'Copy this connection link:',tokenRequired:'Enter the session access code from your service console.',invalidUrl:'Use an HTTPS service origin, or HTTP localhost, without a path, query or access code.',importPreview:'Version 1 · step {step}/5 · language {language} · appearance {theme} · {length} code characters',sample:'Samples after each 10 ns input interval; GHDL output, not a continuous trace.',steps:['Bits','Signals','Entity','Architecture','Build & test'],titles:['A bit has two states','Signals connect a circuit','The entity is the interface','The architecture gives behavior','Build your first AND gate'],bodies:['A bit is either 0 or 1. Think of a switch: off or on. Digital circuits combine these tiny choices into useful behavior.','A signal carries a value between parts of a circuit. Our inputs a and b are signals; y carries the output to an LED.','An entity names a circuit and declares its ports. Inputs receive signals. Outputs send signals to the next part.','An architecture describes how the outputs depend on the inputs. The assignment runs concurrently: the output responds whenever either input changes.','An AND gate outputs 1 only when both inputs are 1. Run your VHDL with GHDL, compare all four combinations, then complete the lesson.'],examples:['0 → off     1 → on','a, b → circuit → y','entity and_gate\n  a, b : in std_logic\n  y : out std_logic','y <= a and b;','00 → 0   01 → 0\n10 → 0   11 → 1'],
    setupReconnect:"2. Reconnect or check status",
    setupStatus:"Open http://127.0.0.1:8000 to check whether the website responds. Run simulation after reconnecting to check GHDL too. There is no separate Connect button.",
    setupStop:"3. Stop the service",
    setupFindProcess:"Find the process ID listening on the service port. No listener means the service is already stopped:",
    setupInspectProcess:"Replace 12345 with the returned OwningProcess number and inspect the command line:",
    setupStopProcess:"Only if the command line identifies Python running this project’s server.py, stop that process using the same ID:",
    setupVerifyStop:"Run the first command again to confirm there is no listener. Then use the startup commands above when you want to restart.",
  },
  de: {
    pulseNote:"Lernanimation; das Timing ist anschaulich und keine simulierte Gate-Verzögerung.",
    referenceTitle:"Syntax- und Konzept-Kompendium",
    referenceIntro:"Der Abschluss einer Lektion schaltet ihre Einträge und alle vorherigen frei. Beim Vorspringen erhältst du das ganze Nachschlagewerk bis zu dieser Lektion; frühere Lektionen bleiben dabei unvollständig.",
    referenceSearch:"Freigeschaltete Einträge durchsuchen",
    referenceOpen:"Syntax nachschlagen ↓",
    referenceEmpty:"Schließe eine Lektion ab, um die ersten Einträge freizuschalten.",
    referenceNoMatch:"Keine freigeschalteten Einträge passen zur Suche.",

    hardwareLink: "Basys-3-Hardware-Lektionen →",
    backgroundMotion:'Hintergrundbewegung',
    startupReady:'Lokaler Zugangscode geladen. Wähle Simulation starten. Nach einem Dienstneustart öffnest du dessen neuen Startlink.',
    setupBash:'Bash (Git Bash / Linux / macOS)',
    setupBashHelp:"Alternative zu PowerShell: Führe diesen Befehl im Ordner mit server.py aus. Ersetze python bei Bedarf durch python3.",
    setupTitle:"Simulator einrichten und Dienst verwalten",
    setupIntro:"Starte lokal mit den Befehlen unten. Wiederverbinden, Status und Beenden stehen in eigenen Abschnitten; XAMPP und Teilen sind optional.",
    setupLocal:"1. Lokal starten",
    setupLocalOne:"Öffne PowerShell und füge die folgenden Befehle ein. Dieser Pfad passt zu diesem Laptop; auf einem anderen Computer ersetzt du ihn durch deinen Projektordner. Python stellt sowohl die Website als auch die GHDL-API bereit, daher muss XAMPP nicht laufen. Python und GHDL müssen installiert sein:",
    setupLocalTwo:"Lass das Terminal geöffnet und öffne dessen Link „Open locally (access code filled automatically)“. Er trägt Dienst-URL und Code ein. Wähle im Editor Simulation starten. Halte diesen Startlink privat.",
    setupLocalThree:"Öffne nach dem Neuladen den Startlink aus dem Dienstterminal erneut. Alternativ trägst du unten http://127.0.0.1:8000 ein und kopierst den Wert nach „Session access code:“. Ein Neustart erzeugt einen neuen Code, sofern du keinen festen konfiguriert hast. Ist das Terminal weg und fehlen Link und Code, beende den Dienst wie unten beschrieben und starte ihn neu.",
    setupLocalFour:"Drücke im ursprünglichen Dienstterminal Ctrl+C. Ist dieses Terminal nicht mehr verfügbar, öffne ein neues PowerShell-Fenster und folge diesen Schritten. Die Beispiele verwenden Port 8000; ersetze ihn, falls du einen anderen Port konfiguriert hast.",
    setupXampp:"Website mit XAMPP bereitstellen",
    setupXamppText:"Apache stellt die Seite bereit; der Python-Dienst führt weiterhin GHDL aus. Erlaube vor dem Python-Start die Apache-Origin. Für http://localhost/vhdl/ verwende den folgenden Befehl, danach die Startbefehle oben. Bei einem anderen Apache-Port füge diesen hinzu, etwa http://localhost:8080. Die Dienst-URL bleibt http://127.0.0.1:8000.",
    setupRemote:"Über GitHub Pages oder den Computer eines Freundes",
    setupRemoteOne:"Als Lernender erhältst du die aktuelle HTTPS-Dienst-URL und den Zugangscode vom Host. Ein Verbindungslink kann die URL vorausfüllen. Gib den Code separat ein und wähle Simulation starten. Du musst GHDL nicht installieren.",
    setupRemoteTwo:"Als Host erlaubst du vor dem Dienststart deine GitHub-Pages-Origin: Ersetze OWNER im folgenden Befehl durch deinen GitHub-Benutzernamen. Füge keinen Repository-Pfad hinzu. Mehrere Origins, etwa zusätzlich localhost, kannst du durch Kommas trennen.",
    setupRemoteThree:"Starte den Dienst und anschließend einen temporären HTTPS-Tunnel, der zu http://127.0.0.1:8000 weiterleitet. Trage die HTTPS-Tunneladresse als Dienst-URL ein, ohne /api/simulations oder andere Pfade. Wähle auf der GitHub-Pages-Website Verbindungslink kopieren und teile den Zugangscode separat. Ein Tunnelanbieter ist noch nicht eingerichtet.",
    setupRemoteFour:"127.0.0.1 bezeichnet immer den Computer, auf dem der Browser läuft. Deine Freunde erreichen damit nicht deinen Laptop. Halte den Laptop wach und lass Dienst und Tunnel laufen. Ändert sich die Tunnel-URL, teile einen neuen Verbindungslink.",
    setupTrusted:"Nutze die Laptop-Simulation nur mit Personen, denen du vertraust. Der Zugangscode kontrolliert den Zugriff; er isoliert eingereichtes VHDL nicht von deinem Computer.",
    setupTrouble:"Wenn die Verbindung nicht funktioniert",
    setupTroubleText:"Code fehlt oder ist falsch: Kopiere den aktuellen Code aus dem Dienstterminal. Dienst nicht erreichbar: Prüfe, ob Terminal und Tunnel laufen und die URL aktuell ist. Origin abgelehnt: Aktualisiere VHDL_ALLOWED_ORIGINS und starte Python neu. GHDL nicht gefunden: Setze vor dem Start GHDL_PATH auf die Programmdatei. Compilerfehler bedeuten, dass der Dienst erreicht wurde; öffne die GHDL-Diagnose und korrigiere deinen Code. Deine Änderungen bleiben auch ohne Simulation verfügbar.",
    language:'Sprache',theme:'Darstellung',system:'System',light:'Hell',dark:'Dunkel',course:'DEINE ERSTE SCHALTUNG · LEKTION 01',headline:'Kleine Signale. Echte Schaltungen.',subhead:'Lerne, wie aus zwei Eingängen ein Ausgang wird — und erwecke dein VHDL zum Leben.',guided:'GEFÜHRTE LEKTION',next:'Nächstes Konzept →',hint:'Brauchst du einen Tipp?',hintText:'Behalte den Namen and_gate und die Ports a, b, y. Verbinde den Ausgang in der Architektur mit y <= a and b; — VHDL beschreibt gleichzeitig wirkende Verbindungen.',play:'ERKUNDE DIE SCHALTUNG',gate:'Das AND-Gate',preview:'Konzeptvorschau',previewText:'Schalte die Eingänge um. Diese Lernvorschau zeigt immer AND; teste deinen eigenen Entwurf mit einer Simulation.',truth:'Wahrheitstabelle für AND',expected:'Erwartetes y',actual:'Dein y',write:'BESCHREIBE DIE HARDWARE',downloadCode:'VHDL herunterladen',editorLabel:'VHDL-Quelltext · bearbeite die Architektur und teste alle vier Eingänge',editorHelp:'Die Testbench liest jede Eingangskombination nach 10 ns. Verwende die Entity and_gate mit den std_logic-Ports a, b und y.',run:'▶ Simulation starten',reset:'Code zurücksetzen',inspect:'LIES DIE SIGNALE',waveform:'Simulationsverlauf',notRun:'Starte deinen Entwurf, um echte GHDL-Ergebnisse zu sehen.',diagnostics:'GHDL-Diagnose',complete:'Lektion abschließen ✓',connection:'Simulationsverbindung',connectionText:'Lektionen und Bearbeitung funktionieren ohne den Dienst. Die echte Simulation benötigt deinen lokalen GHDL-Dienst. Der Zugangscode bleibt nur für diese Sitzung im Speicher.',serviceUrl:'Dienst-URL',accessCode:'Zugangscode der Sitzung',share:'Verbindungslink kopieren',exportProgress:'Fortschritt / Sicherung exportieren',importProgress:'Fortschritt importieren',privacy:'In diesem Browser gespeichert. Keine Konten. Kein Tracking.',footer:'Für neugierige Köpfe. Eine Schaltung nach der anderen.',importTitle:'Gespeicherten Fortschritt ersetzen?',importWarning:'Lade eine Sicherung herunter, bevor du deinen Code und deine Einstellungen ersetzt.',backup:'Aktuelle Sicherung herunterladen',cancel:'Abbrechen',replace:'Fortschritt ersetzen',saved:'Lokal gespeichert',saveError:'Browserspeicher nicht verfügbar. Exportiere eine Sicherung, um deinen Fortschritt zu behalten.',running:'GHDL kompiliert und simuliert…',passed:'Alle vier Eingänge bestanden. Dein AND-Gate funktioniert!',failed:'Einige Ausgänge stimmen nicht. Vergleiche die Abtastwerte mit den erwarteten Ausgängen.',stale:'Code geändert. Die Ergebnisse stammen vom vorherigen Durchlauf.',finished:'Lektion abgeschlossen — du hast ein AND-Gate gebaut und getestet!',resetConfirm:'Aktuellen Code durch das Ausgangsbeispiel ersetzen?',offline:'Simulation nicht erreichbar. Prüfe Dienst-URL, Zugangscode und Dienstkonsole. Deine Änderungen bleiben erhalten.',invalidImport:'Import abgelehnt. Prüfe JSON-Format und Version 1 oder 2; dein Fortschritt bleibt erhalten.',fileLarge:'Fortschrittsdatei ist größer als 200 KB.',imported:'Fortschritt importiert.',copied:'Verbindungslink kopiert. Er enthält keinen Zugangscode.',shareFallback:'Kopiere diesen Verbindungslink:',tokenRequired:'Gib den Zugangscode aus deiner Dienstkonsole ein.',invalidUrl:'Verwende eine HTTPS-Dienstadresse oder HTTP localhost ohne Pfad, Parameter oder Zugangscode.',importPreview:'Version 1 · Schritt {step}/5 · Sprache {language} · Darstellung {theme} · {length} Codezeichen',sample:'Abtastwerte nach jedem 10-ns-Eingangsintervall; GHDL-Ausgabe, kein kontinuierlicher Verlauf.',steps:['Bits','Signale','Entity','Architektur','Bauen & testen'],titles:['Ein Bit hat zwei Zustände','Signale verbinden die Schaltung','Die Entity ist die Schnittstelle','Die Architektur legt das Verhalten fest','Baue dein erstes AND-Gate'],bodies:['Ein Bit ist entweder 0 oder 1. Denke an einen Schalter: aus oder an. Digitale Schaltungen verbinden diese kleinen Entscheidungen zu nützlichem Verhalten.','Ein Signal trägt einen Wert zwischen Teilen der Schaltung. Unsere Eingänge a und b sind Signale; y führt den Ausgang zu einer LED.','Eine Entity benennt eine Schaltung und definiert ihre Ports. Eingänge empfangen Signale. Ausgänge senden Signale an den nächsten Teil.','Eine Architektur beschreibt, wie die Ausgänge von den Eingängen abhängen. Die Zuweisung wirkt gleichzeitig: Der Ausgang reagiert, sobald sich ein Eingang ändert.','Ein AND-Gate liefert nur dann 1, wenn beide Eingänge 1 sind. Starte dein VHDL mit GHDL, vergleiche alle vier Kombinationen und schließe dann die Lektion ab.'],examples:['0 → aus     1 → an','a, b → Schaltung → y','entity and_gate\n  a, b : in std_logic\n  y : out std_logic','y <= a and b;','00 → 0   01 → 0\n10 → 0   11 → 1'],
    setupReconnect:"2. Wiederverbinden oder Status prüfen",
    setupStatus:"Öffne http://127.0.0.1:8000, um zu prüfen, ob die Website antwortet. Starte nach dem Wiederverbinden eine Simulation, um auch GHDL zu prüfen. Es gibt keinen separaten Verbinden-Button.",
    setupStop:"3. Dienst beenden",
    setupFindProcess:"Ermittle die Prozess-ID, die auf dem Dienstport lauscht. Gibt es keinen Listener, ist der Dienst bereits beendet:",
    setupInspectProcess:"Ersetze 12345 durch die angezeigte OwningProcess-Nummer und prüfe die Befehlszeile:",
    setupStopProcess:"Nur wenn die Befehlszeile Python mit server.py dieses Projekts zeigt, beende den Prozess mit derselben ID:",
    setupVerifyStop:"Führe den ersten Befehl erneut aus, um zu bestätigen, dass kein Listener mehr läuft. Zum Neustarten verwendest du die Startbefehle oben.",
  }
};
let state = initialState(LESSONS);
const lesson = () => LESSONS.find(item => item.id === state.activeLesson);
const progress = () => state.lessons[state.activeLesson];
const content = () => lesson()[state.language];
let result = null;
let resultCode = '';
let pendingImport = null;
let previewState = initialPreview();
let questionFeedback='';
let storageError = false;
let running = false;
let statusKey = 'notRun';
let connectionErrorKey = '';
const t = key => translations[state.language][key];

try {
  const stored = localStorage.getItem('signal-school-progress');
  if (stored) state = validateState(JSON.parse(stored), LESSONS);
} catch (error) {
  console.error('Could not restore browser progress', error);
  storageError = true;
}

/** Persist progress; storage failures remain visible and leave editor usable. */
function save() {
  try {
    localStorage.setItem('signal-school-progress', JSON.stringify(state));
    storageError = false;
  } catch (error) {
    console.error('Could not save browser progress', error);
    storageError = true;
  }
  $('save-status').textContent = t(storageError ? 'saveError' : 'saved');
}

/** Render the localized lesson and controls without rewriting edited source. */
function render() {
  document.documentElement.lang = state.language;
  document.documentElement.dataset.theme = state.theme;
  document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = t(element.dataset.i18n); });
  $('language').value = state.language;
  $('theme').value = state.theme;
  const current = lesson(); const copy = content(); const entry = progress();
  $('course-nav').replaceChildren();
  LESSONS.forEach((item,index) => {
    const button=document.createElement('button'); button.className='course-link';
    button.textContent=`${String(index+1).padStart(2,'0')} · ${item[state.language].title}${state.lessons[item.id].completed ? ' ✓' : ''}`;
    button.disabled=running;
    if(item.id===current.id) button.setAttribute('aria-current','page');
    button.addEventListener('click',()=>{state.activeLesson=item.id;previewState=initialPreview();result=null;resultCode='';statusKey='notRun';$('code').value=progress().code;$('diagnostics').textContent='';questionFeedback='';save();render();});
    $('course-nav').append(button);
  });
  $('course-summary').textContent=`${LESSONS.filter(item=>state.lessons[item.id].completed).length}/8 · ${current.minutes} min`;
  document.querySelector('[data-i18n="course"]').textContent=state.language==='de' ? 'VHDL VON ANFANG AN · 8 LEKTIONEN' : 'VHDL FROM ZERO · 8 LESSONS';
  document.querySelector('[data-i18n="subhead"]').textContent=copy.summary;
  $('steps').replaceChildren();
  copy.steps.forEach((step,index)=>{
    const button=document.createElement('button');button.className=index===entry.step?'step active':'step';button.textContent=`${index+1}  ${step.title}`;
    if(index===entry.step)button.setAttribute('aria-current','step');
    button.addEventListener('click',()=>{entry.step=index;save();render();});$('steps').append(button);
  });
  const step=copy.steps[entry.step];
  $('lesson-title').textContent=step.title;$('lesson-body').textContent=step.body;$('lesson-example').textContent=step.example;
  document.querySelector('[data-i18n="hintText"]').textContent=copy.hint;
  $('next').disabled=entry.step===copy.steps.length-1;
  $('question-prompt').textContent=copy.question.prompt;
  $('question-options').replaceChildren();
  copy.question.options.forEach((option,index)=>{
    const button=document.createElement('button');button.className='secondary';button.textContent=option;
    button.addEventListener('click',()=>{const correct=index===copy.question.answer;entry.questionAnswered=correct;questionFeedback=(correct ? (state.language==='de'?'Richtig. ':'Correct. '):(state.language==='de'?'Versuche es erneut. ':'Try again. '))+copy.question.explanation;save();render();});
    $('question-options').append(button);
  });
  if(entry.questionAnswered)$('question-feedback').textContent=copy.question.explanation;
  else $('question-feedback').textContent=questionFeedback;
  $('editor-section').hidden=!current.simulation;
  $('lab-section').hidden=false;
  $('editor-title').textContent=`${current.simulation || current.id}.vhd`;
  document.querySelector('[data-i18n="editorLabel"]').textContent=copy.exercise;
  $('editor-help').textContent=copy.editorHelp;
  $('result-status').textContent=entry.completed ? (state.language==='de'?'Lektion abgeschlossen.':'Lesson complete.') : running ? t('running') : result ? (resultCode!==entry.code?t('stale'):result.passed?(state.language==='de'?'Alle Testwerte bestanden.':'All test samples passed.') :t('failed')) : current.simulation ? t('notRun') : (state.language==='de'?'Beantworte die Frage, um die Lektion abzuschließen.':'Answer the question to complete this lesson.');
  $('complete').disabled=running || !entry.questionAnswered || Boolean(current.simulation && (!result?.passed || resultCode!==entry.code));
  $('run').disabled=running;
  $('save-status').textContent = t(storageError ? 'saveError' : 'saved');
  renderCircuit();
  renderWaveform();
  renderReference();
}

/** Render the independent circuit preview beside real sampled test results. */
function renderCircuit() {
  renderPreview($('gate-animation'),lesson().id,previewState,state.language,(name,value)=>{
    previewState=changePreview(previewState,name,value);renderCircuit();
  });
  document.querySelector('[data-i18n="gate"]').textContent=content().title;
  document.querySelector('[data-i18n="previewText"]').textContent=state.language==='de'?'Erkunde die erwartete Schaltung unabhängig vom Editor.':'Explore the expected circuit independently of the editor.';
  $('sample-table').replaceChildren();
  if(!result)return;
  const header=document.createElement('tr');
  ['ns',...result.signals,state.language==='de'?'Erwartet':'Expected'].forEach(name=>{const cell=document.createElement('th');cell.textContent=name;header.append(cell);});
  $('sample-table').append(header);
  result.rows.forEach(sample=>{
    const row=document.createElement('tr');
    [sample.time,...result.signals.map(name=>sample[name]),typeof sample.expected==='string'?sample.expected:Object.entries(sample.expected).map(([name,value])=>`${name}=${value}`).join(', ')].forEach(value=>{const cell=document.createElement('td');cell.textContent=value;row.append(cell);});
    $('sample-table').append(row);
  });
}

/** Show genuine transitions only; stale services must update instead of fabricating a trace. */
function renderWaveform() {
  $('waveform').replaceChildren();if(!result)return;
  try { renderTrace($('waveform'),result.trace,state.language); }
  catch(error) {
    console.error('Simulator waveform unavailable or malformed',error);
    const message=document.createElement('p');message.className='muted';
    message.textContent=state.language==='de'?'Signalverlauf fehlt oder ist ungültig. Aktualisiere und starte den GHDL-Dienst neu. Die Testtabelle bleibt verfügbar.':'Waveform is missing or invalid. Update and restart the GHDL service. The test sample table remains available.';
    $('waveform').replaceChildren(message);
  }
}

/** Download a text artifact; object URLs are released after the browser starts saving. */
function download(name, content, type='application/json') {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = name;
  document.body.append(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const backup = () => download('signal-school-progress.json', JSON.stringify(state, null, 2));
$('code').value = progress().code;
$('code').addEventListener('input', () => {
  progress().code = $('code').value;
  if (result) statusKey = 'stale';
  save(); render();
});
$('code').addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault();
    if (!running) $('run').click();
  }
});
$('language').addEventListener('change', () => { state.language = $('language').value; save(); render(); });
$('theme').addEventListener('change', () => { state.theme = $('theme').value; save(); render(); });
// Respect the device preference before starting decorative motion; the checkbox can pause it.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
$('background-motion').checked = !motionPreference.matches;
document.documentElement.dataset.motion = $('background-motion').checked ? 'on' : 'off';
$('background-motion').addEventListener('change', () => {
  document.documentElement.dataset.motion = $('background-motion').checked ? 'on' : 'off';
});
motionPreference.addEventListener('change', event => {
  if (event.matches) {
    $('background-motion').checked = false;
    document.documentElement.dataset.motion = 'off';
  }
});

$('next').addEventListener('click', () => { progress().step = Math.min(content().steps.length-1,progress().step+1); save(); render(); });


$('reset').addEventListener('click', () => {
  if (!window.confirm(t('resetConfirm'))) return;
  progress().code = lesson().starterCode; progress().completed = false; $('code').value = progress().code;
  result = null; statusKey = 'notRun'; $('diagnostics').textContent = ''; save(); render();
});
$('export-vhdl').addEventListener('click', () => download(`${lesson().id}.vhd`,progress().code,'text/plain'));
$('export-progress').addEventListener('click',backup);
$('backup').addEventListener('click',backup);
$('complete').addEventListener('click', () => { progress().completed = true; progress().step = content().steps.length-1; save(); render(); });

$('import-progress').addEventListener('change', async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    if (file.size > 200000) throw new Error(t('fileLarge'));
    pendingImport = validateState(JSON.parse(await file.text()), LESSONS);
    $('import-preview').textContent = `Version 2 · ${pendingImport.language} · ${pendingImport.theme} · ${Object.values(pendingImport.lessons).filter(entry=>entry.completed).length}/8`;
    $('import-dialog').showModal();
  } catch (error) {
    console.error('Progress import rejected',error);
    $('notice').textContent = t('invalidImport');
  } finally { event.target.value = ''; }
});
$('cancel-import').addEventListener('click', () => { pendingImport = null; $('import-dialog').close(); });
$('confirm-import').addEventListener('click', () => {
  if (!pendingImport) return;
  try { localStorage.setItem('signal-school-progress', JSON.stringify(pendingImport)); }
  catch (error) { console.error('Could not store imported progress; current state retained',error); $('notice').textContent=t('saveError'); $('import-dialog').close(); pendingImport=null; return; }
  state = pendingImport; previewState=initialPreview(); pendingImport = null; result = null; resultCode = ''; statusKey = 'notRun';
  $('code').value = progress().code; questionFeedback=''; $('diagnostics').textContent = ''; $('import-dialog').close();
  save(); render(); $('notice').textContent = t('imported');
});

const prefill = new URLSearchParams(location.search).get('api');
try { $('api-url').value = validateServiceUrl(prefill || (['localhost','127.0.0.1'].includes(location.hostname) ? location.origin : 'http://127.0.0.1:8000')); }
catch (error) { console.error('Rejected service URL prefill',error); $('connection-status').textContent = t('invalidUrl'); }

/** Consume a fresh local startup link, including links opened in an existing tab. */
function loadStartupSession() {
try {
  const session = localStartupSession(location.href);
  if (session) {
    // Consume only a loopback startup link, never send its code to a query-prefilled host.
    history.replaceState(null, '', session.cleanUrl);
    $('api-url').value = session.origin;
    $('token').value = session.code;
    $('connection-status').textContent = t('startupReady');
  }
} catch (error) {
  console.error('Could not load local startup connection', error);
  history.replaceState(null, '', location.pathname + location.search);
  $('connection-status').textContent = t('tokenRequired');
}

}
loadStartupSession();
window.addEventListener('hashchange', loadStartupSession);

$('share').addEventListener('click', async () => {
  try {
    const origin = validateServiceUrl($('api-url').value);
    const url = new URL(location.href); url.search = ''; url.hash = ''; url.searchParams.set('api',origin);
    if (navigator.clipboard) {
      try { await navigator.clipboard.writeText(url.href); $('connection-status').textContent = t('copied'); }
      catch (error) { console.error('Clipboard write failed',error); $('connection-status').textContent = `${t('shareFallback')} ${url.href}`; }
    } else $('connection-status').textContent = `${t('shareFallback')} ${url.href}`;
  } catch (error) { console.error('Invalid connection link',error); $('connection-status').textContent = t('invalidUrl'); }
});

$('run').addEventListener('click', async () => {
  let origin;
  try { origin = validateServiceUrl($('api-url').value); }
  catch (error) { console.error('Invalid service URL',error); $('connection-status').textContent = t('invalidUrl'); return; }
  const accessCode = $('token').value.trim();
  if (!accessCode) { $('connection-status').textContent = t('tokenRequired'); return; }
  const submittedCode = progress().code;
  const submittedLesson = lesson();
  running = true; statusKey = 'running'; render();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(`${origin}/api/simulations`, {
      method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${accessCode}`},
      body:JSON.stringify({code:submittedCode,lesson:submittedLesson.simulation}),signal:controller.signal,credentials:'omit'
    });
    const envelope = await response.json();
    if (!response.ok) {
      $('diagnostics').textContent = envelope.error?.message || `HTTP ${response.status}`;
      connectionErrorKey = envelope.error?.code || 'service_failed';
      throw new Error(`Simulation request failed: ${response.status}`);
    }
    const data = envelope.data;
    const current=submittedLesson;
    if(state.activeLesson!==current.id) throw new Error('Active lesson changed during simulation.');
    if(!data || data.lesson!==current.simulation || !Array.isArray(data.rows) || !data.rows.length || !Array.isArray(data.signals) || data.signals.join(',')!==current.ports.join(',') || !Array.isArray(data.outputs) || typeof data.passed!=='boolean' || typeof data.diagnostics!=='string' || data.rows.some(row=>!Number.isFinite(row.time) || data.signals.some(name=>typeof row[name]!=='string' || !/^[UX01ZWLH-]+$/.test(row[name])))) throw new Error('Invalid simulation service response.');
    data.passed=data.rows.every(row=>data.outputs.every(name=>row[name]===(typeof row.expected==='string'?row.expected:row.expected[name])));
    result = data; resultCode = submittedCode;
    statusKey = progress().code !== submittedCode ? 'stale' : data.passed ? 'passed' : 'failed';
    $('diagnostics').textContent = data.diagnostics;
    $('connection-status').textContent = '';
  } catch (error) {
    console.error('Simulation failed',error);
    statusKey = result ? 'stale' : 'notRun';
    const errors = state.language === 'de' ? {
      unauthorized:'Zugangscode ungültig. Prüfe den aktuellen Code in der Dienstkonsole.',
      origin_rejected:'Diese Frontend-Adresse ist im Dienst nicht freigegeben.',
      busy:'Eine Simulation läuft bereits. Versuche es gleich erneut.',
      simulation_failed:'GHDL meldet einen Fehler. Sieh dir die Diagnose an.',
      validation_failed:'Der Dienst hat den Quelltext abgelehnt. Sieh dir die Diagnose an.',
      too_large:'Der Quelltext überschreitet das Größenlimit.',
      service_failed:'Der Dienst meldet einen Fehler. Prüfe die Dienstkonsole.'
    } : {
      unauthorized:'Access code rejected. Check the current code in the service console.',
      origin_rejected:'This frontend origin is not allowed by the service.',
      busy:'A simulation is already running. Try again shortly.',
      simulation_failed:'GHDL reported a problem. Open the diagnostics below.',
      validation_failed:'The service rejected this source. Open the diagnostics below.',
      too_large:'The source exceeds the size limit.',
      service_failed:'The service reported an error. Check the service console.'
    };
    $('connection-status').textContent = errors[connectionErrorKey] || t('offline');
    connectionErrorKey = '';
  } finally { clearTimeout(timeout); running = false; render(); }
});
render();

/** Render unlocked reference using text nodes so search input cannot become markup. */
function renderReference() {
  const entries = referenceEntries(state, $('reference-search').value);
  const unlocked = COMPENDIUM.filter(entry => entry.lesson <= unlockedThrough(state)).length;
  $('reference-status').textContent = unlocked === 0 ? t('referenceEmpty') : entries.length === 0 ? t('referenceNoMatch') : `${entries.length}/${unlocked} · ${state.language === 'de' ? 'Einträge freigeschaltet' : 'entries unlocked'}`;
  $('reference-entries').replaceChildren();
  entries.forEach(entry => {
    const card = document.createElement('details');
    const title = document.createElement('summary'); title.textContent = state.language === 'de' ? entry.deKeyword : entry.keyword;
    const definition = document.createElement('p'); definition.textContent = entry[state.language];
    const example = document.createElement('pre'); example.className = 'concept';
    const code = document.createElement('code'); code.textContent = entry.example; example.append(code);
    const origin = document.createElement('p'); origin.className = 'muted';
    origin.textContent = `${entry.lesson + 1} · ${LESSONS[entry.lesson][state.language].title}`;
    card.append(title, definition, example, origin); $('reference-entries').append(card);
  });
}
$('reference-search').addEventListener('input', renderReference);
$('open-reference').addEventListener('click', () => { $('compendium').open = true; $('reference-search').focus(); });
