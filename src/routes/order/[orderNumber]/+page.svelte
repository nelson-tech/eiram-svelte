<script lang="ts">
	import LoadingSpinner from "$common/LoadingSpinner.svelte"
	import { GQL_GetUserOrderData } from "$houdini"

	import OrderDetails from "$components/Orders/Details.svelte"
	import { page } from "$app/stores"
	import ArrowLeftIcon from "$icons/ArrowLeftIcon.svelte"

	const orderNumber = $page.params.orderNumber
</script>

<div class="max-w-7xl mx-auto py-16 px-8 sm:px-6 lg:pb-24 lg:px-8">
	{#await GQL_GetUserOrderData.fetch( { variables: { id: orderNumber }, metadata: { auth: true } }, )}<div
			class="max-w-xl"
		>
			<div class="w-full relative flex items-center">
				<h1 class="text-2xl uppercase font-extrabold tracking-tight text-gray-900 sm:text-3xl">
					Order Details
				</h1>
				<h2 class="sr-only">Refresh orders</h2>
				<a
					class="ml-8 text-gray-600 cursor-pointer hover:text-green-main transition"
					title="Return to orders"
					href="/orders"
				>
					<h2 class="sr-only">Return to orders</h2>
					<ArrowLeftIcon size={6} styling="hover:text-green" type="solid" />
				</a>
				<LoadingSpinner style="ml-4" size={6} opacity={100} />
			</div>
			<p class="mt-2 text-sm text-gray-500">
				Check the status of recent orders, manage returns, and download invoices.
			</p>
		</div>
	{:then response}
		<div class="max-w-xl">
			<div class="w-full relative flex items-center">
				<h1 class="text-2xl uppercase font-extrabold tracking-tight text-gray-900 sm:text-3xl">
					Order Details
				</h1>
				<h2 class="sr-only">Refresh orders</h2>
				<a
					class="ml-8 text-gray-600 cursor-pointer hover:text-green-main transition"
					title="Return to orders"
					href="/orders"
				>
					<h2 class="sr-only">Return to orders</h2>
					<ArrowLeftIcon size={6} type="solid" />
				</a>
			</div>
			<p class="mt-2 text-sm text-gray-500">
				Check the status of recent orders, manage returns, and download invoices.
			</p>
		</div>
		{#if response.data?.order}
			<div class="mt-16">
				<h2 class="sr-only">Recent orders</h2>

				<div class="space-y-8">
					<OrderDetails order={response.data.order} />
				</div>
			</div>
		{/if}
	{/await}
</div>
