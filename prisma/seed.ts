import { Prisma } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { prisma } from './prisma-client'
import { categories, _ingredients, products } from './constants'

const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

const generateProductItem = ({
	productId,
	pizzaType,
	size,
}: {
	productId: number
	pizzaType?: 1 | 2
	size?: 20 | 30 | 40
}) => {
	return {
		productId,
		price: randomNumber(20, 45),
		pizzaType,
		size,
	} as Prisma.ProductItemUncheckedCreateInput
}

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'User test',
				email: 'user@test.com',
				password: hashSync('12345', 10),
				verified: new Date(),
				role: 'USER',
			},
			{
				fullName: 'Admin test',
				email: 'Admin@test.com',
				password: hashSync('12345', 10),
				verified: new Date(),
				role: 'ADMIN',
			},
		],
	})

	await prisma.category.createMany({
		data: categories,
	})
	await prisma.ingredient.createMany({
		data: _ingredients,
	})
	await prisma.product.createMany({
		data: products,
	})

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Pizza Z Pieczarkami I Szynką',
			imageUrl: '/pizza/pizza-1.webp',
			categoryId: 1,
			ingredients: {
				connect: [{ id: 4 }, { id: 5 }, { id: 7 }, { id: 8 }],
			},
		},
	})

	const pizza2 = await prisma.product.create({
		data: {
			name: 'Pizza z szynką i brzoskwiniami',
			imageUrl: '/pizza/pizza-2.webp',
			categoryId: 1,
			ingredients: {
				connect: [{ id: 5 }, { id: 6 }, { id: 7 }, { id: 12 }],
			},
		},
	})

	const pizza3 = await prisma.product.create({
		data: {
			name: 'Pizza z krewetkami i kawiorem',
			imageUrl: '/pizza/pizza-3.webp',
			categoryId: 1,
			ingredients: {
				connect: [{ id: 10 }, { id: 11 }, { id: 3 }],
			},
		},
	})

	const pizza4 = await prisma.product.create({
		data: {
			name: 'Pizza z gruszką i gorgonzolą',
			imageUrl: '/pizza/pizza-4.webp',
			categoryId: 1,
			ingredients: {
				connect: [{ id: 6 }, { id: 5 }, { id: 4 }],
			},
		},
	})

	const pizza5 = await prisma.product.create({
		data: {
			name: 'Pizza z szynką Cotto i sosem truflowym',
			imageUrl: '/pizza/pizza-5.webp',
			categoryId: 1,
			ingredients: {
				connect: [{ id: 5 }, { id: 2 }, { id: 13 }],
			},
		},
	})

	const pizza6 = await prisma.product.create({
		data: {
			name: 'Pizza z szynką Cotto i ananasem',
			imageUrl: '/pizza/pizza-6.webp',
			categoryId: 1,
			ingredients: {
				connect: [{ id: 5 }, { id: 12 }, { id: 7 }],
			},
		},
	})

	const pizza7 = await prisma.product.create({
		data: {
			name: 'Pizza z kaczką w stylu azjatyckim',
			imageUrl: '/pizza/pizza-7.webp',
			categoryId: 1,
			ingredients: {
				connect: [{ id: 1 }, { id: 5 }, { id: 7 }, { id: 9 }],
			},
		},
	})

	const pizza8 = await prisma.product.create({
		data: {
			name: 'Pizza Fruti di Mare',
			imageUrl: '/pizza/pizza-8.webp',
			categoryId: 1,
			ingredients: {
				connect: [{ id: 10 }, { id: 11 }, { id: 3 }],
			},
		},
	})

	const pizza9 = await prisma.product.create({
		data: {
			name: 'Podwójne pepperoni',
			imageUrl: '/pizza/pizza-9.webp',
			categoryId: 1,
			ingredients: {
				connect: [{ id: 13 }, { id: 7 }, { id: 4 }],
			},
		},
	})

	const pizza10 = await prisma.product.create({
		data: {
			name: 'Pizza z małżami i ośmiornicą',
			imageUrl: '/pizza/pizza-10.webp',
			categoryId: 1,
			ingredients: {
				connect: [{ id: 3 }, { id: 11 }, { id: 5 }],
			},
		},
	})

	const pizza11 = await prisma.product.create({
		data: {
			name: 'Pizzę Tom Yum',
			imageUrl: '/pizza/pizza-11.webp',
			categoryId: 1,
			ingredients: {
				connect: [{ id: 5 }, { id: 12 }, { id: 7 }],
			},
		},
	})

	await prisma.productItem.createMany({
		data: [
			// Pizza 1
			generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),
			// Pizza 2
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),
			// Pizza 3
			generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),
			// Pizza 4
			generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 20 }),
			generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 20 }),

			// Pizza 5
			generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 40 }),
			generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 20 }),
			generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 40 }),

			// Pizza 6
			generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 40 }),
			generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 20 }),

			// Pizza 7
			generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 40 }),

			// Pizza 8
			generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 20 }),
			generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 40 }),
			generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 40 }),

			// Pizza 9
			generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 40 }),

			// Pizza 10
			generateProductItem({ productId: pizza10.id, pizzaType: 1, size: 40 }),
			generateProductItem({ productId: pizza10.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza10.id, pizzaType: 1, size: 20 }),

			// Pizza 11
			generateProductItem({ productId: pizza11.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza11.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza11.id, pizzaType: 2, size: 40 }),
			generateProductItem({ productId: pizza11.id, pizzaType: 1, size: 30 }),

			generateProductItem({ productId: 1 }),
			generateProductItem({ productId: 2 }),
			generateProductItem({ productId: 3 }),
			generateProductItem({ productId: 4 }),
			generateProductItem({ productId: 5 }),
			generateProductItem({ productId: 6 }),
			generateProductItem({ productId: 7 }),
			generateProductItem({ productId: 8 }),
			generateProductItem({ productId: 9 }),
			generateProductItem({ productId: 10 }),
			generateProductItem({ productId: 11 }),
			generateProductItem({ productId: 12 }),
			generateProductItem({ productId: 13 }),
			generateProductItem({ productId: 14 }),
			generateProductItem({ productId: 15 }),
			generateProductItem({ productId: 16 }),
			generateProductItem({ productId: 17 }),
			generateProductItem({ productId: 18 }),
			generateProductItem({ productId: 19 }),
			generateProductItem({ productId: 20 }),
			generateProductItem({ productId: 21 }),
		],
	})

	await prisma.cart.createMany({
		data: [
			{ userId: 1, totalAmount: 0, token: '12345' },
			{ userId: 2, totalAmount: 0, token: '54321' },
		],
	})

	await prisma.cartItem.create({
		data: {
			productItemId: 1,
			cartId: 1,
			quantity: 2,
			ingredients: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }] },
		},
	})
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`
}

async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
