<script lang="ts">
	export let size: number = 6
	export let styling: string = ""

	export let icon: any
	export let ariaHidden: boolean = true
</script>

<div style="width: {size / 4}rem; height: {size / 4}rem;" class={styling} aria-hidden={ariaHidden}>
	<svelte:component this={icon} />
</div>
