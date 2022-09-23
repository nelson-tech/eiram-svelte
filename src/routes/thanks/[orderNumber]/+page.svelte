<script lang="ts">
	import { page } from "$app/stores"
	import LoadingSpinner from "$common/LoadingSpinner.svelte"
	import OrderConfirmation from "$components/OrderConfirmation"
	import { GQL_GetUserOrderData } from "$houdini"
	import authService from "$machines/auth"

	const orderNumber = $page.params.orderNumber

	const authStore = authService("Thanks Page")
</script>

<div class="max-w-7xl mx-auto">
	<div class="py-8 px-6 w-full h-full">
		{#await GQL_GetUserOrderData.fetch( { variables: { id: orderNumber }, metadata: { auth: true } }, )}
			<div class="mx-auto">
				<p class="text-center mt-8">Fetching order details...</p>
				<LoadingSpinner size={24} opacity={50} style="m-auto flex mt-16" />
			</div>
		{:then res}
			<OrderConfirmation order={res.data?.order} />
		{:catch error}
			<div>
				<h2 class="text-xl font-extrabold text-gray-400 text-center">
					<p>Oops, no order found...</p>
					<p>Please contact us if you think there&apos;s been a mistake.</p>
				</h2>
			</div>
			{#if $authStore.matches("signedIn")}
				<div class="mt-8 text-center text-gray-500">
					<p>
						You can view your previous orders from the{" "}
						<a href="/orders" class="text-accent hover:text-highlight transition underline">
							dashboard
						</a>
						.
					</p>
				</div>
			{/if}
		{/await}
	</div>
</div>
