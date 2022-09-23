<script lang="ts">
	import { CachePolicy, GQL_GetCart } from "$houdini"

	import authService from "$machines/auth"

	import Checkout from "$components/Checkout"
	import GuestWarning from "$components/Checkout/GuestWarning.svelte"
	import LoadingSpinner from "$common/LoadingSpinner.svelte"

	GQL_GetCart.fetch({ policy: CachePolicy.NetworkOnly })

	$: cart = $GQL_GetCart.data?.cart

	const authStore = authService()
</script>

{#await GQL_GetCart.fetch({ policy: CachePolicy.NetworkOnly })}
	<div class="w-full h-screen mx-auto flex justify-center items-center">
		<LoadingSpinner size={12} />
	</div>
{:then data}
	{#if cart?.isEmpty}
		<div class="max-w-max mx-auto min-h-full py-24">
			<div class="sm:ml-6">
				<div class="text-center">
					<h1 class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
						Cart is empty.
					</h1>
					<p class="mt-1 text-base text-gray-500">
						Please add some items to your cart before checking out.
					</p>
				</div>
				<div class="mt-10 flex space-x-3 justify-center">
					<a
						href="/shop"
						class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-main hover:bg-green-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Visit our shop.
					</a>
					<!-- <a
		href="#"
		class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
	>
		Contact support
	</a> -->
				</div>
			</div>
		</div>
	{:else}
		<div>
			{#if !$authStore.matches("signedIn")}
				<GuestWarning />
			{/if}
			{#if cart}
				<Checkout {cart} />
			{/if}
		</div>
	{/if}
{:catch error}
	{JSON.stringify(error)}
{/await}
