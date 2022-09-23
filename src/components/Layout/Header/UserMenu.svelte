<script lang="ts">
	import {
		Menu,
		MenuButton,
		MenuItems,
		Popover,
		PopoverButton,
		PopoverPanel,
		Transition,
	} from "@rgossiaux/svelte-headlessui"

	import UserIcon from "$icons/UserIcon.svelte"
	import AuthMenu from "./AuthMenu.svelte"
	import GuestMenu from "./GuestMenu.svelte"
	import authService from "$machines/auth"

	const authStore = authService()
</script>

<div class="hidden md:flex relative font-sans h-full">
	<Popover>
		<PopoverButton
			class={($authStore.matches("signedIn") ? "text-accent" : "text-gray-400") +
				" p-2 hover:text-gray-500" +
				" font-bold text-sm h-full outline-none"}
		>
			<div title="User Menu" class="mt-0.5">
				<span class="sr-only">Open user menu</span>
				<UserIcon type={$authStore.matches("signedIn") ? "solid" : "outline"} />
			</div>
		</PopoverButton>
		<!-- <Transition
			leave="transition ease-in duration-75"
			leaveFrom="transform opacity-100 scale-100"
			leaveTo="transform opacity-0 scale-95"
			class="origin-top-right z-20 absolute -right-16 pt-2 w-40"
		> -->

		<Transition
			enter="transition ease-out duration-200"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition ease-in duration-150"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
			class="origin-top-right absolute -right-16 pt-2 w-40 z-40"
		>
			<PopoverPanel
				class="relative rounded-sm bg-gray-50 outline-none overflow-hidden shadow-lg ring-transparent z-40"
			>
				{#if $authStore.matches("signedIn")}
					<AuthMenu />
				{:else}
					<GuestMenu />
				{/if}
			</PopoverPanel>
		</Transition>
	</Popover>
</div>
