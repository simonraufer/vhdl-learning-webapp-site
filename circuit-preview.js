const NS = 'http://www.w3.org/2000/svg';

/** Create independent teaching state. No learner source is evaluated here. */
export function initialPreview() { return { a:'0', b:'0', c:'0', sel:'0', bus_in:'0000', clk:'0', reset:'0', d:'0', q:'U' }; }

/** Change one input, capturing a synchronous register only on a rising clock edge. */
export function changePreview(state, name, value) {
  if (!Object.hasOwn(state,name) || name==='q' || !/^[01UX]+$/.test(value) || (name==='bus_in' ? value.length!==4 : value.length!==1)) throw new Error('Invalid conceptual input');
  const next={...state,[name]:value};
  if(name==='clk' && state.clk==='0' && value==='1') next.q=state.reset==='1'?'0':state.d;
  return next;
}
const and=(a,b)=>a==='0'||b==='0'?'0':a==='U'||b==='U'?'U':a==='X'||b==='X'?'X':'1';

/** Evaluate the documented lesson circuit; outputs remain independent of editor code. */
export function previewOutputs(id,s) {
  switch(id) {
    case 'bits': case 'and': case 'timing': return {y:and(s.a,s.b)};
    case 'logic': return {n:s.a==='1'?'0':'1',o:s.a==='1'||s.b==='1'?'1':'0',x:s.a===s.b?'0':'1'};
    case 'combine': return {both_on:and(s.a,s.b),y:and(s.a,s.b)==='1'||s.c==='1'?'1':'0'};
    case 'mux': return {y:s.sel==='0'?s.a:s.b};
    case 'vectors': return {low_bits:s.bus_in.slice(2),parity:String([...s.bus_in].filter(v=>v==='1').length%2)};
    case 'register': return {q:s.q};
    default: throw new Error(`Unknown preview lesson: ${id}`);
  }
}

function svgElement(tag,attrs={},text='') {
  const element=document.createElementNS(NS,tag);
  Object.entries(attrs).forEach(([name,value])=>element.setAttribute(name,String(value)));
  if(text)element.textContent=text;
  return element;
}

