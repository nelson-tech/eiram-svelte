<script lang="ts">
	import type { ProductDetail$data } from "$houdini"

	export let product: ProductDetail$data

	const categorySlug = product.productCategories?.nodes
		? product.productCategories.nodes[0]?.slug
		: ""
</script>

<div
	class="group relative bg-white border border-gray-200 rounded-md w-full flex flex-col overflow-hidden"
>
	{#if product.image?.sourceUrl}
		<div class="bg-gray-200 group-hover:opacity-75">
			<div
				class="w-full h-full object-center object-cover sm:w-full sm:h-full aspect-square relative"
			>
				<img
					src={product.image.sourceUrl}
					alt={product.image.altText || ""}
					width={product.image.mediaDetails?.width}
					height={product.image.mediaDetails?.height}
					class="object-cover object-center"
				/>
			</div>
		</div>
	{/if}
	<div class="flex-1 space-y-2 flex flex-col w-full">
		<h3 class="font-bold px-4 py-2 text-gray-900 group-hover:text-accent text-base sm:text-xl">
			<a href={`/shop/${product.slug}`} title={product.name || ""} class="flex flex-col font-sans">
				<span aria-hidden="true" class="absolute inset-0" />
				{product.name}
			</a>
		</h3>
		{#if product.shortDescription}
			<div class="text-sm text-gray-600 p-4">
				{@html product.shortDescription}
			</div>
		{/if}
		<div class="px-4 pb-2 flex-1 flex flex-col justify-end">
			<!-- <p class="text-sm italic text-gray-500">{product.options}</p> -->
			<p class="text-sm font-medium text-gray-400">{product.price}</p>
		</div>
		<div
			class="bg-white w-full border-t text-green-main py-2 text-center group-hover:bg-green-main group-hover:text-white"
		>
			View Product
		</div>
	</div>
</div>
