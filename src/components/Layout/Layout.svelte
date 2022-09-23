<script lang="ts">
	import type { LayoutData } from ".svelte-kit/types/src/routes/$types"

	import Header from "./Header"
	import Footer from "./Footer"
	import Modals from "./Modals"
	import PageTransition from "$components/PageTransition"
	import { page } from "$app/stores"
</script>

<Header />
{#key $page.url.pathname}
	<PageTransition path={$page.url.pathname}>
		<div class="min-h-screen z-0">
			<slot />
		</div></PageTransition
	>
{/key}
<Footer />

<Modals />
