import type { LayoutServerLoad } from ".svelte-kit/types/src/routes/$types"
import { GQL_GetMenuByName } from "$houdini"

export const load: LayoutServerLoad = async (event) => {
	const { data } = await GQL_GetMenuByName.fetch({ variables: { menu: "main" } })

	return {
		path: event.url.pathname,
		menuItems: data?.menu?.menuItems?.nodes,
		siteSettings: data?.menu?.siteSettings,
	}
}
