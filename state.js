export const INITIAL_CODE = `library ieee;
use ieee.std_logic_1164.all;

entity and_gate is
  port (
    a : in std_logic;
    b : in std_logic;
    y : out std_logic
  );
end entity;

architecture rtl of and_gate is
begin
  y <= a and b;
end architecture;
`;

export const LESSON_IDS = ['bits','and','logic','combine','mux','vectors','timing','register'];

/** Create independent version-two progress, initialized from the lesson catalog. */
export function initialState(catalog = []) {
  return {version:2,activeLesson:'bits',lessons:Object.fromEntries(LESSON_IDS.map(id => [id,{code:catalog.find(lesson => lesson.id === id)?.starterCode ?? (id === 'and' ? INITIAL_CODE : ''),step:0,completed:false,questionAnswered:false}])),language:'en',theme:'system'};
}

/** Validate portable progress or migrate a strict version-one AND backup. Throws on invalid input. */
export function validateState(value, catalog = []) {
  const exact = (object,keys) => object && typeof object === 'object' && !Array.isArray(object) && Object.keys(object).length === keys.length && keys.every(key => Object.hasOwn(object,key));
  const preferences = value && ['en','de'].includes(value.language) && ['light','dark','system'].includes(value.theme);
  if (value?.version === 1) {
    if (!exact(value,['version','code','step','completed','language','theme']) || !preferences || typeof value.code !== 'string' || new TextEncoder().encode(value.code).length > 20000 || !Number.isInteger(value.step) || value.step < 0 || value.step > 4 || typeof value.completed !== 'boolean') throw new Error('Invalid version-one backup.');
    const migrated = initialState(catalog);
    migrated.language=value.language; migrated.theme=value.theme; migrated.activeLesson='and';
    migrated.lessons.and={code:value.code,step:Math.min(value.step, (catalog.find(lesson => lesson.id === 'and')?.en.steps.length ?? 5)-1),completed:value.completed,questionAnswered:value.completed};
    return migrated;
  }
  if (!exact(value,['version','activeLesson','lessons','language','theme']) || value.version !== 2 || !preferences || !LESSON_IDS.includes(value.activeLesson) || !exact(value.lessons,LESSON_IDS)) throw new Error('Invalid course progress.');
  for (const id of LESSON_IDS) {
    const entry=value.lessons[id]; const count=catalog.find(lesson => lesson.id === id)?.en.steps.length ?? 20;
    if (!exact(entry,['code','step','completed','questionAnswered']) || typeof entry.code !== 'string' || new TextEncoder().encode(entry.code).length > 20000 || !Number.isInteger(entry.step) || entry.step < 0 || entry.step >= count || typeof entry.completed !== 'boolean' || typeof entry.questionAnswered !== 'boolean') throw new Error('Invalid lesson progress: '+id);
  }
  return structuredClone(value);
}

/** Normalize a service URL. Throws Error for credentials, queries, fragments, or unsafe schemes. */
export function validateServiceUrl(value) {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error('Use an HTTP(S) service origin, without a path or access code.');
  }
  if (url.protocol === 'http:' && !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) {
    throw new Error('Remote services require HTTPS.');
  }
  return url.origin;
}

/** Read a local startup link. Returns session details or null; throws for invalid codes.
 * Only loopback pages can consume the fragment, and the API is fixed to that origin.
 * Fragments are not sent to the server; callers must remove the code from the address bar.
 */
export function localStartupSession(href) {
  const url = new URL(href);
  const code = new URLSearchParams(url.hash.slice(1)).get('session');
  if (code === null) return null;
  if (!['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) return null;
  const origin = validateServiceUrl(url.origin);
  if (!code.trim() || code.length > 256 || /[^\x21-\x7e]/.test(code)) {
    throw new Error('Invalid local startup access code.');
  }
  url.hash = '';
  return { origin, code, cleanUrl: url.href };
}
