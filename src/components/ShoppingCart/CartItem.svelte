<script lang="ts">
	import {
		CachePolicy,
		GQL_GetCart,
		GQL_RemoveCartItem,
		GQL_UpdateCartItemQuantity,
		type CartItem$data,
	} from "$houdini"

	import MinusIcon from "$icons/MinusIcon.svelte"
	import PlusIcon from "$icons/PlusIcon.svelte"
	import LoadingSpinner from "$common/LoadingSpinner.svelte"

	export let lineItem: CartItem$data

	export let closeModal: (() => void) | undefined = undefined

	const handleQuantityUpdate = async (newQuantity?: number) => {
		// setQuantity(newQuantity)

		newQuantity && (quantity = newQuantity)

		if (quantity && lineItem?.key) {
			const data = await GQL_UpdateCartItemQuantity.mutate({
				input: {
					items: [{ key: lineItem?.key, quantity }],
				},
			})

			// TODO - See if we need to do this
			GQL_GetCart.fetch({ policy: CachePolicy.NetworkOnly })
			data && console.log(data)
			// errors && console.warn(errors)
		}
	}

	let loading = false

	const handleRemoveItem = async (key: string) => {
		loading = true
		const data = await GQL_RemoveCartItem.mutate({ input: { keys: [key] } }).catch((e) => {
			// TODO - Handle error
			console.warn("ERROR REMOVING ITEM FROM CART", e)
		})
		console.log("DATA", data?.removeItemsFromCart)

		// TODO - See if we need to do this
		GQL_GetCart.fetch({ policy: CachePolicy.NetworkOnly })
	}

	let quantity = lineItem?.quantity
	$: category =
		(lineItem?.product?.node?.productCategories?.nodes &&
			lineItem?.product?.node.productCategories.nodes[0]?.slug) ||
		""
</script>

<div class="py-6 relative z-0">
	{#if lineItem?.product?.node}
		<li class="flex items-center">
			{#if lineItem?.product?.node?.image}
				<div
					class={`flex-shrink-0 w-16 h-16 md:w-24 md:h-24 border border-gray-200 rounded-md overflow-hidden`}
				>
					<img
						src={lineItem?.product?.node.image.sourceUrl || ""}
						alt={lineItem?.product?.node.image.altText || ""}
						width={lineItem?.product?.node.image.mediaDetails?.width}
						height={lineItem?.product?.node.image.mediaDetails?.height}
					/>
				</div>
			{/if}

			<div class="ml-4 flex-1 flex flex-col mb-1 justify-between">
				<div class="flex justify-between items-center ">
					<h3
						on:click={() => closeModal && closeModal()}
						on:keyup={() => closeModal && closeModal()}
					>
						<a
							href={`/shop/${lineItem?.product?.node.slug}`}
							class="font-bold text-sm text-gray-900"
						>
							{lineItem?.product?.node.name}
						</a>
					</h3>
					<p class="ml-4 text-xs text-gray-500">
						{lineItem.subtotal}
					</p>
				</div>
				<p class="flex gap-8 mt-1 text-sm text-gray-500">
					{#if lineItem?.variation?.attributes}
						{#each lineItem?.variation?.attributes as attribute, i}
							<div class="">
								{`${attribute?.label} - ${attribute?.value}`}
							</div>
						{/each}
					{/if}
				</p>

				<div class="flex-1 flex items-center justify-between text-sm mt-3">
					{#if quantity}
						<div class="flex items-center space-x-2 text-xs text-gray-600">
							<label for="quantity" class="pr-2">
								Quantity:{" "}
							</label>
							<div
								class="cursor-pointer"
								on:click={() => {
									console.log("Minus clicked")

									quantity && handleQuantityUpdate(quantity - 1)
								}}
								on:keyup={() => {
									console.log("Minus clicked")

									quantity && handleQuantityUpdate(quantity - 1)
								}}
							>
								<MinusIcon size={3} type="solid" />
							</div>

							<input
								class="w-16 text-center border py-1 text-xs rounded outline-none focus:bg-white ring-transparent"
								bind:value={quantity}
								id="quantity"
								name="quantity"
								type="number"
								min={1}
								on:change={async () => await handleQuantityUpdate()}
							/>

							<div
								class="cursor-pointer"
								on:click={() => {
									quantity && handleQuantityUpdate(quantity + 1)
								}}
								on:keyup={() => {
									quantity && handleQuantityUpdate(quantity + 1)
								}}
							>
								<PlusIcon size={3} type="solid" />
							</div>
						</div>
					{/if}
					<div class="">
						{#if loading}
							<LoadingSpinner style="mr-4" size={4} />
						{:else}
							<button
								type="button"
								title="Remove"
								class="font-medium text-accent hover:text-red transition"
								on:click={async () => lineItem?.key && (await handleRemoveItem(lineItem.key))}
							>
								Remove
							</button>
						{/if}
					</div>
				</div>
			</div>
		</li>
	{/if}
</div>
