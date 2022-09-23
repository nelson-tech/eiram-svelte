import adapter from "@sveltejs/adapter-node"
// import adapter from "@sveltejs/adapter-auto"

import path from "path"

import preprocess from "svelte-preprocess"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({ postcss: true })],

	kit: {
		adapter: adapter({ out: "dist" }),
		// adapter: adapter(),
		alias: {
			$components: "src/components",
			$ui: "src/components/ui",
			$machines: "src/machines",
			$common: "src/elements",
			$icons: "src/elements/icons",
			$stores: "src/stores",
			$wp: "packages/wp",
			$houdini: path.resolve(".", "$houdini"),
		},
	},
}

export default config
