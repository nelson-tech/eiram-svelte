<script lang="ts">
	import { goto } from "$app/navigation"
	import type { PageData } from "./$types"

	export let data: PageData

	const { lookbooks } = data
</script>

<div class="max-w-7xl m-auto p-8 mb-8">
	{#if lookbooks}
		<div class="text-center">
			<h2 class="text-4xl font-bold uppercase text-gray-500 font-sans tracking-wide">Lookbook</h2>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mx-2 md:mx-8 lg:mx-16 mt-12">
			{#each lookbooks as lookbook}
				<div
					class="relative mx-auto cursor-pointer group w-full rounded-sm "
					style="height:600px;"
					title={lookbook?.title}
					on:click={() => goto(`/lookbook/${lookbook?.slug}`)}
				>
					<img
						src={lookbook?.gallery?.media?.coverimage?.sourceUrl}
						alt={lookbook?.gallery?.media?.coverimage?.altText}
						class="absolute object-cover w-full h-full -z-10 rounded-sm"
					/>
					<div
						class="absolute flex items-center w-full h-full bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition rounded-sm overflow-hidden -z-10"
					>
						<div
							class="border border-white my-auto w-full mx-8 flex justify-center items-center"
							style="height:550px"
						>
							<h2 class="text-white text-4xl text-center uppercase font-sans">
								{lookbook?.title}
							</h2>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
