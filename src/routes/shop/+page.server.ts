import type { ServerLoad } from "@sveltejs/kit"

import { GQL_GetAllProductsTest } from "$houdini"

export const load: ServerLoad = async (event) => {
	const slug = event.url.pathname.split("/")

	const { data, errors } = await GQL_GetAllProductsTest.fetch()

	return {
		title: "Eiram.",
		content: "Welcome to our shop.",
		products: data?.products?.nodes,
	}
}
