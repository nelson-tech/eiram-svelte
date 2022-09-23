<script lang="ts">
	import { page } from "$app/stores"
	import type { GetUserOrderData$result } from "$houdini"
	import CheckIcon from "$icons/CheckIcon.svelte"
	import OrderDetails from "$components/Orders/Details.svelte"

	export let order: GetUserOrderData$result["order"] | undefined
</script>

<h2 class="text-4xl font-extrabold text-gray-800 text-center">Thank you!</h2>
<div class="flex items-center rounded bg-green-100 shadow w-fit p-2 mt-4 mx-auto">
	<CheckIcon size={8} styling="text-green mr-2" />
	<p class="text-gray-600">Order #{$page.params.orderNumber} has been placed.</p>
</div>
<div class="mt-6 pt-6 border-t">
	{#if order}
		<OrderDetails {order} />
	{:else}
		<div class="px-6 text-gray-500">
			<div class="pb-4">
				Order details are only visible on our website for orders placed with a user account. Please{" "}
				<span class="font-bold">save your order number</span> ( #
				{$page.params.orderNumber} ) for future reference.
			</div>
			<div>
				A sales representative will contact you to finish processing your order. If you have any
				questions, please{" "}
				<a href="/about/contact" class="underline text-accent hover:text-green transition">
					contact us
				</a>
				{" "}
				with your order number ( #{$page.params.orderNumber} ).
			</div>
		</div>
	{/if}
</div>
