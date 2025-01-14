'use server'

import { prisma } from '@/prisma/prisma-client'
import { PayOrderTemplate, VerificationUserTemplate } from '@/shared/components'
import { CheckoutFormValues } from '@/shared/constants'
import { sendEmail } from '@/shared/lib'
import { getUserSession } from '@/shared/lib/get-user-session'
import { OrderStatus, Prisma } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { cookies } from 'next/headers'

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies()
		const cartToken = cookieStore.get('cartToken')?.value

		if (!cartToken) {
			throw new Error('Cart token not found')
		}

		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		})
		if (!userCart) {
			throw new Error('Cart not found')
		}

		if (userCart?.totalAmount === 0) {
			throw new Error('Cart is empty')
		}

		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		})

		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		})

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		})

		await sendEmail(
			data.email,
			'Pizza / Zapłać za zamówienie#' + order.id,
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
			})
		)

		return '/?paid'
	} catch (err) {
		console.log('[CreateOrder] Server error', err)
		throw err
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession()

		if (!currentUser) {
			throw new Error('Użytkownik nie został znaleziony')
		}

		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		})

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password
					? hashSync(body.password as string, 10)
					: findUser?.password,
			},
		})
	} catch (err) {
		console.log('Error [UPDATE_USER]', err)
		throw err
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		})

		if (user) {
			if (!user.verified) {
				console.log('Użytkownik znaleziony, ale niezweryfikowany:', user)
				throw new Error('Adres e-mail niepotwierdzony')
			}

			throw new Error('Użytkownik już istnieje')
		}

		const createdUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10),
			},
		})

		const code = Math.floor(100000 + Math.random() * 900000).toString()

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id,
			},
		})

		await sendEmail(
			createdUser.email,
			'Pizza / 📝 Potwierdzenie rejestracji',
			VerificationUserTemplate({
				code,
			})
		)
	} catch (err) {
		console.log('Błąd [CREATE_USER]', err)
		throw err
	}
}
