<script lang="ts">
	import type { PageData } from "./$types"

	export let data: PageData
</script>

<div class="px-16 py-8 max-w-7xl mx-auto text-gray-500">
	<h2 class="text-4xl font-bold font-sans tracking-wide pb-8 text-center">
		{data.pageData?.title ?? "Oops..."}
	</h2>
	{#if data.pageData?.content}
		<div class="wp-container">
			{@html data.pageData?.content}
		</div>
	{:else}
		<div class="text-center">
			<p>The page requested could not be found.</p>
			<p>
				Click <a href="/" class="underline text-accent hover:text-highlight">here</a> to go to the
				homepage, or
				<a href="/shop" class="underline text-accent hover:text-highlight">visit our shop</a>.
			</p>
		</div>
	{/if}
</div>
