import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui/button'

interface IconButtonProps {
	disabled?: boolean
	type?: 'plus' | 'minus'
	onClick?: () => void
}

export const CountIconButton: React.FC<IconButtonProps> = ({
	disabled,
	type,
	onClick,
}) => {
	return (
		<Button
			variant='outline'
			disabled={disabled}
			onClick={onClick}
			type='button'
			className='p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400 w-8 h-8 rounded-md'
		>
			{type === 'plus' ? <Plus size={16} /> : <Minus size={16} />}
		</Button>
	)
}
