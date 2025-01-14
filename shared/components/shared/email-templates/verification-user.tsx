import React from 'react'

interface Props {
	code: string
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => (
	<div>
		<p>
			Kod potwierdzający:<h2>{code}</h2>
		</p>

		<p>
			<a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
				Potwierdź rejestrację
			</a>
		</p>
	</div>
)
