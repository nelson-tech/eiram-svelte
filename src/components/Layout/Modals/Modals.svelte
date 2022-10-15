<script lang="ts">
	import { Dialog, DialogOverlay, Transition, TransitionChild } from "@rgossiaux/svelte-headlessui"
	import Modal from "$common/Modal.svelte"
	import modalsService from "$machines/modals"

	import SignInForm from "$components/SignInForm"
	import ShoppingCart from "$components/ShoppingCart"
	import MobileMenu from "$components/MobileMenu"

	const modalsStore = modalsService()

	const { send } = modalsStore

	const closeModal = () => {
		send("close")
	}

	$: status = $modalsStore.value
</script>

<Modal open={$modalsStore.matches("signInOpen")} {closeModal}>
	<SignInForm />
</Modal>

<!-- Shopping Cart-->
<Transition show={$modalsStore.matches("shoppingCartOpen")}>
	<Dialog as="div" class="fixed inset-0 z-40" on:close={closeModal}>
		<TransitionChild
			enter="transition-opacity ease-linear duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity ease-linear duration-300"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<DialogOverlay class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
		</TransitionChild>

		<ShoppingCart {closeModal} />
	</Dialog>
</Transition>

<!-- Mobile Menu -->

<Transition show={$modalsStore.matches("mobileMenuOpen")}>
	<Dialog as="div" class="fixed inset-0 flex z-40 lg:hidden" on:close={closeModal}>
		<TransitionChild
			enter="transition-opacity ease-linear duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity ease-linear duration-300"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
		</TransitionChild>
		<MobileMenu {closeModal} />
	</Dialog>
</Transition>
