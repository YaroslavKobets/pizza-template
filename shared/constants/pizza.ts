export const mapPizzaSize = {
	20: 'Mały',
	30: 'Przeciętny',
	40: 'Duży',
} as const

export const mapPizzaType = {
	1: 'Cienki',
	2: 'Puszyste',
} as const

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
	name,
	value,
}))
export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
	name,
	value,
}))

export type PizzaType = keyof typeof mapPizzaType
export type PizzaSize = keyof typeof mapPizzaSize
