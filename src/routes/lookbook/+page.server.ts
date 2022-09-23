import type { ServerLoad } from "@sveltejs/kit"

import { GQL_GetLookbooks } from "$houdini"

export const load: ServerLoad = async (event) => {
	const slug = event.url.pathname.split("/")
	const { data, errors } = await GQL_GetLookbooks.fetch()

	return {
		lookbooks: data?.lookbooks?.nodes,
	}
}
