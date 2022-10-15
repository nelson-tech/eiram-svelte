<script lang="ts">
	import { MenuItem } from "@rgossiaux/svelte-headlessui"

	import modalsService from "$machines/modals"

	import LoginIcon from "$icons/LoginIcon.svelte"
	import ClipboardCheckIcon from "$icons/ClipboardCheckIcon.svelte"

	const modalsStore = modalsService()
	const { send } = modalsStore
</script>

<div>
	<div>
		<button
			on:click={() => {
				send("openSignIn")
			}}
			class="transition w-full cursor-pointer flex items-center outline-none ring-transparent text-highlight px-4 py-2 text-sm hover:bg-highlight hover:text-white"
		>
			<LoginIcon size={4} styling="mr-1.5" />
			<div class="target">Sign in</div>
		</button>
	</div>
	<div>
		<div class="group">
			<a
				href="/register"
				class="transition flex items-center text-accent-dark outline-none ring-transparent px-3.5 py-2 text-sm hover:bg-accent hover:text-white"
			>
				<ClipboardCheckIcon size={4} styling="mr-2" />

				<div class="target">Register</div>
			</a>
		</div>
	</div>
</div>
