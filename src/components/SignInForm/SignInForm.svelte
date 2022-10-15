<script lang="ts">
	import { createForm } from "felte"
	import type { FelteSubmitEvent } from "felte"
	import { validator } from "@felte/validator-zod"
	import { reporter, ValidationMessage } from "@felte/reporter-svelte"
	import { object, string, boolean } from "zod"
	import type { infer as zinfer } from "zod"
	import { page } from "$app/stores"
	import authService from "$machines/auth"
	import LoadingSpinner from "$common/LoadingSpinner.svelte"
	import LockClosedIcon from "$icons/LockClosedIcon.svelte"
	import { goto } from "$app/navigation"
	import { CachePolicy, GQL_GetCart } from "$houdini"

	export let closeModal: () => void = () => {}

	const authStore = authService()

	let loading = false
	let error: string | undefined

	const messages = {
		email: { error: "Valid email is required." },
		password: {
			error: "Password must be 8-32 characters.",
		},
	}

	const schema = object({
		email: string().min(1, messages.email.error).email(messages.email.error),
		password: string().min(8, messages.password.error).max(32, messages.password.error),
		rememberMe: boolean(),
	})

	const handleSubmit: FelteSubmitEvent["onSubmit"] = async (
		values: zinfer<typeof schema>,
		context,
	) => {
		loading = true

		const { email, password, rememberMe } = values

		const thing = await authStore.send("SIGNIN", {
			input: { username: email, password, rememberMe },
		})

		// const { data } = await KQL_LoginUserWithCookies.mutate({
		// 	variables: {
		// 		cookiesInput: { login: email, password, rememberMe },
		// 	},
		// })

		loading = false
	}

	const handleError: FelteSubmitEvent["onError"] = () => {
		console.warn("Sign in error")
	}

	const handleSuccess: FelteSubmitEvent["onSuccess"] = async () => {
		await GQL_GetCart.fetch({ policy: CachePolicy.NetworkOnly })
		$page.params.redirect && goto("/" + $page.params.redirect)
	}

	const { form, errors } = createForm({
		onSubmit: handleSubmit,
		onError: handleError,
		onSuccess: handleSuccess,
		extend: [validator({ schema }), reporter], // OR `extend: [validator],`
		// ...
	})

	$: $authStore.matches("signedIn") && closeModal()
</script>

<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="text-center text-3xl font-extrabold text-gray-700">Sign in to your account</h2>
		</div>
		<form use:form class="mt-8 space-y-2">
			<div class="rounded-md shadow-sm -space-y-px">
				<div>
					<label for="email-address" class="sr-only"> Email address </label>

					<input
						id="email-address"
						type="email"
						autoComplete="email"
						name="email"
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
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
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
						placeholder="Password"
					/>
				</div>
			</div>
			<div class="mr-2 justify-end items-center flex">
				<label for="rememberMe" class="text-sm italic text-gray-400 mr-2"> Remember me? </label>
				<input
					type="checkbox"
					id="rememberMe"
					name="rememberMe"
					class="focus:ring-accent h-4 w-4 text-accent border-accent rounded"
					checked={false}
				/>
			</div>

			<div class="pt-2">
				{#each ["email", "password"] as item}
					<ValidationMessage for={item} let:messages={message}>
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
				{/each}
				<!-- <ErrorField name="email" />
				<ErrorField name="password" /> -->
				{#if error}
					<p class="text-red-main text-sm pt-2 pl-2">{error}</p>
				{/if}
			</div>

			<div class="text-sm text-center pt-2">
				<a
					href="/reset-password"
					class="font-medium text-accent hover:text-highlight"
					title="Reset your password."
					on:click={() => closeModal && closeModal()}
				>
					Forgot your password?
				</a>
			</div>

			<div class="pt-4">
				<button
					type="submit"
					title="Click to sign in."
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight"
				>
					<span class="absolute left-0 inset-y-0 flex items-center pl-3">
						{#if $authStore.matches("signingIn")}
							<LoadingSpinner size={5} color="white" />
						{:else}
							<div class="h-5 w-5 text-gray-300 group-hover:text-white" aria-hidden="true">
								<LockClosedIcon type="solid" />
							</div>
						{/if}
					</span>
					Sign in
				</button>
			</div>
		</form>
		<div class=" flex justify-center text-sm text-gray-600">
			<div>
				<span class="pr-1">Already have an account?</span>
			</div>
			<div on:click={() => closeModal && closeModal()} on:keyup={() => closeModal && closeModal()}>
				<a
					href={`/register${$page.params?.redirect ? `/${$page.params.redirect}` : ""}`}
					title="Click to register."
					class="font-medium text-accent hover:text-highlight"
				>
					<span>Click here to register</span>
				</a>
			</div>
			<span>.</span>
		</div>
	</div>
</div>
