<script lang="ts">
	import type { GetUserOrderData$result } from "$houdini"

	type ArrayElement<ArrayType extends readonly unknown[]> =
		ArrayType extends readonly (infer ElementType)[] ? ElementType : never

	type LineItems = Exclude<
		Exclude<GetUserOrderData$result["order"], null>["lineItems"],
		null
	>["nodes"]

	type LineItem = ArrayElement<Exclude<LineItems, null>>

	export let lineItem: LineItem | null | undefined
	const product = lineItem?.product?.node
	const quantity = lineItem?.quantity
</script>

{#if product}
	<tr>
		<td class="py-6 pr-8">
			<div class="flex items-center">
				{#if product.image?.sourceUrl}
					<div class="w-16 object-center object-cover rounded overflow-hidden mr-6">
						<img
							src={product.image.sourceUrl}
							alt={product.image.altText || ""}
							height={product.image.mediaDetails?.height}
							width={product.image.mediaDetails?.width}
							class="object-contain"
						/>
					</div>
				{/if}
				<div class="flex flex-col">
					<div class="font-medium text-gray-900">{product.name}</div>
					{#if product.__typename === "VariableProduct" && product.variations?.nodes && product.variations.nodes[0]?.attributes?.nodes}
						<div>
							{product.variations?.nodes[0]?.attributes?.nodes[0]?.label}:{" "}
							{product.variations?.nodes[0]?.name?.split(" - ")[1]}
						</div>
					{/if}

					<div class="mt-1 sm:hidden">{product.price}</div>
				</div>
			</div>
		</td>
		<td class="hidden py-6 pr-8 sm:table-cell">
			{product.price}
		</td>
		<td class="py-6 pl-2.5 pr-8">
			<div class="hidden sm:table-cell">{quantity}</div>
			<div class="table-cell sm:hidden">
				<div class="w text-right">x{quantity}</div>
				<div class="border-t">
					{"$" +
						(typeof parseFloat(lineItem?.total ?? "N") === "number" &&
							parseFloat(lineItem?.total ?? "N"))}
				</div>
			</div>
		</td>
		<td class="hidden py-6 pr-8 sm:table-cell">
			{"$" +
				(typeof parseFloat(lineItem?.total ?? "N") === "number" &&
					parseFloat(lineItem?.total ?? "N"))}
		</td>
		<td class="py-6 font-medium text-right whitespace-nowrap">
			<a href={`/shop/${product.slug}`} class="text-accent">
				View
				<span class="hidden lg:inline"> Product</span>
				<span class="sr-only">, {product.name}</span>
			</a>
		</td>
	</tr>
{/if}
