import { z } from 'zod'

export const contactUsSchema = z.object({
	email: z.email(),
	message: z.string().min(20)
})

export type TypeContactUsSchema = z.infer<typeof contactUsSchema>
