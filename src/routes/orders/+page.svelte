<script lang="ts">
	import LoadingSpinner from "$common/LoadingSpinner.svelte"
	import { CachePolicy, GQL_GetUserOrdersData } from "$houdini"

	import OrderSummary from "$components/Orders/Summary.svelte"
	import authService from "$machines/auth"
	import { goto } from "$app/navigation"
	import { browser } from "$app/environment"

	const authStore = authService("Orders Page")

	$: $authStore.matches("signedOut") && browser && goto("/login/orders")
</script>

<div class="max-w-7xl mx-auto py-16 px-8 sm:px-6 lg:pb-24 lg:px-8">
	{#await GQL_GetUserOrdersData.fetch( { policy: CachePolicy.NetworkOnly, metadata: { auth: true } }, )}
		<div class="max-w-xl">
			<div class="w-full relative flex items-center">
				<h1 class="text-2xl uppercase font-extrabold tracking-tight text-gray-900 sm:text-3xl">
					Order History
				</h1>
				<div
					class="ml-8 text-gray-600 cursor-pointer hover:text-green-main transition"
					title="Refresh orders"
				>
					<h2 class="sr-only">Refresh orders</h2>
					<LoadingSpinner size={6} opacity={100} />
				</div>
			</div>
			<p class="mt-2 text-sm text-gray-500">
				Check the status of recent orders, manage returns, and download invoices.
			</p>
		</div>
	{:then response}
		<div class="max-w-xl">
			<div class="w-full relative flex items-center">
				<h1 class="text-2xl uppercase font-extrabold tracking-tight text-gray-900 sm:text-3xl">
					Order History
				</h1>
			</div>
			<p class="mt-2 text-sm text-gray-500">
				Check the status of recent orders, manage returns, and download invoices.
			</p>
		</div>
		<div class="mt-16">
			<h2 class="sr-only">Recent orders</h2>

			<div class="space-y-8">
				{#if response.data?.orders?.nodes}
					{#each response.data.orders.nodes as order}
						{#if order?.orderNumber}
							<div>
								<OrderSummary {order} detailsLink />
							</div>
						{/if}
					{/each}
				{/if}
			</div>
		</div>
	{:catch error}
		{JSON.stringify(error)}
	{/await}
</div>
