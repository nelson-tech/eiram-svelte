<script lang="ts">
	import type { GetUserOrderData$result } from "$houdini"

	export let order: GetUserOrderData$result["order"] | undefined
	export let detailsLink: boolean = false

	const orderDate = order?.date ? new Date(order.date).toLocaleDateString() : null
</script>

{#if order}
	<div
		class="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center text-sm sm:justify-between sm:space-x-6 lg:space-x-4"
	>
		<h3 class="sr-only">
			Order placed on <time dateTime={order.date || ""}>{order.date}</time>
		</h3>
		{" "}
		<div class="flex justify-between sm:block">
			<dt class="font-medium text-gray-900">Date placed</dt>
			<dd class="sm:mt-1">
				<time dateTime={order.date || ""}>{orderDate}</time>
			</dd>
		</div>
		<div class="flex justify-between pt-6 sm:block sm:pt-0">
			<dt class="font-medium text-gray-900">Order number</dt>
			<dd class="sm:mt-1">{order.orderNumber}</dd>
		</div>
		<div class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
			<dt>Total Quantity</dt>
			<dd class="sm:mt-1 text-gray-600">
				{#if order.lineItems?.nodes}
					{order.lineItems?.nodes
						.map((item) => item?.quantity)
						.reduce(function (itemA, itemB) {
							if (itemA && itemB) {
								return Number(itemA) + Number(itemB)
							}
							return 0
						})}
				{/if}
			</dd>
		</div>
		<div class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
			<dt>Status</dt>
			<dd class="sm:mt-1 text-gray-600">{order.status}</dd>
		</div>
		{#if detailsLink}
			<a
				href={`/order/${order.orderNumber}`}
				class="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0"
			>
				View Details
				<span class="sr-only">for order {order.orderNumber}</span>
			</a>
		{/if}
	</div>
{/if}
