import type { ServerLoad } from "@sveltejs/kit"

import { GQL_GetBackgroundVideo, GQL_GetPageData } from "$houdini"

export const load: ServerLoad = async (event) => {
	const slug = event.url.pathname.split("/")
	const { data, errors } = await GQL_GetBackgroundVideo.fetch()

	return {
		title: "Eiram.",
		content: "Welcome to our shop.",
		bgVideo: data?.page?.bgVideo,
	}
}
