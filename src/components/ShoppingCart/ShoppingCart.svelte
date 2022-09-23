<script lang="ts">
	import { DialogTitle, TransitionChild } from "@rgossiaux/svelte-headlessui"

	import CartItem from "./CartItem.svelte"
	import XIcon from "$icons/XIcon.svelte"
	import ArrowRightIcon from "$icons/ArrowRightIcon.svelte"
	import LoadingSpinner from "$common/LoadingSpinner.svelte"
	import { GQL_GetCart } from "$houdini"

	export let closeModal: (() => void) | undefined = undefined

	let loading = false

	const handleClearCart = async () => {
		loading = true
		// const { data, error } = await clearCart()
		// TODO - Handle error case
		loading = false
	}

	const GetCart = GQL_GetCart

	$: cart = $GetCart.data?.cart
</script>

<TransitionChild
	class="fixed inset-y-0 right-0 md:max-w-full flex"
	style="maxWidth: 350px;"
	enter="transform transition ease-in-out duration-300"
	enterFrom="translate-x-full"
	enterTo="translate-x-0"
	leave="transform transition ease-in-out duration-300"
	leaveFrom="translate-x-0"
	leaveTo="translate-x-full"
>
	<div class="w-screen max-w-md relative">
		{#if loading}
			<div
				class="absolute z-40 w-full h-full items-center justify-center flex bg-black bg-opacity-10 transition"
			>
				<LoadingSpinner size={24} />
			</div>
		{/if}
		<div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
			<div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
				<div class="flex items-start justify-between">
					<DialogTitle class="text-lg font-extrabold text-gray-900">Shopping Cart</DialogTitle>
					<div class="ml-3 h-7 flex items-center">
						<button
							type="button"
							class="-m-2 p-2 text-gray-400 hover:text-red-main outline-none ring-transparent"
							on:click={() => closeModal && closeModal()}
						>
							<span class="sr-only">Close panel</span>
							<XIcon size={6} />
						</button>
					</div>
				</div>
				<div class="mt-8 h-full">
					<div class="flow-root h-full">
						{#if cart?.contents?.nodes && cart.contents.nodes.length > 0}
							<ul class="-my-6 divide-y divide-gray-200">
								{#each cart.contents.nodes as lineItem (lineItem?.key)}
									{#if lineItem}
										<CartItem {lineItem} {closeModal} />
									{/if}
								{/each}
							</ul>
						{:else}
							<div class="text-gray-600 h-full">
								<div class=" font-bold">Your cart is empty...</div>
								<div class="mt-8 h-full">
									<a
										href="/shop"
										class="text-gray-800 h-full transition hover:text-green-main font-bold flex justify-center items-center"
										on:click={() => closeModal && closeModal()}
									>
										Visit our shop!
										<ArrowRightIcon size={4} type="solid" styling="text-highlight ml-2" />
									</a>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<div
				class={`border-t border-gray-200 py-6 px-4 sm:px-6${cart?.isEmpty !== false && " hidden"}`}
			>
				<!-- <div class="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{cart?.subtotal}</p>
            </div>  -->
				<div class="mt-2">
					<a
						href="/checkout"
						title="Checkout"
						on:click={() => closeModal && closeModal()}
						class="flex w-full justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-accent hover:bg-highlight"
					>
						Checkout
					</a>
				</div>
				<div class="mt-6 flex justify-center text-sm text-center text-gray-500">
					<button
						type="button"
						class="text-red-600 font-medium hover:text-green-main"
						on:click={handleClearCart}
					>
						Clear Cart &nbsp;
					</button>
					<p>
						or{" "}
						<button
							type="button"
							class="text-accent font-medium hover:text-green-main"
							on:click={() => closeModal && closeModal()}
						>
							Continue Shopping
							<span aria-hidden="true"> &rarr;</span>
						</button>
					</p>
				</div>
			</div>
		</div>
	</div>
</TransitionChild>
