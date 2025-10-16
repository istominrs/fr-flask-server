import { Tabs, TabsList, TabsTrigger } from '@/components/ui/common/Tabs'
import { Heading } from '@/components/ui/elements/Heading'

export function Settings() {
	return (
		<div className='lg:px-10'>
			<Heading
				title='Settings'
				description='Here you can manage your settings'
				size='lg'
			/>

			<Tabs defaultValue='account' className='mt-3 w-full'>
				<TabsList className='grid max-w-2xl grid-cols-3'>
					<TabsTrigger value='account'>Account</TabsTrigger>
					<TabsTrigger value='notifications'>Notifications</TabsTrigger>
					<TabsTrigger value='sessions'>Sessions</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	)
}
