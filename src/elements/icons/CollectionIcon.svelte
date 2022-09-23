<script lang="ts">
	export let type: "outline" | "solid" = "outline"
	export let size: number = 6
	export let styling: string = ""
</script>

<div style="width: {size / 4}rem; height: {size / 4}rem;" class={styling}>
	{#if type === "outline"}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
			/>
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
			/>
		</svg>
	{/if}
</div>
