<script lang="ts">
	import { Disclosure, DisclosureButton, DisclosurePanel } from "@rgossiaux/svelte-headlessui"
	import type { GetCart$result } from "$houdini"

	import CartSummary from "./CartSummary.svelte"
	import DiscountForm from "./DiscountForm.svelte"
	import PricingSummary from "./PricingSummary.svelte"

	export let hidePrices: boolean = false
	export let discounts: boolean = false
	export let cart: GetCart$result["cart"]
</script>

<section aria-labelledby="order-heading" class="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden">
	<Disclosure as="div" defaultOpen class="max-w-lg mx-auto" let:open>
		<div class="flex items-center justify-between">
			<h2 id="order-heading" class="text-lg font-medium text-gray-900">Your Order</h2>
			<DisclosureButton class="font-medium text-blue-main hover:text-green-main">
				{#if open}
					<span>Hide full summary</span>
				{:else}
					<span>Show full summary</span>
				{/if}
			</DisclosureButton>
		</div>

		<DisclosurePanel>
			{#if cart?.contents?.nodes}
				<ul class="divide-y divide-gray-200">
					<CartSummary lineItems={cart.contents.nodes} />
				</ul>
			{/if}

			{#if !hidePrices}
				<div class="border-t border-gray-200">
					{#if discounts}<DiscountForm styles="mt-10" />
					{/if}

					<PricingSummary {cart} />
				</div>
			{/if}
		</DisclosurePanel>

		{#if !hidePrices}
			<p
				class="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6"
			>
				<span class="text-base">Total</span>
				<span class="text-base">{cart?.total}</span>
			</p>
		{/if}
	</Disclosure>
</section>
