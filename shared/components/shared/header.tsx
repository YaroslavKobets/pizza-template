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
import { MapPin, Pizza } from 'lucide-react'

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
				'Zamówienie zostało pomyślnie opłacone! Informacje wysłano e-mailem.'
		}

		if (searchParams.has('verified')) {
			toastMessage = 'Adres e-mail został pomyślnie potwierdzony!'
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
			<Container className='flex items-center justify-between flex-wrap md:flex-nowrap py-4 gap-y-2 md:gap-y-0 md:py-8'>
				<Link href='/'>
					<div className='flex items-center gap-1'>
						<Pizza size={44} />
						<div>
							<h1 className='text-2xl leading-none uppercase font-black mb-[2px] tracking-widest'>
								Pizza
							</h1>
							<p className='text-lg flex items-center  text-gray-400 leading-none'>
								Szczecin <MapPin size={18} />
							</p>
						</div>
					</div>
				</Link>
				{hasSearch && (
					<div className='md:mx-3  lg:mx-10 w-full order-3 md:order-2'>
						<SearchInput />
					</div>
				)}

				<div className='flex items-center gap-1 md:gap-3  order-2 md:order-3'>
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
