import { z } from 'zod'

export const loginAccountSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
	pin: z.string().optional()
})

export type TypeLoginAccountSchema = z.infer<typeof loginAccountSchema>
