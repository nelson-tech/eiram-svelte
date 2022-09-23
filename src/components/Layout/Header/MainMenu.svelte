<script lang="ts">
	import { page } from "$app/stores"
	import ChevronDownIcon from "$icons/ChevronDownIcon.svelte"
	import type { PageData } from ".svelte-kit/types/src/routes/$types"
	import { MenuButton, PopoverGroup } from "@rgossiaux/svelte-headlessui"
	import Dropdown from "./Dropdown.svelte"

	const data = $page.data as PageData
	const { menuItems, path } = data

	type DesktopLinkStyleProps = {
		open: boolean
		target: string
	}

	type GetDesktopLinkStyleType = ({ open, target }: DesktopLinkStyleProps) => string

	const getDesktopLinkStyle: GetDesktopLinkStyleType = ({ open, target }): string => {
		const current = path.slice(0, target.length) === target && target !== "/"
		return `transition ease-out duration-200 outline-none px-3 ${
			open ? "border-accent text-accent" : "text-gray-600 hover:text-accent-dark"
		} flex items-center text-sm font-medium transition-all h-full tracking-[.15em]`
	}
</script>

<div class="hidden h-full lg:flex lg:justify-center w-full">
	<PopoverGroup>
		<div class="h-full flex justify-center items-center space-x-2">
			{#if menuItems}
				{#each menuItems as menuItem, i}
					{#if menuItem && !menuItem?.parentId}
						{@const target = menuItem?.path || "/"}
						{#if menuItem?.childItems?.nodes?.length || 0 > 0}
							<Dropdown {menuItem} let:open>
								<MenuButton
									class={getDesktopLinkStyle({
										open,
										target,
									})}
								>
									{menuItem.label?.toUpperCase()}
									<ChevronDownIcon
										size={4}
										styling={`transition ml-1 text-gray-400 ${open ? "transform rotate-180" : ""}`}
									/>
								</MenuButton>
							</Dropdown>
						{:else}
							<div class="relative flex h-full font-sans transition hover-underline-animation">
								<a
									href={target}
									title={menuItem?.label}
									class={getDesktopLinkStyle({
										open: false,
										target,
									})}
								>
									{menuItem?.label?.toUpperCase()}
								</a>
							</div>
						{/if}
					{/if}
				{/each}
			{/if}
		</div></PopoverGroup
	>
</div>
