<script lang="ts">
	import { CachePolicy, GQL_GetCart } from "$houdini"

	import modalsService from "$machines/modals"

	import StickyHeader from "$components/StickyHeader"
	import Logo from "./Logo.svelte"
	import UserMenu from "./UserMenu.svelte"
	import MainMenu from "./MainMenu.svelte"
	import LoadingSpinner from "$common/LoadingSpinner.svelte"
	import MenuIcon from "$icons/MenuIcon.svelte"
	import ShoppingCartIcon from "$icons/ShoppingCartIcon.svelte"

	const modalsStore = modalsService()

	const { send } = modalsStore

	const {} = GQL_GetCart.fetch({ policy: CachePolicy.NetworkOnly })

	$: quantity = $GQL_GetCart.data?.cart?.contents?.itemCount
</script>

<StickyHeader>
	<header class="relative z-10">
		<nav aria-label="Top">
			<div class="bg-white bg-opacity-100">
				<div class="border-b border-gray-200">
					<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div class="h-16 flex items-center justify-between rounded-sm">
							<!-- {/* Logo (lg+) */} -->
							<Logo />

							<MainMenu />

							<!-- {/* Mobile menu and search (lg-) */} -->
							<div class="flex-1 flex items-center lg:hidden">
								<button
									type="button"
									class="-ml-2 bg-white p-2 rounded-md text-gray-400"
									on:click={() => send("openMobileMenu")}
								>
									<!-- onClick={() => setMobileMenuOpen(true)}
							> -->
									<span class="sr-only">Open menu</span>
									<MenuIcon size={6} />
								</button>
							</div>

							<!-- {/* Logo (lg-) */} -->
							<Logo mobile />

							<div class="flex items-center h-full">
								<UserMenu />

								<span
									class="hidden md:block mx-4 h-6 w-px bg-gray-200 lg:mx-6"
									aria-hidden="true"
								/>

								<div class="flow-root">
									<button
										class="group -m-2 p-2 flex items-center"
										on:click={() => send("openShoppingCart")}
									>
										<ShoppingCartIcon
											size={6}
											type={(quantity || 0) > 0 ? "solid" : "outline"}
											styling="flex-shrink-0 text-gray-400 group-hover:text-gray-500"
										/>
										<span class="ml-2 text-sm font-medium text-gray-400 group-hover:text-gray-800">
											{#if $GQL_GetCart.isFetching}
												<LoadingSpinner size={2} />
											{:else}{quantity ?? 0}
											{/if}</span
										>
										<span class="sr-only">items in cart, view bag</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
</StickyHeader>
