/// <reference types="@sveltejs/kit" />

// import type { User$data } from "$houdini"

type TokensType = {
	auth: string | null
	refresh: boolean | string
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		body: any
		tokens: TokensType
		// user: User$data | null
		cart?: string | null
	}
	// interface Platform {}
	interface Session {
		tokens: TokensType
		// user: User$data | null
		// cart?: string | null
	}
	// interface Stuff {}
}
