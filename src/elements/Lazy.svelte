<script lang="ts">
	export let when = false
	export let component: any
	export let props: any = undefined
	let loading: any
	$: if (when) {
		load()
	}
	function load() {
		loading = component()
	}
</script>

{#if when}
	{#await loading then { default: Component }}
		<Component {props} />
	{/await}
{/if}
