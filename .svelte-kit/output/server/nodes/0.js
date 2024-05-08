

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BTUceKXD.js","_app/immutable/chunks/scheduler.B2bXgY5_.js","_app/immutable/chunks/index.BmZzC8O-.js"];
export const stylesheets = ["_app/immutable/assets/0.CpVaWaX2.css"];
export const fonts = [];
