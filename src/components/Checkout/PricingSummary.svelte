<script lang="ts">
	import type { GetCart$result } from "$houdini"

	export let cart: GetCart$result["cart"]
</script>

<dl class="text-sm font-medium text-gray-500 mt-10 space-y-6">
	<div class="flex justify-between">
		<dt>Subtotal</dt>
		<dd class="text-gray-900">{cart?.subtotal}</dd>
	</div>
	{#if cart?.appliedCoupons}
		<div class="flex justify-between">
			<dt class="flex">
				Discount
				<span class="ml-2 rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 tracking-wide">
					{#each cart.appliedCoupons as coupon}
						{coupon?.code}
					{/each}
				</span>
			</dt>

			<dd class="text-gray-900">-{cart?.discountTotal}</dd>
		</div>
	{/if}
	<div class="flex justify-between">
		<dt>Taxes</dt>
		<dd class="text-gray-900">{cart?.totalTax}</dd>
	</div>
	<div class="flex justify-between">
		<dt>Shipping</dt>
		<dd class="text-gray-900">{cart?.shippingTotal}</dd>
	</div>

	<div class="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
		<dt>Total</dt>
		<dd class="text-base">{cart?.total}</dd>
	</div>
</dl>
