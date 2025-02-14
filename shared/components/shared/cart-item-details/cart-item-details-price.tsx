import { cn } from '@/shared/lib/utils'

interface Props {
	value: number
	className?: string
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
	return (
		<h2 className={cn('font-bold whitespace-nowrap', className)}>{value} zł</h2>
	)
}
