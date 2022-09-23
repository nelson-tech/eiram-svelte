<script lang="ts">
	import CartItem from "$components/ShoppingCart/CartItem.svelte"
	import type { GetCart$result } from "$houdini"

	export let lineItems: Exclude<Exclude<GetCart$result["cart"], null>["contents"], null>["nodes"]
</script>

{#if lineItems}
	{#each lineItems as lineItem}
		{#if lineItem}
			<CartItem {lineItem} />
		{/if}
	{/each}
{/if}
