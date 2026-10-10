const NS='http://www.w3.org/2000/svg';

/** Validate bounded real simulator traces. Throws on missing or malformed trace data. */
export function validateTrace(trace) {
  if(!trace || !Number.isFinite(trace.duration) || trace.duration<=0 || !Array.isArray(trace.signals) || !trace.signals.length || trace.signals.length>32) throw new Error('Missing or invalid simulator trace');
  let count=0;const names=new Set();
  for(const signal of trace.signals) {
    if(!signal || typeof signal.name!=='string' || !signal.name || names.has(signal.name) || !Number.isInteger(signal.width) || signal.width<1 || signal.width>64 || !Array.isArray(signal.changes) || !signal.changes.length || signal.changes.length>5000) throw new Error('Invalid waveform signal');
    names.add(signal.name);let previous=-1;
    for(const change of signal.changes) {
      if(!change || !Number.isFinite(change.time) || change.time<0 || change.time>trace.duration || change.time<previous || typeof change.value!=='string' || change.value.length!==signal.width || !/^[01UXZWLH-]+$/.test(change.value)) throw new Error(`Invalid transition in ${signal.name}`);
      previous=change.time;if(++count>10000)throw new Error('Too many waveform transitions');
    }
    if(signal.changes[0].time!==0)throw new Error(`Missing initial value for ${signal.name}`);
  }
  return trace;
}

/** Build time-scaled stepped geometry; unknown values retain their original symbols. */
export function traceGeometry(trace,width=900) {
  validateTrace(trace);
  if(!Number.isFinite(width)||width<300)throw new Error('Invalid waveform width');
  const left=120,right=width-25,scale=(right-left)/trace.duration;
  return {width,height:trace.signals.length*64+55,left,right,scale,lanes:trace.signals.map((signal,index)=>{
    const top=20+index*64;const level=value=>value==='1'?top+7:value==='0'?top+35:top+21;
    const segments=signal.changes.map((change,i)=>({x:left+change.time*scale,end:left+(signal.changes[i+1]?.time??trace.duration)*scale,value:change.value,time:change.time}));
    const path=segments.map((segment,i)=>`${i?'V':'M '+segment.x+' '}${level(segment.value)} H${segment.end}`).join(' ');
    return {name:signal.name,width:signal.width,top,path,segments};
  })};
}

function element(tag,attrs,text) {
  const node=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,String(value)));if(text!==undefined)node.textContent=text;return node;
}

/** Render actual simulator transitions with time labels and scrollable vector lanes. */
export function renderTrace(container,trace,language) {
  const geometry=traceGeometry(trace);container.replaceChildren();
  const note=document.createElement('p');note.className='muted';note.textContent=language==='de'?'Echter GHDL-VCD-Verlauf in ns. Delta-Zyklen werden nicht dargestellt. U/X und weitere std_logic-Zustände bleiben sichtbar.':'Actual GHDL VCD transitions in ns. Delta cycles are not shown. U/X and other std_logic states remain visible.';container.append(note);
  const svg=element('svg',{viewBox:`0 0 ${geometry.width} ${geometry.height}`,width:geometry.width,height:geometry.height,role:'img','aria-label':language==='de'?'GHDL-Signalverlauf':'GHDL signal waveform',class:'real-wave-svg'});
  for(let index=0;index<=8;index++) {
    const time=trace.duration*index/8;const x=geometry.left+time*geometry.scale;
    svg.append(element('path',{d:`M${x} 8V${geometry.height-35}`,class:'wave-grid'}));
    svg.append(element('text',{x,y:geometry.height-12,'text-anchor':'middle'},`${Number(time.toFixed(3))}ns`));
  }
  geometry.lanes.forEach(lane=>{
    svg.append(element('text',{x:8,y:lane.top+25},lane.name));
    if(lane.width===1)svg.append(element('path',{d:lane.path,class:'wave-trace'}));
    lane.segments.forEach((segment,index)=>{
      if(lane.width>1 && segment.end-segment.x>8) {
        svg.append(element('path',{d:`M${segment.x} ${lane.top+21}l4 -14H${Math.max(segment.x+4,segment.end-4)}l4 14l-4 14H${segment.x+4}Z`,class:'wave-bus'}));
      }
      const unknown=!/^[01]+$/.test(segment.value);
      if(unknown)svg.append(element('rect',{x:segment.x,y:lane.top+3,width:Math.max(0,segment.end-segment.x),height:36,class:'wave-unknown-band'}));
      if((lane.width>1||unknown)&&segment.end-segment.x>Math.max(12,segment.value.length*8)) {
        const text=element('text',{x:(segment.x+segment.end)/2,y:lane.top+25,'text-anchor':'middle',class:unknown?'wave-unknown-label':''},segment.value);
        text.append(element('title',{},`${lane.name} = ${segment.value}, ${segment.time} ns`));svg.append(text);
      }
      // An accessible full transition list retains values too narrow for visual labels.
      const title=element('title',{},`${lane.name}: ${segment.value} at ${segment.time} ns`);svg.append(title);
    });
  });
  container.append(svg);
  const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent=language==='de'?'Alle Übergänge als Text':'All transitions as text';details.append(summary);
  trace.signals.forEach(signal=>{const paragraph=document.createElement('p');paragraph.textContent=`${signal.name}: ${signal.changes.map(change=>`${change.time}ns=${change.value}`).join(' → ')}`;details.append(paragraph);});container.append(details);
}
