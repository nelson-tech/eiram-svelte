<script lang="ts">
	import { browser } from "$app/environment"
	import { styles } from "$lib/styles"

	import type { PageData } from ".svelte-kit/types/src/routes/$types"

	export let data: PageData

	const { bgVideo } = data

	const windowScale = browser ? window.screen.width / (bgVideo?.video?.mediaDetails?.width || 1) : 1

	const viewHeight = (bgVideo?.video?.mediaDetails?.height || 1) * windowScale
</script>

{#if bgVideo}
	<div
		id="video-container"
		class={` w-full h-screen -z-[2] -mb-8`}
		use:styles={{ fallbackImage: `url('${bgVideo.placeholderimage?.sourceUrl}')` }}
	>
		<video autoplay loop muted id="video" class="w-full h-screen object-cover -z-[1] opacity-100"
			><source src={bgVideo?.video?.mediaItemUrl} type={bgVideo?.video?.mimeType} /></video
		>
	</div>
{:else}
	<!-- Placeholder space -->
	<div style={`height:${viewHeight}px`} />
{/if}
