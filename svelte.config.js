import adapter from "@sveltejs/adapter-auto"
import preprocess from "svelte-preprocess"
import houdini from "houdini/preprocess"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), houdini()],

	kit: {
		adapter: adapter({ out: "dist" }),
		alias: {
			$components: "src/components",
			$ui: "src/components/ui",
			$machines: "src/machines",
			$icons: "src/elements/icons",
			$stores: "/src/stores",
			$wp: "packages/wp",
			$houdini: "./$houdini",
		},
	},
}

export default config