import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { Title } from './title'
import Link from 'next/link'
import { cn } from '@/shared/lib/utils'

interface Props {
	title: string
	text: string
	className?: string
	imageType?: 'lock'
}

export const InfoBlock: React.FC<Props> = ({
	className,
	title,
	text,
	imageType,
}) => {
	return (
		<div
			className={cn(
				className,
				'flex items-center justify-between w-[840px] gap-12'
			)}
		>
			<div className='flex flex-col'>
				<div className='w-[445px]'>
					<Title size='lg' text={title} className='font-extrabold' />
					<p className='text-gray-400 text-lg'>{text}</p>
				</div>

				<div className='flex gap-5 mt-11'>
					<Link href='/'>
						<Button variant='outline' className='gap-2'>
							<ArrowLeft />
							Na głównej
						</Button>
					</Link>
					<a href=''>
						<Button
							variant='outline'
							className='text-gray-500 border-gray-400 hover:bg-gray-50'
						>
							Aktualizacja
						</Button>
					</a>
				</div>
			</div>

			{imageType === 'lock' && <LockKeyhole size={180} />}
		</div>
	)
}
