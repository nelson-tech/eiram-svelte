<script lang="ts">
	import ProductGrid from "$components/ProductGrid"

	import type { PageData } from ".svelte-kit/types/src/routes/shop/$types"

	export let data: PageData
</script>

{#if data.products}
	<ProductGrid {data} />
{/if}
