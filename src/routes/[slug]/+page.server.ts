import type { ServerLoad } from "@sveltejs/kit"

import { GQL_GetPageData } from "$houdini"

export const load: ServerLoad = async (event) => {
	const slug = event.url.pathname.split("/")

	const { data, errors } = await GQL_GetPageData.fetch({
		variables: { slug: slug[slug.length - 1] ?? "home" },
	})

	return {
		title: "Eiram.",
		content: "Welcome to our shop.",
		pageData: data?.page,
	}
}
