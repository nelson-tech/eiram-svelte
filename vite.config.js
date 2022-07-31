import { sveltekit } from "@sveltejs/kit/vite"
import path from "path"
import { searchForWorkspaceRoot } from "vite"

// import autoImport from "sveltekit-autoimport"
import watchAndRun from "@kitql/vite-plugin-watch-and-run"

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		// autoImport({
		// 	components: [{ name: "./src/elements", flat: true }],

		// 	module: {
		// 		svelte: ["onMount"],
		// 	},
		// }),
		watchAndRun([
			{
				name: "Houdini",
				watch: path.resolve("src/**/*.(gql|graphql|svelte)"),
				run: "npm run generate",
				delay: 100,
				watchKind: ["ready", "add", "change", "unlink"],
			},
			{
				name: "Houdini",
				watch: path.resolve("houdini.config.js"),
				run: "npm run generate",
				delay: 100,
			},
		]),
	],
	server:
		process.env.NODE_ENV === "development"
			? {
					host: "0.0.0.0",
					port: 8141,
					strictPort: true,
					hmr: {
						clientPort: 443,
					},
					fs: {
						allow: [searchForWorkspaceRoot(process.cwd()), "packages/"],
					},
			  }
			: {
					fs: {
						allow: [searchForWorkspaceRoot(process.cwd()), "packages/"],
					},
			  },
}

export default config
