import { InfoBlock } from '@/shared/components'

export default function UnauthorizedPage() {
	return (
		<div className='flex flex-col items-center justify-center mt-40'>
			<InfoBlock
				title='Odmowa dostępu'
				text='Tę stronę mogą przeglądać jedynie upoważnieni użytkownicy.'
				imageType='lock'
			/>
		</div>
	)
}
