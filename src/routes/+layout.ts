import type { LayoutLoad } from ".svelte-kit/types/src/routes/$types"

export const load: LayoutLoad = async ({ url, data }) => {
	return {
		path: data.path,
		menuItems: data.menuItems,
		siteSettings: data.siteSettings,
	}
}
