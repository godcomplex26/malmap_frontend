

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.D_VZQ-Al.js","_app/immutable/chunks/scheduler.B2bXgY5_.js","_app/immutable/chunks/index.BmZzC8O-.js"];
export const stylesheets = ["_app/immutable/assets/2.BmKEwaXr.css"];
export const fonts = [];
