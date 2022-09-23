<script lang="ts">
	export let styles: string = ""
</script>

<form class={styles}>
	<label for="discount-code" class="block text-sm font-medium text-gray-700"> Discount code </label>
	<div class="flex space-x-4 mt-1">
		<input
			type="text"
			id="discount-code"
			name="discount-code"
			class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-main focus:border-blue-main sm:text-sm"
		/>
		<button
			type="submit"
			class="bg-gray-200 text-sm p-2 font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-main"
		>
			Apply
		</button>
	</div>
</form>
