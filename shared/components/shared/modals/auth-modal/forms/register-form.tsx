'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { registerUser } from '@/app/actions'
import { TFormRegisterValues, formRegisterSchema } from './schemas'
import { FormInput } from '../../../form'
import { Button } from '@/shared/components/ui'
import { Title } from '../../../title'

interface Props {
	onClose?: VoidFunction
	onClickLogin?: VoidFunction
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<TFormRegisterValues>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: '',
			fullName: '',
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await registerUser({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			})

			toast.success(
				'Rejestracja przebiegła pomyślnie 📝. Potwierdź swój adres e-mail',
				{
					icon: '✅',
				}
			)

			onClose?.()
		} catch (error) {
			console.error('Error [REGISTER]', error)

			return toast.error('Nieprawidłowy adres e-mail lub hasło', {
				icon: '❌',
			})
		}
	}

	return (
		<FormProvider {...form}>
			<Title text='Rejestracja' size='md' className='font-bold' />
			<form
				className='flex flex-col gap-5'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormInput name='email' label='E-Mail' required />
				<FormInput name='fullName' label='Pełne imię i nazwisko' required />
				<FormInput name='password' label='Hasło' type='password' required />
				<FormInput
					name='confirmPassword'
					label='Potwierdź hasło'
					type='password'
					required
				/>

				<Button
					loading={form.formState.isSubmitting}
					className='h-12 text-base'
					type='submit'
				>
					Zapisać się
				</Button>
			</form>
		</FormProvider>
	)
}
