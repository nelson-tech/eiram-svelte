<script lang="ts">
	import { createForm, getValue } from "felte"
	import type { FelteSubmitEvent } from "felte"
	import { reporter, ValidationMessage } from "@felte/reporter-svelte"
	import { validator } from "@felte/validator-zod"
	import { object, string, boolean } from "zod"
	import type { infer as zinfer } from "zod"

	import FormField from "$common/FormField.svelte"

	import LoadingSpinner from "$common/LoadingSpinner.svelte"
	import DocumentDuplicateIcon from "$icons/DocumentDuplicateIcon.svelte"

	import {
		GQL_ClearCart,
		type CheckoutInput,
		type CountriesEnum,
		type GetCustomerData$result,
		type Maybe,
	} from "$houdini"
	import { GQL_Checkout } from "$houdini"
	import schema from "./formSchema"
	import { styles } from "$lib/styles"
	import { goto } from "$app/navigation"

	type ContactInformationType = {
		address1: Maybe<string>
		address2: Maybe<string>
		city: Maybe<string>
		company: Maybe<string>
		country: Maybe<CountriesEnum>
		postcode: Maybe<string>
		phone: Maybe<string>
		email: Maybe<string>
		state: Maybe<string>
		firstName: Maybe<string>
		lastName: Maybe<string>
	}

	type FormDataType = {
		billing: ContactInformationType
		shipping: ContactInformationType
		shipToDifferentAddress: boolean
	}

	export let customer: GetCustomerData$result["customer"]
	let loading = false
	let error: string | null | undefined

	const handleSubmit: FelteSubmitEvent["onSubmit"] = async (values: FormDataType, context) => {
		loading = true

		// Exclude shipping unless billing and shipping should be different
		const { shipping, shipToDifferentAddress, ...baseData } = values

		const input: CheckoutInput = shipToDifferentAddress
			? {
					...baseData,
					shipToDifferentAddress,
					shipping: { ...shipping, overwrite: true },
			  }
			: { ...baseData, shipToDifferentAddress }

		// Set paymentMethod to cash-on-delivery as no payments will be collected
		input.paymentMethod = "cod"
		input.isPaid = false

		const data = await GQL_Checkout.mutate({ input }).catch((e) => {
			loading = false
			error = e[0].message
			console.warn(e)
			throw new Error(e)
		})

		console.log("Checkout data", data)

		// error &&
		//   setAlert({
		//     open: true,
		//     type: "error",
		//     primary: "Error Checking Out",
		//     secondary: error.message.split("] ")[1],
		//   })

		error && console.warn(error)

		loading = false

		return data?.checkout?.order?.orderNumber
	}

	const handleError: FelteSubmitEvent["onError"] = (e) => {
		console.warn("Error during checkout", e)
	}

	const handleSuccess: FelteSubmitEvent["onSuccess"] = async (res) => {
		console.log("Successfully checked out.", res)

		await GQL_ClearCart.mutate({ input: {} })
			.then((r) => {
				console.log("Success clearing the cart.", r)
			})
			.catch((e) => {
				console.warn("Error clearing the cart.", e)
			})
		// TODO: Go to order confirmation page

		goto("/thanks/" + res)
	}

	const initialValues = {
		billing: {
			address1: customer?.billing?.address1,
			address2: customer?.billing?.address2,
			city: customer?.billing?.city,
			company: customer?.billing?.company,
			country: customer?.billing?.country,
			postcode: customer?.billing?.postcode,
			phone: customer?.billing?.phone,
			email: customer?.billing?.email,
			state: customer?.billing?.state,
			firstName: customer?.billing?.firstName,
			lastName: customer?.billing?.lastName,
		},
		shipToDifferentAddress: false,
		shipping: {
			address1: customer?.shipping?.address1,
			address2: customer?.shipping?.address2,
			city: customer?.shipping?.city,
			company: customer?.shipping?.company,
			country: customer?.shipping?.country,
			postcode: customer?.shipping?.postcode,
			phone: customer?.shipping?.phone,
			email: customer?.shipping?.email,
			state: customer?.shipping?.state,
			firstName: customer?.shipping?.firstName,
			lastName: customer?.shipping?.lastName,
		},
	}

	const { form, data, errors, setFields } = createForm({
		onSubmit: handleSubmit,
		onError: handleError,
		onSuccess: handleSuccess,
		extend: [validator({ schema }), reporter], // OR `extend: [validator],`
		initialValues,
		// ...
	})

	let register: any

	$: shippingDifferent = $data["shipToDifferentAddress"]

	const handleCopyBilling = () => {
		setFields(($data) => ({ ...$data, shipping: $data["billing"] }))
	}
</script>

<section
	aria-labelledby="payment-heading"
	class="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-16"
