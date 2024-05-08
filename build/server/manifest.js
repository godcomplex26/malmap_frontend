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
		client: {"start":"_app/immutable/entry/start.B9nYbd8k.js","app":"_app/immutable/entry/app.BatRcDA_.js","imports":["_app/immutable/entry/start.B9nYbd8k.js","_app/immutable/chunks/entry.CZLTgY0W.js","_app/immutable/chunks/scheduler.B2bXgY5_.js","_app/immutable/entry/app.BatRcDA_.js","_app/immutable/chunks/scheduler.B2bXgY5_.js","_app/immutable/chunks/index.BmZzC8O-.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-BI0kXAeo.js')),
			__memo(() => import('./chunks/1-BVc0wWR1.js')),
			__memo(() => import('./chunks/2-ESrpl78c.js'))
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
