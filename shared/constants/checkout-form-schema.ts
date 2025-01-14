import { z } from 'zod'

export const checkoutFormSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: 'Nazwa musi zawierać co najmniej 2 znaki' }),
	lastName: z
		.string()
		.min(2, { message: 'Nazwisko musi zawierać co najmniej 2 znaki' }),
	email: z.string().email({ message: 'Proszę podać prawidłowy adres e-mail' }),
	phone: z.string().min(10, { message: 'Wpisz prawidłowy numer telefonu' }),
	address: z.string().min(5, { message: 'Proszę wprowadzić prawidłowy adres' }),
	comment: z.string().optional(),
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>
