<script lang="ts">
	import { ValidationMessage } from "@felte/reporter-svelte"

	export let errors: any
	export let registerOptions: any = undefined
	export let name: string
	export let label: string
	export let type: string
	export let autoComplete: string | null | undefined = undefined
	export let containerStyle: string | null | undefined = undefined
	export let labelStyle: string | null | undefined = undefined
	export let inputStyle: string | null | undefined = undefined
	export let errorStyle: string | null | undefined = undefined
	export let labelAfter: boolean | null | undefined = undefined
	export let textArea: boolean | null | undefined = undefined
	export let textAreaRows: number | null | undefined = undefined
	export let textAreaStyle: string | null | undefined = undefined

	const containerStyling = containerStyle ?? "col-span-full"
	const labelStyling = labelStyle ?? "block text-sm font-medium text-gray-700"
	const inputStyling =
		inputStyle ??
		"mt-1 block w-full border-gray-300 border-b p-2 rounded-md shadow-sm outline-none focus:ring-blue-main focus:border-blue-main sm:text-sm"
	const errorStyling = errorStyle ?? "block text-red-main text-sm pt-2 pl-1"
	const textAreaStyling = textAreaStyle ?? inputStyling
</script>

<div class={containerStyling}>
	{#if !labelAfter}
		<label for={name} class={labelStyling}>
			{label}
		</label>
	{/if}
	{#if textArea}
		<textarea rows={textAreaRows ?? 5} id={name} class={inputStyling} />
	{:else}
		<input {type} id={name} autocomplete={autoComplete} {name} class={inputStyling} />
	{/if}
	{#if labelAfter}
		<label for={name} class={labelStyling}>
			{label}
		</label>
	{/if}

	<ValidationMessage for={name} let:messages={message}>
		{#if message}
			<p class="text-red text-sm pt-2 pl-2">
				{#if typeof message === "string"}
					{message}
				{:else}
					{message[0]}
				{/if}
			</p>
		{/if}
	</ValidationMessage>

	<!-- <ErrorMessage
    errors={errors}
    name={name}
    render={({ message }) => <p class={errorStyling}>{message}</p>}
  /> -->
</div>
