<script lang="ts">
	import authService from "$machines/auth"
	import userMenu from "$lib/userMenu"

	import CollectionIcon from "$icons/CollectionIcon.svelte"
	import LogoutIcon from "$icons/LogoutIcon.svelte"
	import { goto } from "$app/navigation"
	import { CachePolicy, GQL_GetCart } from "$houdini"

	const authMachine = authService()
	const handleLogout = async () => {
		await authMachine.send("SIGNOUT")
		await GQL_GetCart.fetch({ policy: CachePolicy.NetworkOnly })
		goto("/")
	}
</script>

{#each userMenu as menuItem}
	<div>
		<div>
			<a
				href={menuItem.path}
				title={menuItem.label}
				class="transition flex items-center hover:bg-accent outline-none ring-transparent hover:text-white text-highlight px-4 py-2 text-sm"
			>
				<CollectionIcon size={4} styling="mr-2" />
				{menuItem.label}
			</a>
		</div>
	</div>
{/each}

<div>
	<button
		class="transition flex cursor-pointer w-full items-center outline-none ring-transparent text-red px-4 py-2 text-sm hover:bg-red hover:text-white"
		on:click={handleLogout}
	>
		<LogoutIcon size={4} styling="mr-1.5" />
		<div class="target">Sign out</div>
	</button>
</div>
