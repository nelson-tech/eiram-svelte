// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
	"@@xstate/typegen": true
	internalEvents: {
		"done.invoke.authChecker": {
			type: "done.invoke.authChecker"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"done.invoke.signIn": {
			type: "done.invoke.signIn"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"done.invoke.signOut": {
			type: "done.invoke.signOut"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"error.platform.authChecker": { type: "error.platform.authChecker"; data: unknown }
		"error.platform.signIn": { type: "error.platform.signIn"; data: unknown }
		"error.platform.signOut": { type: "error.platform.signOut"; data: unknown }
		"xstate.init": { type: "xstate.init" }
	}
	invokeSrcNameMap: {
		authChecker: "done.invoke.authChecker"
		signIn: "done.invoke.signIn"
		signOut: "done.invoke.signOut"
	}
	missingImplementations: {
		actions: never
		services: never
		guards: never
		delays: never
	}
	eventsCausingActions: {
		clearAuth: "done.invoke.signOut" | "error.platform.authChecker" | "error.platform.signOut"
		clearError: "done.invoke.signIn" | "done.invoke.signOut"
		setError: "error.platform.authChecker" | "error.platform.signIn" | "error.platform.signOut"
		setUser: "done.invoke.authChecker" | "done.invoke.signIn"
	}
	eventsCausingServices: {
		authChecker: "done.invoke.signIn" | "xstate.init"
		signIn: "SIGNIN"
		signOut: "SIGNOUT"
	}
	eventsCausingGuards: {}
	eventsCausingDelays: {}
	matchesStates: "authenticating" | "signedIn" | "signedOut" | "signingIn" | "signingOut"
	tags: never
}
