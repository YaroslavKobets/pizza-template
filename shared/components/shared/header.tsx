'use client'

import { cn } from '@/shared/lib'
import React from 'react'
import { Container } from './container'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { CartButton } from './cart-button'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { ProfileButton } from './profile-button'
import { AuthModal } from './modals'
import { Pizza } from 'lucide-react'

interface Props {
	hasSearch?: boolean
	hasCart?: boolean
	className?: string
}

export const Header: React.FC<Props> = ({
	hasSearch = true,
	hasCart = true,
	className,
}) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [openAuthModal, setOpenAuthModal] = React.useState(false)

	React.useEffect(() => {
		let toastMessage = ''

		if (searchParams.has('paid')) {
			toastMessage =
				'Замовлення успішно оплачено! Інформація надіслана на електронну пошту.'
		}

		if (searchParams.has('verified')) {
			toastMessage = 'Електронна пошта успішно підтверджена!'
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/')
				toast.success(toastMessage, {
					duration: 3000,
				})
			}, 1000)
		}
	}, [])

	return (
		<div className={cn('border border-b', className)}>
			<Container className='flex items-center justify-between py-4 md:py-8'>
				<Link href='/'>
					<div className='flex items-center gap-1'>
						<Pizza size={44} />
						<div>
							<h1 className='text-2xl uppercase font-black'>Pizza</h1>
							<p className='text-sm  text-gray-400 leading-3'>
								смачніше вже нікуди
							</p>
						</div>
					</div>
				</Link>
				{hasSearch && (
					<div className='mx-5 flex-1 md:mx-10'>
						<SearchInput />
					</div>
				)}

				<div className='flex items-center gap-3'>
					<AuthModal
						open={openAuthModal}
						onClose={() => setOpenAuthModal(false)}
					/>
					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

					{hasCart && <CartButton />}
				</div>
			</Container>
		</div>
	)
}
