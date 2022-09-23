import { sveltekit } from "@sveltejs/kit/vite"
import houdini from "houdini/vite"

// import autoImport from "sveltekit-autoimport"
// import watchAndRun from "@kitql/vite-plugin-watch-and-run"

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		houdini(),
		sveltekit(),
		// autoImport({
		// 	components: [{ name: "./src/elements", flat: true }],

		// 	module: {
		// 		svelte: ["onMount"],
		// 	},
		// }),
	],
	// server:
	// 	process.env.NODE_ENV === "development"
	// 		? {
	// 				host: "0.0.0.0",
	// 				port: 8141,
	// 				strictPort: true,
	// 				hmr: {
	// 					clientPort: 443,
	// 				},
	// 				fs: {
	// 					allow: [["."], searchForWorkspaceRoot(process.cwd()), "packages/"],
	// 				},
	// 		  }
	// 		: {
	// 				fs: {
	// 					allow: [searchForWorkspaceRoot(process.cwd()), "packages/"],
	// 				},
	// 		  },
}

export default config
