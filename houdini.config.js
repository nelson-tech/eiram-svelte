/** @type {import('houdini').ConfigFile} */
const config = {
	client: "./packages/wp/client.ts",
	include: "{src,packages}/**/*.{svelte,graphql,gql,ts,js}",
	apiUrl: "https://api.eiramknitwear.com/graphql",
	framework: "svelte",
	disableMasking: true,
	schemaPollInterval: 0,
}

export default config
