import { z } from 'zod'

export const passwordSchema = z
	.string()
	.min(4, { message: 'Wprowadź prawidłowe hasło' })

export const formLoginSchema = z.object({
	email: z.string().email({ message: 'Wpisz prawidłowy adres e-mail' }),
	password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema
	.merge(
		z.object({
			fullName: z.string().min(2, { message: 'Wpisz imię i nazwisko' }),
			confirmPassword: passwordSchema,
		})
	)
	.refine(data => data.password === data.confirmPassword, {
		message: 'Hasła nie pasują',
		path: ['confirmPassword'],
	})

export type TFormLoginValues = z.infer<typeof formLoginSchema>
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>
