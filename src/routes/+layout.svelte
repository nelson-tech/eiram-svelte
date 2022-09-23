<script lang="ts">
	import "../app.css"
	import { afterNavigate, beforeNavigate } from "$app/navigation"
	import { fade } from "svelte/transition"
	import { GQL_GetCurrentUser } from "$houdini"
	import authService from "$machines/auth"
	import type { LayoutData } from "./$types"

	import Layout from "$components/Layout"
	import LoadingSpinner from "$common/LoadingSpinner.svelte"
	import { styles } from "$lib/styles"
	import { onMount } from "svelte"
	import hexHueGenerator from "$lib/hexHueGenerator"

	// declare a reactive property that will change to `true` when navigation is running
	$: loading = false

	beforeNavigate(() => {
		loading = true
	})

	afterNavigate(() => {
		loading = false
	})

	export let data: LayoutData

	const { path } = data

	const colors = data.siteSettings?.colors

	// Init authStore to check auth state before anywhere else
	const authStore = authService("Layout")

	GQL_GetCurrentUser.fetch({ metadata: { auth: true } })

	$: user = $GQL_GetCurrentUser.data?.viewer

	// Set colors from backend
	onMount(() => {
		if (colors) {
			for (let [prop, color] of Object.entries(colors)) {
				if (["highlight", "accent"].includes(prop)) {
					color = colors[color as keyof typeof colors]
				}
				if (prop && color) {
					const varString = `--${prop}`
					document.documentElement.style.setProperty(varString, color)

					// Set light variations
					const varStringLight = `--${prop}-light`
					const colorLight = hexHueGenerator(color, 20)
					document.documentElement.style.setProperty(varStringLight, colorLight)

					// Set dark variations
					const varStringDark = `--${prop}-dark`
					const colorDark = hexHueGenerator(color, -20)

					document.documentElement.style.setProperty(varStringDark, colorDark)
				}
			}
		}
	})
</script>

<div in:fade out:fade class="relative font-sans">
	{#if loading}
		<div
			id="loading-overlay"
			class="absolute top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center "
		>
			<LoadingSpinner size={16} color="var(--accent)" opacity={100} />
		</div>
	{/if}
	<Layout>
		<slot />
	</Layout>
</div>

<style>
	#loading-overlay {
		background: #ffffff80;
	}
</style>
