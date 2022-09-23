<script lang="ts">
	import { browser } from "$app/environment"

	import type { PageData } from "./$types"

	export let data: PageData

	const { lookbook } = data

	$: el = browser ? document?.createElement("div") : undefined
</script>

<div class="p-8 mx-auto max-w-7xl text-center text-gray-600">
	<h2 class="text-4xl font-bold font-sans tracking-wide pb-8">{lookbook?.title}</h2>

	<div class="px-8 mx-8">{@html lookbook?.content}</div>

	{#if lookbook?.gallery?.media?.images}
		<div class="columns-3xs gap-4 mt-8 max-w-5xl mx-auto">
			{#each lookbook.gallery.media.images as image, i (image?.id)}
				<div
					class={`w-full ${
						i % 2 == 0 ? "aspect-square" : "aspect-video"
					} overflow-hidden mb-4 rounded-sm`}
				>
					<img src={image?.sourceUrl} alt={image?.altText} class=" object-cover rounded-sm" />
				</div>
			{/each}
			{#if lookbook.gallery.media.images.length % 3 == 0}
				<div
					class={`w-full ${
						true ? "aspect-square" : "aspect-video"
					} overflow-hidden mb-4 rounded-sm`}
				>
					<img
						src={lookbook.gallery.media.images[0]?.sourceUrl}
						alt={lookbook.gallery.media.images[0]?.altText}
						class=" object-cover rounded-sm opacity-0"
					/>
				</div>
			{/if}
		</div>
	{/if}
	{#if lookbook?.gallery?.media?.video?.mediaItemUrl}
		<div class="w-full rounded-md">
			<video muted controls id="video" class="w-full rounded-md aspect-video"
				><source
					src={lookbook.gallery.media.video.mediaItemUrl}
					type={lookbook.gallery.media.video.mimeType}
				/></video
			>
		</div>
	{/if}
</div>

<style>
	:global(div p) {
		margin-top: 2rem;
	}
</style>
