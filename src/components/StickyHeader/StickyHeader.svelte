<script lang="ts">
	import { onMount } from "svelte"

	let header: HTMLDivElement
	let headerHeight: number
	let headerShifterHeight = 0

	function fixHeaderOffset() {
		header.style.setProperty("--computed-height", `${headerHeight}px`)

		headerShifterHeight =
			Math.min(
				header.offsetTop,
				document.documentElement.scrollHeight - window.innerHeight - headerHeight,
			) - 1
	}

	onMount(() => {
		header.style.position = "initial"
		header.style.top = "calc(var(--_computed-height) * -1 - 1px)"
		header.style.bottom = "calc(100% - var(--_computed-height))"
		fixHeaderOffset()
	})
</script>

<svelte:window on:scroll={fixHeaderOffset} on:resize={fixHeaderOffset} />
<div style:height="{headerShifterHeight}px" class="header-shifter" />
<div
	bind:this={header}
	bind:clientHeight={headerHeight}
	style:margin-bottom="-{headerShifterHeight}px"
	class="header"
>
	<slot />
</div>

<style>
	.header-shifter {
		background-color: var(--colour-dark);
	}
	.header {
		--_computed-height: var(--computed-height, 165px);
		position: relative;
		background: var(--colour-dark);
		color: var(--colour-brand);
		padding: var(--spacing-6);
	}
</style>
