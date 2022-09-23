export function styles(node: any, styles: any) {
	setCustomProperties(node, styles)

	return {
		update(styles: any) {
			setCustomProperties(node, styles)
		},
	}
}

function setCustomProperties(node: any, styles: any) {
	Object.entries(styles).forEach(([key, value]) => {
		node.style.setProperty(`--${key}`, value)
	})
}
