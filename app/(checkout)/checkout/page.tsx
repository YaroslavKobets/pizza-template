'use client'

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalInfo,
	CheckoutSidebar,
	Container,
	Title,
} from '@/shared/components'
import { useCart } from '@/shared/hooks'
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants'
import { createOrder } from '@/app/actions'
import toast from 'react-hot-toast'
import React from 'react'
import { Api } from '@/shared/services/api-client'
import { useSession } from 'next-auth/react'

export default function CheckoutPage() {
	const [submitting, setSubmitting] = React.useState(false)
	const { items, totalAmount, updateItemQuantity, removeCartItem, loading } =
		useCart()
	const { data: session } = useSession()

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	})

	React.useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe()
			const [firstName, lastName] = data.fullName.split(' ')

			form.setValue('firstName', firstName)
			form.setValue('lastName', lastName)
			form.setValue('email', data.email)
		}

		if (session) {
			fetchUserInfo()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session])

	const onSubmit: SubmitHandler<CheckoutFormValues> = async data => {
		try {
			setSubmitting(true)

			const redirectUrl = await createOrder(data)

			toast.success(
				'Zamówienie zostało pomyślnie złożone! 📝 Przejdź do płatności...',
				{
					icon: '✅',
				}
			)

			if (redirectUrl) {
				location.href = redirectUrl
			}
		} catch (err) {
			console.error(err)
			setSubmitting(false)
			toast.error('Nie udało się utworzyć zamówienia', {
				icon: '❌',
			})
		}
	}

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		updateItemQuantity(id, newQuantity)
	}
	return (
		<Container className='pb-5'>
			<Title text='Zamawianie' size='lg' className=' my-2 sm:my-6' />

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='grid sm:flex gap-2 md:gap-10'>
						<div className='grid gap-2 md:gap-10 w-full'>
							<CheckoutCart
								items={items}
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								loading={loading}
							/>
							<CheckoutPersonalInfo
								className={loading ? 'opacity-50 pointer-events-none' : ''}
							/>
							<CheckoutAddressForm
								className={loading ? 'opacity-50 pointer-events-none' : ''}
							/>
						</div>
						<div className='w-full sm:max-w-[450px]'>
							<CheckoutSidebar
								totalAmount={totalAmount}
								loading={loading || submitting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}
