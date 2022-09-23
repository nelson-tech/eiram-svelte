<script lang="ts">
	import type { GetUserOrderData$result } from "$houdini"
	import LineItem from "./LineItem.svelte"
	import OrderSummary from "./Summary.svelte"

	export let order: GetUserOrderData$result["order"] | undefined
</script>

{#if order}<div>
		<h3 class="sr-only">
			Order placed on <time dateTime={order.date || ""}>{order.date}</time>
		</h3>

		<OrderSummary {order} />

		<table class="mt-4 w-full text-gray-500 sm:mt-6">
			<caption class="sr-only">Products</caption>
			<thead class="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
				<tr>
					<th scope="col" class="pr-8 py-3 font-normal"> Product </th>
					<th scope="col" class="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell"> Price </th>
					<th scope="col" class="hidden pr-8 py-3 font-normal sm:table-cell"> Qty </th>
					<th scope="col" class="hidden pr-8 py-3 font-normal sm:table-cell"> Total </th>
					<th scope="col" class="w-0 py-3 font-normal text-right"> Link </th>
				</tr>
			</thead>
			<tbody class="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
				{#if order.lineItems?.nodes}
					{#each order.lineItems.nodes as lineItem}
						{#if lineItem?.product?.node}
							<LineItem {lineItem} />
						{/if}
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
{/if}
