<script lang="ts">
	import ProductCard from "$components/ProductCard"

	import type { PageData } from ".svelte-kit/types/src/routes/shop/$types"

	export let data: PageData
</script>

<div class="py-6 px-8 mx-auto lg:max-w-7xl">
	<div class="">
		<h2 id="product-heading" class="sr-only">Products</h2>

		<div
			class="grid grid-cols-2 gap-y-4 gap-x-2 md:gap-x-4 md:gap-y-10 md:grid-cols-3 lg:gap-x-4 lg:grid-cols-4"
		>
			{#if data.products}
				{#each data.products as product}
					{#if product}
						<ProductCard {product} />
					{/if}
				{/each}
			{/if}
		</div>
	</div>
</div>
