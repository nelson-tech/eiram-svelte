<script lang="ts">
	import { Dialog, DialogOverlay, Transition, TransitionChild } from "@rgossiaux/svelte-headlessui"

	export let closeModal: () => void
	export let open: boolean

	let modalRef: HTMLElement
</script>

<Transition appear show={open}>
	<Dialog
		class="fixed inset-0 z-40 overflow-y-auto"
		{open}
		on:close={closeModal}
		initialFocus={modalRef}
		><TransitionChild
			enter="duration-150 ease-out"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="duration-200 ease-in"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<DialogOverlay class="fixed inset-0 bg-black bg-opacity-50" /></TransitionChild
		>
		<TransitionChild
			enter="duration-150 ease-out"
			enterFrom="opacity-0 scale-95"
			enterTo="opacity-100 scale-100"
			leave="duration-200 ease-in"
			leaveFrom="opacity-100 scale-100"
			leaveTo="opacity-0 scale-95"
		>
			<div class="min-h-screen px-4 text-center">
				<span class="inline-block lg:h-screen align-middle" aria-hidden="true"> &#8203; </span>
				<div
					class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
				>
					<slot {modalRef} />
				</div>
			</div></TransitionChild
		>
	</Dialog>
</Transition>
