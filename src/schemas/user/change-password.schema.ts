import { z } from 'zod'

export const changePasswordSchema = z
	.object({
		oldPassword: z.string().min(8),
		newPassword: z.string().min(8),
		repeatedNewPassword: z.string().min(8)
	})
	.refine(data => data.newPassword === data.repeatedNewPassword, {
		path: ['repeatedNewPassword']
	})

export type TypeChangePasswordSchema = z.infer<typeof changePasswordSchema>
