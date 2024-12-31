export const categories = [
	{ name: 'Піци' },
	{ name: 'Закуски' },
	{ name: 'Напої' },
	{ name: 'Десерти' },
	{ name: 'Добавки' },
]

export const _ingredients = [
	{
		name: 'Моцарела',
		price: 50,
		imageUrl: 'https://php.ninjapizza.com.ua/images/ing/3.png',
	},
	{
		name: 'Пармезан',
		price: 50,
		imageUrl: 'https://php.ninjapizza.com.ua/images/ing/7.png',
	},
	{
		name: 'Гриби гливи',
		price: 50,
		imageUrl: 'https://php.ninjapizza.com.ua/images/ing/34.png',
	},
	{
		name: 'Гриби печериці',
		price: 50,
		imageUrl: 'https://php.ninjapizza.com.ua/images/ing/46.png',
	},
	{
		name: 'Шинка Котто',
		price: 50,
		imageUrl: 'https://php.ninjapizza.com.ua/images/ing/129.png',
	},
	{
		name: 'Рікота',
		price: 50,
		imageUrl: 'https://php.ninjapizza.com.ua/images/ing/109.png',
	},
	{
		name: 'Хамон',
		price: 50,
		imageUrl: 'https://php.ninjapizza.com.ua/images/ing/146.png',
	},
	{
		name: 'Шпинат',
		price: 50,
		imageUrl: 'https://php.ninjapizza.com.ua/images/ing/17.png',
	},
	{
		name: 'Ананас свіжий',
		price: 50,
		imageUrl: 'https://php.ninjapizza.com.ua/images/ing/31.png',
	},
	{
		name: 'Перець халапаньйо',
		price: 50,
		imageUrl: 'https://php.ninjapizza.com.ua/images/ing/40.png',
	},
].map((obj, index) => ({ id: index + 1, ...obj }))

export const products = [
	{
		name: 'Креветки фрі із солодким чилі',
		imageUrl: 'https://php.ninjapizza.com.ua/images/71/l2x.webp?ver=v1.0.7',
		categoryId: 2,
	},
	{
		name: 'Паніні з креветкою та халапеньйо',
		imageUrl: 'https://php.ninjapizza.com.ua/images/168/l2x.webp?ver=v1.0.7',
		categoryId: 2,
	},
	{
		name: 'Паніні з курячими ковбасками та панчетою',
		imageUrl: 'https://php.ninjapizza.com.ua/images/169/l2x.webp?ver=v1.0.7',
		categoryId: 2,
	},
	{
		name: 'Курячі крила в кисло-солодкому соусі',
		imageUrl: 'https://php.ninjapizza.com.ua/images/170/l2x.webp?ver=v1.0.7',
		categoryId: 2,
	},
	{
		name: 'Чурос із лікером Адвокат',
		imageUrl: 'https://php.ninjapizza.com.ua/images/70/l2x.webp?ver=v1.0.7',
		categoryId: 4,
	},
	{
		name: 'Сирники з кремом та вафельною крихтою',
		imageUrl: 'https://php.ninjapizza.com.ua/images/172/l2x.webp?ver=v1.0.7',
		categoryId: 4,
	},
	{
		name: 'Чурос із пломбірним кремом',
		imageUrl: 'https://php.ninjapizza.com.ua/images/154/l2x.webp?ver=v1.0.7',
		categoryId: 4,
	},
	{
		name: 'Чурос із кленовим сиропом',
		imageUrl: 'https://php.ninjapizza.com.ua/images/155/l2x.webp?ver=v1.0.7',
		categoryId: 4,
	},
	{
		name: 'Fanta Berry',
		imageUrl: 'https://php.ninjapizza.com.ua/images/207/l2x.webp?ver=v1.0.7',
		categoryId: 3,
	},
	{
		name: 'Fanta Strawberry',
		imageUrl: 'https://php.ninjapizza.com.ua/images/208/l2x.webp?ver=v1.0.7',
		categoryId: 3,
	},
	{
		name: 'Халапеньо маринований',
		imageUrl: 'https://php.ninjapizza.com.ua/images/205/l2x.webp?ver=v1.0.7',
		categoryId: 5,
	},
	{
		name: 'Соус Тейсті',
		imageUrl: 'https://php.ninjapizza.com.ua/images/152/l2x.webp?ver=v1.0.7',
		categoryId: 5,
	},
]
