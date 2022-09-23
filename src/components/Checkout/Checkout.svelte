<script lang="ts">
	import LoadingSpinner from "$common/LoadingSpinner.svelte"
	import { CachePolicy, GQL_GetCustomerData, type GetCart$result } from "$houdini"
	import CartSummary from "./CartSummary.svelte"
	import CheckoutForm from "./CheckoutForm"
	import DiscountForm from "./DiscountForm.svelte"
	import MobileSummary from "./MobileSummary.svelte"
	import PricingSummary from "./PricingSummary.svelte"

	export let hidePrices: boolean = false
	export let discounts: boolean = false
	export let cart: GetCart$result["cart"]

	GQL_GetCustomerData.fetch({ policy: CachePolicy.NetworkOnly, metadata: { auth: true } })
</script>

<main class="lg:min-h-screen lg:overflow-hidden lg:flex lg:flex-row-reverse max-w-7xl mx-auto">
	<h1 class="sr-only">Checkout</h1>

	<MobileSummary {hidePrices} {cart} />

	<!-- Order summary -->
	<section
		aria-labelledby="summary-heading"
		class="hidden bg-gray-50 w-full max-w-md flex-col lg:flex"
	>
		<h2 id="summary-heading" class="sr-only">Order summary</h2>

		{#if cart?.contents?.nodes}
			<ul class="flex-auto overflow-y-auto divide-y divide-gray-200 px-6">
				<CartSummary lineItems={cart?.contents?.nodes} />
			</ul>
		{/if}
		{#if !hidePrices}
			<div class="sticky bottom-0 flex-none bg-gray-50 border-t border-gray-200 p-6">
				{#if discounts}
					<DiscountForm />
				{/if}

				<PricingSummary {cart} />
			</div>
		{/if}
	</section>
	{#if $GQL_GetCustomerData.data?.customer?.id}
		<CheckoutForm customer={$GQL_GetCustomerData.data.customer} />
	{:else}
		<div class="h-screen mt-48 mx-auto">
			<LoadingSpinner size={12} opacity={50} style="mx-auto" />
		</div>
	{/if}
</main>