>
	<h2 id="payment-heading" class="sr-only">Payment and shipping details</h2>

	<div class="max-w-2xl mx-auto lg:pt-16">
		<form class="mt-6" use:form>
			<div class="grid grid-cols-12 gap-y-6 gap-x-4">
				<h2 class="col-span-full text-xl font-semibold">Billing Details</h2>
				<div class="col-span-full grid gap-y-6 md:grid-cols-2 gap-6">
					<FormField
						{errors}
						name="billing.email"
						label="Email Address"
						type="email"
						autoComplete="email"
						containerStyle="w-auto"
					/>
					<FormField
						{errors}
						name="billing.phone"
						label="Phone Number"
						type="text"
						autoComplete="tel"
						containerStyle="w-auto"
					/>
				</div>

				<div class="col-span-full grid gap-y-6 md:grid-cols-2 gap-6">
					<FormField
						{errors}
						name="billing.firstName"
						label="First Name"
						type="text"
						autoComplete="cc-given-name"
						containerStyle="w-auto"
					/>
					<FormField
						{errors}
						name="billing.lastName"
						label="Last Name"
						type="text"
						autoComplete="cc-family-name"
						containerStyle="w-auto"
					/>
				</div>

				<FormField
					{errors}
					name="billing.company"
					label="Company"
					type="text"
					autoComplete="organization"
				/>

				<FormField
					{errors}
					name="billing.address1"
					label="Address"
					type="text"
					autoComplete="address-line1"
				/>

				<FormField
					{errors}
					name="billing.address2"
					label="Address (Continued)"
					type="text"
					autoComplete="address-line2"
				/>

				<FormField
					{errors}
					name="billing.city"
					label="City"
					type="text"
					autoComplete="address-level2"
					containerStyle="col-span-7 md:col-span-5"
				/>

				<FormField
					{errors}
					name="billing.state"
					label="State / Province"
					type="text"
					autoComplete="address-level1"
					containerStyle="col-span-5 md:col-span-3"
				/>

				<FormField
					{errors}
					name="billing.postcode"
					label="Postal Code"
					type="text"
					autoComplete="postal-code"
					containerStyle="col-span-full md:col-span-4"
				/>
			</div>

			<div class="mt-6 flex space-x-2">
				<FormField
					{errors}
					name="shipToDifferentAddress"
					label="Ship to a different address than billing address"
					labelAfter
					type="checkbox"
					containerStyle="flex items-center h-5"
					labelStyle="text-sm font-medium text-gray-900"
					inputStyle="mr-2 h-4 w-4 border-gray-300 border-b p-2 rounded text-blue-main outline-none focus:ring-blue-main"
				/>
			</div>
			<FormField
				{errors}
				name="customerNote"
				label="Note"
				type="text-area"
				autoComplete="postal-code"
				containerStyle="col-span-full md:col-span-4 mt-4"
				textArea
			/>

			{#if shippingDifferent}
				<div class="grid grid-cols-12 mt-6 mb-4 border-t border-gray-300 pt-4 gap-y-6 gap-x-4">
					<div class="col-span-full flex items-center">
						<h2 class="text-xl font-semibold">Shipping Details</h2>
						<div
							class="ml-4 flex text-gray-400 cursor-pointer text-sm items-center"
							on:click={handleCopyBilling}
						>
							<DocumentDuplicateIcon size={4} type="solid" styling="text-green-main mr-4 mb-2 " />
							Copy from billing
						</div>
					</div>
					<div class="col-span-full grid gap-y-6 md:grid-cols-2 gap-6">
						<FormField
							{errors}
							name="shipping.email"
							label="Email Address"
							type="email"
							autoComplete="email"
							containerStyle="w-auto"
						/>
						<FormField
							{errors}
							name="shipping.phone"
							label="Phone Number"
							type="text"
							autoComplete="tel"
							containerStyle="w-auto"
						/>
					</div>

					<div class="col-span-full grid gap-y-6 md:grid-cols-2 gap-6">
						<FormField
							registerOptions={{ required: "First name is required." }}
							{errors}
							name="shipping.firstName"
							label="First Name"
							type="text"
							autoComplete="given-name"
							containerStyle="w-auto"
						/>
						<FormField
							{errors}
							name="shipping.lastName"
							label="Last Name"
							type="text"
							autoComplete="family-name"
							containerStyle="w-auto"
						/>
					</div>

					<FormField
						{errors}
						name="shipping.company"
						label="Company"
						type="text"
						autoComplete="organization"
					/>

					<FormField
						{errors}
						name="shipping.address1"
						label="Address"
						type="text"
						autoComplete="street-address"
					/>

					<FormField
						{errors}
						name="shipping.address2"
						label="Address (Continued)"
						type="text"
						autoComplete="street-address"
					/>

					<FormField
						{errors}
						name="shipping.city"
						label="City"
						type="text"
						autoComplete="address-level2"
						containerStyle="col-span-7 md:col-span-5"
					/>

					<FormField
						{errors}
						name="shipping.state"
						label="State / Province"
						type="text"
						autoComplete="address-level1"
						containerStyle="col-span-5 md:col-span-3"
					/>

					<FormField
						{errors}
						name="shipping.postcode"
						label="Postal Code"
						type="text"
						autoComplete="postal-code"
						containerStyle="col-span-full md:col-span-4"
					/>
				</div>
			{/if}
			<button
				type="submit"
				class="w-full mt-6 bg-accent border border-transparent rounded-md shadow-sm py-2 px-4 text-lg font-medium text-white hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 outline-none focus:ring-accent"
			>
				{#if loading}
					<LoadingSpinner size={7} color="white" style="mx-auto" />
				{:else}
					Place Order
				{/if}
			</button>
		</form>
	</div>
</section>
