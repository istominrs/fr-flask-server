import { z } from 'zod'

export const newPasswordSchema = z
	.object({
		password: z.string().min(8),
		repeatedPassword: z.string().min(8)
	})
	.refine(data => data.password === data.repeatedPassword, {
		path: ['repeatedPassword']
	})

export type TypeNewPasswordSchema = z.infer<typeof newPasswordSchema>
