<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"

	import LoadingSpinner from "$common/LoadingSpinner.svelte"
	import { CachePolicy, GQL_GetCart, GQL_RegisterUser } from "$houdini"
	import LockClosedIcon from "$icons/LockClosedIcon.svelte"
	import authService from "$machines/auth"
	import { reporter, ValidationMessage } from "@felte/reporter-svelte"
	import { validator } from "@felte/validator-zod"
	import { createForm, type FelteSubmitEvent } from "felte"
	import { onMount } from "svelte"
	import { boolean, object, string } from "zod"

	let loading = false

	let error: string | null | undefined

	const authStore = authService("Register Form")

	const messages = {
		email: { error: "Valid email is required." },
		password: {
			error: "Password must be 8-32 characters.",
		},
		firstName: {
			error: "First name is required. Must be 2-32 characters.",
		},
		lastName: {
			error: "Last name is required. Must be 2-32 characters.",
		},
	}

	const schema = object({
		email: string().min(1, messages.email.error).email(messages.email.error),
		password: string().min(8, messages.password.error).max(32, messages.password.error),
		firstName: string({ required_error: messages.firstName.error })
			.min(2, messages.firstName.error)
			.max(32, messages.firstName.error),
		lastName: string({ required_error: messages.lastName.error })
			.min(2, messages.lastName.error)
			.max(32, messages.lastName.error),
	})

	const handleSubmit: FelteSubmitEvent["onSubmit"] = async (input) => {
		loading = true
		console.log("Submission event", input)

		const data = await GQL_RegisterUser.mutate({
			input: { ...input, username: input.email },
		}).catch((e) => {
			error = "Error registering new user. Please try again or contact us for assistance."
			loading = false
			throw new Error(e)
		})

		if (data?.registerUser?.user?.id) {
			console.log("User registered. Logging in.")

			await authStore.send("SIGNIN", {
				input: { username: input.email, password: input.password, rememberMe: true },
			})
		}

		loading = false
	}

	const handleError: FelteSubmitEvent["onError"] = () => {
		console.warn("Sign in error")
	}

	const handleSuccess: FelteSubmitEvent["onSuccess"] = async () => {
		// TODO - Set Alert

		await GQL_GetCart.fetch({ policy: CachePolicy.NetworkOnly })
		goto("/" + $page.params.redirect ?? "")
	}

	const { form, errors } = createForm({
		onSubmit: handleSubmit,
		onError: handleError,
		onSuccess: handleSuccess,
		extend: [validator({ schema }), reporter], // OR `extend: [validator],`
		// ...
	})

	$: $authStore.matches("signedIn") && goto("/" + $page.params.redirect ?? "")
</script>

<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-700">Sign Up Today</h2>
		</div>
		<form class="mt-8 space-y-6" use:form>
			<div class="rounded-md -space-y-px">
				<div>
					<label for="given-name" class="sr-only"> First Name </label>
					<input
						id="first-name"
						name="firstName"
						type="text"
						autoComplete="given-name"
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
						placeholder="First Name"
					/>
				</div>

				<div>
					<label for="family-name" class="sr-only"> Last Name </label>
					<input
						id="family-name"
						name="lastName"
						type="text"
						autoComplete="family-name"
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
						placeholder="Last Name"
					/>
				</div>
				<div>
					<label for="email-address" class="sr-only"> Email address </label>
					<input
						id="email-address"
						type="email"
						autoComplete="email"
						name="email"
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
						placeholder="Email address"
					/>
				</div>
				<div>
					<label for="password" class="sr-only"> Password </label>
					<input
						id="password"
						type="password"
						autoComplete="current-password"
						name="password"
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
						placeholder="Password"
					/>
				</div>
				{#each Object.entries($errors) as [field, messages]}
					{#if messages && messages.length > 0}
						<p class="text-red text-sm pt-2 pl-2">{messages[0]}</p>
					{/if}
				{/each}
			</div>

			<div>
				<button
					type="submit"
					disabled={loading}
					class="group relative w-full flex transition justify-center py-2 px-4 border border-transparent text-sm font-medium hover:font-bold rounded-md text-white bg-accent hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
				>
					<span class="absolute left-0 inset-y-0 flex items-center pl-3 ">
						{#if loading}
							<LoadingSpinner size={5} color="white" />
						{:else}
							<LockClosedIcon size={5} styling="text-gray-200 group-hover:text-white" />
						{/if}
					</span>
					Register
				</button>
			</div>

			<div class="flex items-center relative">
				{#if error}
					<div class="text-sm text-red">{error}&nbsp;</div>
				{/if}
				<div class="text-sm absolute right-0">
					<span class="text-gray-400">Already have an account?</span>
					<a
						title="Login"
						href={"/login/" + $page.params.redirect ?? ""}
						class="text-accent hover:text-highlight transition"
					>
						Click here to login.
					</a>
				</div>
			</div>
		</form>
	</div>
</div>
