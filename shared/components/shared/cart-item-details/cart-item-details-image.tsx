import { cn } from '@/shared/lib/utils'
import Image from 'next/image'

interface Props {
	src: string
	className?: string
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
	return (
		<div className={cn('relative h-14 w-14', className)}>
			<Image src={src} fill alt='' />
		</div>
	)
}
