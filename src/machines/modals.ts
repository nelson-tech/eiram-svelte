import {
	createMachine,
	interpret,
	Interpreter,
	type AnyEventObject,
	type BaseActionObject,
	type ResolveTypegenMeta,
	type ServiceMap,
} from "xstate"
import type { Typegen0 } from "./modals.typegen"

interface ModalsContext {
	signIn: boolean
	shoppingCart: boolean
}

const modalsMachine =
	/** @xstate-layout N4IgpgJg5mDOIC5QFsD2ECGAbWA6AxlqrJAMSoAOYAdgMoCWU1AktYqBcfQC72ptIQAD0QBaAIwAGSbmkAOAEwB2OQFY5ANg0AWJRoCcAGhABPRPplylkhQrniNk1ePEBmVQF8PxtJhy5YRhZqAHkqalJCYjB2EE5A3n5YkQRROwVcbQNbV205PILtYzNUvNxxBX0lXPzavM8vY2p0OFjfbDwokghY+J4+AVAUiTtM1W1xyYnp4rFx3A1K63FVVQ11cW1XRpB2-0CmVjCaXq5EweExdMzshRqC-KLTRBXLawVtSrX9CrUdvfggj652SYlckg0N30OQehVmqQqSgWlR0VQM4j0bi8XiAA */
	createMachine({
		context: { signIn: false, shoppingCart: false } as ModalsContext,
		tsTypes: {} as import("./modals.typegen").Typegen0,
		id: "modals",
		initial: "closed",
		predictableActionArguments: true,
		states: {
			closed: {
				on: {
					openSignIn: {
						target: "signInOpen",
					},
					openShoppingCart: {
						target: "shoppingCartOpen",
					},
					openMobileMenu: {
						target: "mobileMenuOpen",
					},
				},
			},
			signInOpen: {
				on: {
					close: {
						target: "closed",
					},
				},
			},
			shoppingCartOpen: {
				on: {
					close: {
						target: "closed",
					},
				},
			},
			mobileMenuOpen: {
				on: {
					close: {
						target: "closed",
					},
				},
			},
		},
	})

// type ModalsServiceType = Interpreter<
// ModalC,
// any,
// AnyEventObject,
// {
// 	value: any
// 	context: AuthContext
// },
// ResolveTypegenMeta<Typegen0, AnyEventObject, BaseActionObject, ServiceMap>
// >

// let authentication: AuthServiceType | null = null

// const authService = (info?: string): AuthServiceType => {
// if (!authentication) {
// 	console.log("INFO", info)
// 	authentication = interpret(authMachine).start()
// }
// return authentication
// }

type ModalsServiceType = Interpreter<
	ModalsContext,
	any,
	AnyEventObject,
	{ value: any; context: ModalsContext },
	ResolveTypegenMeta<Typegen0, AnyEventObject, BaseActionObject, ServiceMap>
>

let modals: ModalsServiceType | null = null
const modalsService = (info?: string): ModalsServiceType => {
	if (!modals) {
		modals = interpret(modalsMachine).start()
	}
	return modals
}

export default modalsService
