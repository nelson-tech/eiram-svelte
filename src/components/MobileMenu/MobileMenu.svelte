<script lang="ts">
	import { page } from "$app/stores"
	import { TransitionChild } from "@rgossiaux/svelte-headlessui"

	import authService from "$machines/auth"
	import userMenu from "$lib/userMenu"
	import type { LayoutData } from ".svelte-kit/types/src/routes/$types"
	import LoginIcon from "$icons/LoginIcon.svelte"
	import ClipboardCheckIcon from "$icons/ClipboardCheckIcon.svelte"
	import LogoutIcon from "$icons/LogoutIcon.svelte"
	import modalsService from "$machines/modals"
	import XIcon from "$icons/XIcon.svelte"
	import { CachePolicy, GQL_GetCart } from "$houdini"

	const data = $page.data as LayoutData

	const authStore = authService("Mobile Menu")

	export let closeModal: (() => void) | undefined = undefined

	data.menuItems?.map((c) => c)

	const bigLinkStyle = "font-extrabold uppercase tracking-wider text-gray-800 pl-4"

	const handleLogout = async () => {
		await authStore.send("SIGNOUT")
		await GQL_GetCart.fetch({ policy: CachePolicy.NetworkOnly })
		closeModal && closeModal()
	}
</script>

<TransitionChild
	class="md:max-w-full flex"
	enter="transition ease-in-out duration-300 transform"
	enterFrom="-translate-x-full"
	enterTo="translate-x-0"
	leave="transition ease-in-out duration-300 transform"
	leaveFrom="translate-x-0"
	leaveTo="-translate-x-full"
>
	<div class="w-screen max-w-md relative">
		<div
			class="relative w-full bg-white h-screen shadow-xl pb-12 flex flex-col overflow-y-auto max-w-sm"
			style="maxWidth: 350px;"
		>
			<div class="px-4 pt-5 pb-2 flex">
				<button
					type="button"
					class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400 outline-none ring-transparent"
					on:click={() => closeModal && closeModal()}
				>
					<span class="sr-only">Close menu</span>
					<XIcon size={6} />
				</button>
			</div>

			<!-- Links -->
			<div class="border-t border-gray-200 py-6">
				{#if data.menuItems}
					{#each data.menuItems as menuItem, index}
						{#if menuItem && !menuItem?.parentId}
							{#if menuItem.childItems?.nodes && menuItem.childItems.nodes.length > 0}
								<div class="flow-root">
									<div class={bigLinkStyle} title={menuItem.label}>
										{menuItem.label}
									</div>
									<div class="pt-2">
										{#each menuItem.childItems.nodes as child}
											{#if child}
												<div
													class="font-bold text-sm text-gray-600 transition px-8 hover:bg-accent hover:text-white"
													on:click={() => closeModal && closeModal()}
													on:keyup={() => closeModal && closeModal()}
												>
													<a href={child.path} title={child.label} class="">
														<div class="w-full py-3">{child.label}</div>
													</a>
												</div>
											{/if}
										{/each}
									</div>
								</div>
							{:else}
								<div class="flow-root">
									<div
										class={bigLinkStyle + " hover:bg-accent hover:text-white"}
										on:click={() => closeModal && closeModal()}
										on:keyup={() => closeModal && closeModal()}
									>
										<a href={menuItem.path} title={menuItem.label} class="h-full py-3">
											<div class="w-full py-3">{menuItem.label}</div>
										</a>
									</div>
								</div>
							{/if}
						{/if}
					{/each}
				{/if}
			</div>

			<div class="border-t border-gray-200 py-6 text-sm font-bold text-gray-600">
				{#if $authStore.matches("signedIn")}
					{#each userMenu as item}
						<div
							class="outline-none"
							on:click={() => closeModal && closeModal()}
							on:keyup={() => closeModal && closeModal()}
						>
							<a
								href={item.path}
								title={item.label}
								class="transition flex items-center px-3.5 py-2 hover:bg-accent hover:text-white"
							>
								<svelte:component this={item.icon} size={6} styling="mr-4" />
								<div>{item.label}</div>
							</a>
						</div>
					{/each}
					<div
						on:click={handleLogout}
						on:keyup={handleLogout}
						title="Sign out"
						class="transition outline-none"
					>
						<div
							class="flex items-center w-full px-4 py-2 transition text-red hover:bg-red hover:text-white cursor-pointer"
						>
							<LogoutIcon size={6} styling="mr-3.5" />
							Sign out
						</div>
					</div>
				{:else}
					<div
						class="group"
						on:click={() => closeModal && closeModal()}
						on:keyup={() => closeModal && closeModal()}
					>
						<a
							href="/register"
							title="Register"
							class="transition flex items-center outline-none px-3.5 py-2 hover:bg-blue-main hover:text-white"
						>
							<ClipboardCheckIcon size={6} styling="mr-4" />
							<div>Register</div>
						</a>
					</div>
					<div
						on:click={() => closeModal && closeModal()}
						on:keyup={() => closeModal && closeModal()}
						class="group"
					>
						<a
							href="/login"
							title="Sign in"
							class="transition flex items-center outline-none text-green-main px-4 py-2 hover:bg-green-main hover:text-white"
						>
							<LoginIcon size={6} styling="mr-3.5" />
							<div>Sign in</div>
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</TransitionChild>
