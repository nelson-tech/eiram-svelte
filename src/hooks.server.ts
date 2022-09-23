import { sequence } from "@sveltejs/kit/hooks"

import { handle as wpHandle } from "$wp/lib/hooks"

export const handle = sequence(wpHandle)
