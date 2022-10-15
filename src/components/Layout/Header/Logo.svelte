<script lang="ts">
	export let mobile = false
</script>

{#if mobile}
	<div class="flex items-center w-full justify-center md:hidden">
		<a href="/" class="lg:hidden">
			<span class="sr-only">Workflow</span>
			<img
				src="https://cdn.eiramknitwear.com/eiram/20220901154005/logo-black.png"
				alt=""
				class="h-8 w-auto"
			/>
		</a>
	</div>
{:else}
	<div class="hidden lg:flex items-center w-36">
		<a href="/">
			<span class="sr-only">Workflow</span>
			<img
				class="h-8 w-auto"
				src="https://cdn.eiramknitwear.com/eiram/20220901154005/logo-black.png"
				alt=""
			/>
		</a>
	</div>
{/if}
