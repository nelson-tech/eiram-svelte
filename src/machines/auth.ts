import {
	assign,
	createMachine,
	interpret,
	Interpreter,
	type AnyEventObject,
	type BaseActionObject,
	type ResolveTypegenMeta,
	type ServiceMap,
} from "xstate"

import type { LoginInput, User } from "$houdini"
import type { Typegen0 } from "./auth.typegen"
import { useLogin } from "$wp/lib/auth/useLogin"
import { useLogout } from "$wp/lib/auth/useLogout"
import modalsService from "./modals"

interface AuthContext {
	auth: boolean
	user: User | null
	error: string | null
}

const modalsStore = modalsService()

const authMachine =
	/** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOjVsAdugJYDGyJBUAxBAPYFjbEEBudA1k3pgMKZhSXAE6JQABzqxiJBmJAAPRAFYA7AA5s6gCwBGZQCYAnEd0A2M6oDMAGhABPRAFpdB7KpMHtq3etUAGKx0rMwBfULseXAwBIjIKFhowYWE6YWxxABsKADM0gFtorH5BEXlJaVkCeSUEXV0rLSN-M39lNSNVAytAu0cEA2VGqy9dI0srKw9tbWVwyJjsaShGCABJAmoAZTWAcQA5AHkAVQAVcqkZYjkkRURdf0fsI20WowMP-3rrPsQzK2U2FcJm0Blc-jBRis8xAUWWq0OGG2e32a32F0q12qt1qym0mhCJlUFjGZlB6l+CEMZi0oyhgW0ZheBhhcOIK0SG1oDCYLHYXCW7IIGwxVxuoFq6imtOMyjaBi6Y1UlLB2G0U386vGUKM7SMrMW8M5m2SqXSWVyBUFKxFtwqYuxEsQxO0aqhGkMBnU+gpDmcuuwZm66jB6jM3sZynUBqw1oIiUR6G5jGYbE4THhidFVXk-VUXXc7weJma+e0dlqrm62C99KmQY8gRjOCNVET1FNaQy2XQeWEhUzGGzWJq9w+jVrPXrCuatj9CC6ro8YP8Jf8ZfCERABDoEDg8iiPEIJHIlCgw-FdwQemeJfUYZ8crlZmUlJc-kL7xC-nUnSmPTCLc2RWSBbQkS4cxxRAjB0Z5lH+LwzF8KxfF0SldCXR5iQsHQow8VQ5iAw0hUgRNsE4C9HSvDDdCBAj8weMtrBeSkCKMbBAgeIYwSsTxtGbONSIwbAcmQYhMlQYQwEo0c6hvXR6J8ddVG8Xjy3nb1ASmB51EeJlGVcAT4SE9AZKguoFLotQlKYtTKXDGlAlXX96gaf5AIWWNWygMCQHtSCnQQf4PyDBSg2-AF1xVdpsBGPQdB8BTfG6IyhQTIc7QgkdzKhNxjCQ3iAghWdWILZdixMZT+KIrAzMCyySxgh99DaFpX3nFxw0DYMwUse9jHXTdQiAA */
	createMachine(
		{
			context: { auth: false, user: null, error: null } as AuthContext,
			tsTypes: {} as import("./auth.typegen").Typegen0,
			id: "auth",
			initial: "authenticating",
			predictableActionArguments: true,
			states: {
				authenticating: {
					invoke: {
						src: "authChecker",
						id: "authChecker",
						onDone: [
							{
								actions: "setUser",
								target: "signedIn",
							},
						],
						onError: [
							{
								actions: ["clearAuth", "setError"],
								target: "signedOut",
							},
						],
					},
				},
				signedIn: {
					on: {
						SIGNOUT: {
							target: "signingOut",
						},
					},
				},
				signedOut: {
					on: {
						SIGNIN: {
							target: "signingIn",
						},
					},
				},
				signingIn: {
					invoke: {
						src: "signIn",
						id: "signIn",
						onDone: [
							{
								actions: ["clearError", "setUser"],
								target: "authenticating",
							},
						],
						onError: [
							{
								actions: "setError",
								target: "signedOut",
							},
						],
					},
				},
				signingOut: {
					invoke: {
						src: "signOut",
						id: "signOut",
						onDone: [
							{
								actions: ["clearAuth", "clearError"],
								target: "signedOut",
							},
						],
						onError: [
							{
								actions: ["clearAuth", "setError"],
								target: "signedOut",
							},
						],
					},
				},
			},
		},
		{
			actions: {
				clearAuth: assign((ctx) => ({ ...ctx, user: null, auth: false })),
				clearError: assign((ctx) => ({ ...ctx, error: null })),
				setUser: assign((_, event) => {
					const user = event.data as User

					return { auth: true, user }
				}),
				setError: assign({ error: (_, event) => event.data as string }),
			},
			services: {
				authChecker: async (ctx, event) => {
					const data = await fetch("/auth", {
						method: "POST",
						body: JSON.stringify({ action: "CHECKING" }),
					})

					const response = await data.json()

					if (response.authToken) return true
					throw new Error("Unauthorized")
				},
				signIn: async (ctx, event: { input: LoginInput }) => {
					const { username, password } = event.input

					const data = await useLogin({ username, password })

					data && modalsStore.send("close")

					return data
				},
				signOut: async () => {
					console.log("SIGNING OUT")

					const data = await useLogout()

					return data
				},
			},
		},
	)

type AuthServiceType = Interpreter<
	AuthContext,
	any,
	AnyEventObject,
	{
		value: any
		context: AuthContext
	},
	ResolveTypegenMeta<Typegen0, AnyEventObject, BaseActionObject, ServiceMap>
>

let authentication: AuthServiceType | null = null

const authService = (info?: string): AuthServiceType => {
	if (!authentication) {
		// console.log("INFO", info)
		authentication = interpret(authMachine).start()
	}
	return authentication
}

export default authService
