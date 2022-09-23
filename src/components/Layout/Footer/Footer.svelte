<script lang="ts">
	import { page } from "$app/stores"
	import type { LayoutData } from ".svelte-kit/types/src/routes/$types"

	const data = $page.data as LayoutData
	const CDN_URL = import.meta.env.VITE_CDN_BASE_URL
</script>

<div class="mt-8 p-8 text-center bg-gray-100 opacity-70">
	{#if data.siteSettings?.footer?.socialmedia}
		<div class="flex space-x-8 mb-8 justify-center items-center">
			{#each data.siteSettings.footer.socialmedia as social}
				{#if social?.icon?.name}
					<a
						href={social.link}
						title={social.name}
						class="w-8 h-8 fill-white stroke-white"
						target="_blank"
					>
						<img
							src={CDN_URL +
								"/icons/" +
								social.icon.style +
								"/" +
								social.icon.name.toLowerCase() +
								".svg"}
							alt={social.name}
							class="social-icon"
						/>
					</a>
				{/if}
			{/each}
		</div>
	{/if}
	<div class="flex space-x-2 justify-center items-center text-black text-sm">
		<p>&copy; {new Date().getFullYear()} Eiram, LLC</p>
		<p class="pl-2">All Rights Reserved.</p>
	</div>
</div>

<style>
	:global(.social-icon svg) {
		fill: var(--white);
		stroke: var(--white);
	}
</style>
