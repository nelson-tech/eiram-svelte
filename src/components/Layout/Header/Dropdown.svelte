<script lang="ts">
	import { Menu, MenuItem, MenuItems, Transition } from "@rgossiaux/svelte-headlessui"

	export let menuItem: any

	const target = menuItem.path || "/"
</script>

<Menu let:open class="relative flex h-full font-sans transition hover-underline-animation">
	<slot {open} />

	<Transition
		enter="transition ease-out duration-200"
		enterFrom="opacity-0"
		enterTo="opacity-100"
		leave="transition ease-in duration-150"
		leaveFrom="opacity-100"
		leaveTo="opacity-0"
		class="origin-top absolute -left-1/2 pt-2 w-64"
	>
		<MenuItems
			class="rounded-sm bg-gray-50 outline-none overflow-hidden shadow-lg ring-transparent z-40"
		>
			{#if menuItem.childItems?.nodes}
				{#each menuItem.childItems.nodes as item, i ((menuItem?.title || "") + i + item.label)}
					<MenuItem>
						<a
							href={item.path}
							title={item.label}
							class="transition hover:bg-accent hover:text-white text-highlight block px-4 py-2 text-sm ring-transparent outline-none"
						>
							{item.label}
						</a>
					</MenuItem>
				{/each}
			{/if}
		</MenuItems>
	</Transition>
</Menu>
