'use client'

import React, { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import NextTopLoader from 'nextjs-toploader'
import { SessionProvider } from 'next-auth/react'

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<SessionProvider>{children}</SessionProvider>
			<Toaster />
			<NextTopLoader />
		</>
	)
}
