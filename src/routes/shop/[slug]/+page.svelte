<script lang="ts">
	import {
		RadioGroup,
		RadioGroupLabel,
		RadioGroupOption,
		Tab,
		TabGroup,
		TabList,
		TabPanel,
		TabPanels,
	} from "@rgossiaux/svelte-headlessui"

	import type { PageData } from ".svelte-kit/types/src/routes/shop/[slug]/$types"
	import { CachePolicy, GQL_AddToCart, GQL_GetCart } from "$houdini"
	import LoadingSpinner from "$common/LoadingSpinner.svelte"

	export let data: PageData

	const { product } = data

	const attributes = product?.__typename === "VariableProduct" ? product.attributes?.nodes : null

	let selectedAttributes: { [key: string]: string } = {}

	function classs(...classes: string[]) {
		return classes.filter(Boolean).join(" ")
	}

	let loading = false

	const handleSubmit = async () => {
		loading = true

		const variations = product?.__typename === "VariableProduct" ? product.variations?.nodes : null

		let productId = product?.databaseId

		let variationId = null

		if (variations) {
			const matchedVariation = variations.find((variation) => {
				let matches = 0
				Object.entries(selectedAttributes).map(([attribute, value]) => {
					variation?.attributes?.nodes?.filter((varAttribute) => {
						varAttribute?.label === attribute && varAttribute.value === value && matches++
					})
				})

				return matches === attributes?.length
			})
			matchedVariation && (variationId = matchedVariation?.databaseId)
		}

		if (productId) {
			const data = await GQL_AddToCart.mutate({ input: { productId, variationId } }).catch((e) => {
				console.warn("Error adding to cart.", e)
			})

			if (data?.addToCart) {
				await GQL_GetCart.fetch({ policy: CachePolicy.NetworkOnly })
			} else {
				// TODO - Handle error
			}
		}

		loading = false
	}
</script>

<main class="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
	{#if product}
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
				<!-- Image Gallery -->
				{#if product.galleryImages?.nodes}
					<TabGroup as="div" class="flex flex-col-reverse">
						<!-- Image selector -->
						<div class="mx-auto mt-6 px-8 sm:px-0 w-full max-w-2xl sm:block lg:max-w-none">
							<TabList class="grid grid-cols-4 gap-6">
								{#each product.galleryImages.nodes as image}
									{#if image?.sourceUrl}
										<Tab
											class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
										>
											<span class="sr-only"> {image.altText} </span>
											<span class="absolute inset-0 overflow-hidden rounded-md">
												<img
													src={image.sourceUrl}
													alt={image.altText}
													class="h-full w-full object-cover object-center"
												/>
											</span>
											<span
												class={classs(
													"ring-transparent",
													"pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
												)}
												aria-hidden="true"
											/>
										</Tab>
									{/if}
								{/each}
							</TabList>
						</div>

						<TabPanels class="aspect-w-1 aspect-h-1 w-full">
							{#each product.galleryImages.nodes as image}
								{#if image?.sourceUrl}
									<TabPanel>
										<img
											src={image.sourceUrl}
											alt={image.altText}
											class="h-full w-full object-cover object-center sm:rounded-lg"
										/>
									</TabPanel>
								{/if}
							{/each}
						</TabPanels>
					</TabGroup>
				{/if}

				<!-- Product Info -->
				<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
					<h1 class="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

					<div class="mt-3">
						<h2 class="sr-only">Product information</h2>
						<p class="text-3xl tracking-tight text-gray-500">{product.price}</p>
					</div>

					<!-- Reviews -->
					<!-- <div class="mt-3">
						<h3 class="sr-only">Reviews</h3>
						<div class="flex items-center">
							<div class="flex items-center">
								{#each [0, 1, 2, 3, 4] as rating}<StarIcon
										key={rating}
										class={classs(
											product.rating > rating ? "text-indigo-500" : "text-gray-300",
											"h-5 w-5 flex-shrink-0",
										)}
										aria-hidden="true"
									/>
								{/each}
							</div>
							<p class="sr-only">{product.rating} out of 5 stars</p>
						</div>
					</div> -->

					<div class="mt-6">
						<h3 class="sr-only">Description</h3>

						<div
							class="space-y-6 text-base text-gray-700 wp-container border-b pb-8 border-gray-200"
						>
							{@html product.description}
						</div>
					</div>

					<div class="mt-8 lg:col-span-5">
						<form on:submit|preventDefault={handleSubmit}>
							{#if attributes && attributes.length > 0}
								{#each attributes as attribute}
									{#if attribute}
										<div class="mb-8">
											<div class="flex items-center justify-between">
												<h2 class="text-sm font-medium text-gray-900">{attribute.name}</h2>
												{#if ["size", "sizes"].includes(attribute.name.toLowerCase())}
													<a
														href="/size-conversion"
														class="text-sm font-medium text-accent-dark hover:text-accent"
													>
														See sizing chart
													</a>
												{/if}
											</div>

											<RadioGroup
												value={selectedAttributes[attribute.name]}
												on:change={(e) => {
													selectedAttributes[attribute.name] = e.detail
												}}
												class="mt-2"
											>
												<RadioGroupLabel class="sr-only">Choose a {attribute.name}</RadioGroupLabel>
												<div class="flex items-center space-x-3">
													{#if attribute.options && attribute.options.length > 0}
														{#each attribute.options as option}
															<RadioGroupOption
																value={option}
																class={({ active, checked }) =>
																	classs(
																		true
																			? "cursor-pointer focus:outline-none"
																			: "opacity-25 cursor-not-allowed",
																		checked
																			? "bg-accent-dark border-transparent text-white hover:bg-accent-dark"
																			: "bg-white border-gray-200 text-gray-900 hover:bg-accent hover:text-white",
																		"border rounded-sm py-3 px-3 flex items-center justify-center transition text-sm font-medium uppercase flex-1",
																	)}
																disabled={false}
															>
																<RadioGroupLabel as="span">{option}</RadioGroupLabel>
															</RadioGroupOption>
														{/each}
													{/if}
												</div>
											</RadioGroup>
										</div>
									{/if}
								{/each}
							{/if}

							<div class="mt-10 flex">
								<button
									type="submit"
									class="relative flex uppercase transition items-center justify-center rounded-sm border border-transparent bg-accent py-3 px-8 text-base font-medium text-white hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-50 w-full"
								>
									{#if loading}
										<div class="absolute left-0 ml-6">
											<LoadingSpinner size={6} color="white" />
										</div>
									{/if}
									Add to bag
								</button>

								<!-- <button
								type="button"
								class="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
							>
								<HeartIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
								<span class="sr-only">Add to favorites</span>
							</button> -->
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>
