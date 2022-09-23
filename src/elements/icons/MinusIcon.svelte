<script lang="ts">
	export let type: "outline" | "solid" = "outline"
	export let size: number = 6
	export let styling: string = ""
</script>

<div style="width: {size / 4}rem; height: {size / 4}rem;" class={styling}>
	{#if type === "outline"}
		<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="0 0 20 20"
			stroke="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
				clip-rule="evenodd"
			/>
		</svg>
	{/if}
</div>