/** Render native input buttons at wire origins and LEDs at the circuit outputs. */
export function renderPreview(container,id,state,language,onChange) {
  const outputs=previewOutputs(id,state);
  const focused=container.contains(document.activeElement)?document.activeElement.dataset.inputKey:null;
  container.replaceChildren();
  const diagram=document.createElement('div');diagram.className='interactive-circuit';
  const svg=svgElement('svg',{viewBox:'0 0 600 320','aria-hidden':'true'});diagram.append(svg);
  const wire=(x1,y1,x2,y2,value)=>{
    svg.append(svgElement('path',{d:`M${x1} ${y1}H${x2}V${y2}`,class:`signal-wire ${value==='1'?'signal-high':''} ${'UX'.includes(value)?'signal-unknown':''}`}));
    if(value==='1') {
      const pulse=svgElement('circle',{cx:x1,cy:y1,r:4,class:'circuit-pulse'});
      pulse.style.setProperty('--travel-x',`${x2-x1}px`);pulse.style.setProperty('--travel-y',`${y2-y1}px`);
      svg.append(pulse);
    }
  };
  const gate=(label,x,y,w=100,h=66,inputOffset=10)=>{
    const group=svgElement('g',{transform:`translate(${x} ${y-h/2}) scale(${w/100} ${h/100})`});
    // Normalized symbols keep the wire endpoints fixed across lesson layouts.
    const shapes={
      AND:'M0 0H50C116.667 0 116.667 100 50 100H0Z',
      OR:'M0 0Q60 0 100 50Q60 100 0 100Q28 50 0 0Z',
      XOR:'M10 0Q65 0 100 50Q65 100 10 100Q38 50 10 0Z',
      NOT:'M0 0L84 50L0 100Z',
      MUX:'M0 0L100 20V80L0 100Z'
    };
    if(shapes[label]) {
      group.append(svgElement('path',{d:shapes[label],class:'signal-gate'}));
      if(label==='XOR')group.append(svgElement('path',{d:'M0 0Q28 50 0 100',class:'signal-gate-extra'}));
      if(label==='OR'||label==='XOR') {
        [-inputOffset,inputOffset].forEach(offset=>{
          const portY=50+offset*100/h;
          const t=portY/100;
          const end=(label==='XOR'?10:0)+56*t*(1-t);
          group.append(svgElement('path',{d:`M0 ${portY}H${end}`,class:'signal-gate-extra'}));
        });
      }
      if(label==='NOT')group.append(svgElement('circle',{cx:92,cy:50,r:8,class:'signal-gate'}));
    } else group.append(svgElement('rect',{x:0,y:0,width:100,height:100,rx:3,class:'signal-gate'}));
    svg.append(group);
    svg.append(svgElement('text',{x:x+w/2,y:y-h/2-9,'text-anchor':'middle'},label));
  };
  const input=(name,value,x,y,choices=['0','1'],bitIndex=null)=>{
    const button=document.createElement('button');button.type='button';button.className='circuit-input';
    button.style.left=`${x/6}%`;button.style.top=`${y/3.2}%`;
    button.textContent=`${bitIndex===null?name:`[${bitIndex}]`}=${value}`;
    button.dataset.inputKey=`${name}-${bitIndex??''}`;
    button.setAttribute('aria-label',`${language==='de'?'Eingang':'Input'} ${name}${bitIndex===null?'':`(${bitIndex})`}: ${value}`);
    button.setAttribute('aria-pressed',String(value==='1'));
    button.addEventListener('click',()=>{
      const next=choices[(choices.indexOf(value)+1)%choices.length];
      if(bitIndex===null)onChange(name,next);
      else {const bits=[...state.bus_in];bits[3-bitIndex]=next;onChange('bus_in',bits.join(''));}
    });diagram.append(button);
  };
  const led=(name,value,x,y)=>{
    svg.append(svgElement('circle',{cx:x,cy:y,r:21,class:'signal-led-ring'}));
    svg.append(svgElement('circle',{cx:x,cy:y,r:15,class:`signal-led ${value==='1'?'is-on':''} ${'UX'.includes(value)?'is-unknown':''}`}));
    svg.append(svgElement('text',{x,y:y+40,'text-anchor':'middle'},`${name}=${value}`));
  };
  const inputs=id==='vectors'?['bus_in']:id==='register'?['clk','reset','d']:id==='combine'?['a','b','c']:id==='mux'?['a','b','sel']:['a','b'];
  if(id==='logic') {
    input('a',state.a,45,90);input('b',state.b,45,230);
    [['NOT',70,'n'],['OR',160,'o'],['XOR',250,'x']].forEach(([label,y,key])=>{
      wire(45,90,205,key==='n'?y:y-10,state.a);if(key!=='n')wire(45,230,205,y+10,state.b);
      gate(label,205,y);wire(305,y,530,y,outputs[key]);led(key,outputs[key],550,y);
    });
  } else if(id==='vectors') {
    [3,2,1,0].forEach((bit,index)=>{const y=45+index*72;input('bus_in',state.bus_in[index],45,y,['0','1'],bit);wire(45,y,230,y,state.bus_in[index]);});
    gate('SLICE / XOR',230,160,150,230);
    [['low_bits(1)',outputs.low_bits[0],80],['low_bits(0)',outputs.low_bits[1],165],['parity',outputs.parity,250]].forEach(([name,value,y])=>{wire(380,y,530,y,value);led(name,value,550,y);});
  } else if(id==='combine') {
    input('a',state.a,45,60);input('b',state.b,45,130);input('c',state.c,45,250);
    wire(45,60,185,75,state.a);wire(45,130,185,115,state.b);gate('AND',185,95,85);
    wire(270,95,380,145,outputs.both_on);wire(45,250,380,185,state.c);gate('OR',380,165,80,66,20);
    svg.append(svgElement('text',{x:300,y:80},`both_on=${outputs.both_on}`));wire(460,165,530,165,outputs.y);led('y',outputs.y,550,165);
  } else {
    const positions=inputs.length===3?[60,160,260]:[95,225];
    inputs.forEach((name,index)=>{const y=positions[index];input(name,state[name],45,y,id==='timing'?['0','1','U','X']:['0','1']);wire(45,y,245,y,state[name]);});
    gate(id==='register'?'REGISTER':id==='mux'?'MUX':'AND',245,160,140,230);
    const key=id==='register'?'q':'y';wire(385,160,530,160,outputs[key]);led(key,outputs[key],550,160);
  }
  container.append(diagram);
  const description=document.createElement('p');description.className='muted';description.setAttribute('role','status');
  description.textContent=Object.entries(outputs).map(([key,value])=>`${key}=${value}`).join(' · ');
  container.append(description);
  const note=document.createElement('p');note.className='muted';
  note.textContent=language==='de'?'Unabhängige Konzeptvorschau, nicht dein Code. Klicke die Bits am Leitungsanfang. LED: grün = 1, gedimmt = 0, orange = unbekannt. Bewegung zeigt keine reale Verzögerung.':'Independent concept preview, not your code. Click bits at the wire origins. LED: green = 1, dim = 0, amber = unknown. Motion does not represent a real delay.';
  container.append(note);
  if(focused)container.querySelector(`[data-input-key="${focused}"]`)?.focus({preventScroll:true});
}
