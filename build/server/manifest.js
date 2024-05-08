const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.BeQHdfeD.js","app":"_app/immutable/entry/app.WqpMLhLu.js","imports":["_app/immutable/entry/start.BeQHdfeD.js","_app/immutable/chunks/entry.THagzjR9.js","_app/immutable/chunks/scheduler.B2bXgY5_.js","_app/immutable/entry/app.WqpMLhLu.js","_app/immutable/chunks/scheduler.B2bXgY5_.js","_app/immutable/chunks/index.BmZzC8O-.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-DOs2BALy.js')),
			__memo(() => import('./chunks/1-XD1piiy4.js')),
			__memo(() => import('./chunks/2-1Nc-6GQX.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
