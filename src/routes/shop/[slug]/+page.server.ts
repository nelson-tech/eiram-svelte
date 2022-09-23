import type { ServerLoad } from "@sveltejs/kit"

import { GQL_GetAllProducts, GQL_GetProductDataFromSlug } from "$houdini"

export const load: ServerLoad = async (event) => {
	const slug = event.url.pathname.split("/")

	const { data, errors } = await GQL_GetProductDataFromSlug.fetch({
		variables: { id: slug[slug.length - 1] ?? "home" },
	})

	return {
		title: "Eiram.",
		content: "Welcome to our shop.",
		product: data?.product,
	}
}
