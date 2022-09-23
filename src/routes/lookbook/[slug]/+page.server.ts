import type { ServerLoad } from "@sveltejs/kit"

import { GQL_GetLookbook } from "$houdini"

export const load: ServerLoad = async (event) => {
	const slug = event.params.slug
	const { data } = await GQL_GetLookbook.fetch({ variables: { slug: slug || "home" } })
	return {
		lookbook: data?.lookbook,
	}
}
