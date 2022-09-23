<script lang="ts">
	import { fade, fly } from "svelte/transition"
	export let path: string
</script>

{#key path}
	<div in:fade>
		<slot />
	</div>
{/key}
