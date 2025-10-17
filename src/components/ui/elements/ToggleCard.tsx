import { Switch } from '@/components/ui/common/Switch'
import { CardContainer } from '@/components/ui/elements/CardContainer'

interface ToggleCardProps {
	heading: string
	description: string
	isDisabled?: boolean
	value: boolean
	onChange: (value: boolean) => void
}

export function ToggleCard({
	heading,
	description,
	isDisabled,
	value,
	onChange
}: ToggleCardProps) {
	return (
		<CardContainer
			heading={heading}
			description={description}
			rightContent={
				<Switch
					checked={value}
					onCheckedChange={onChange}
					disabled={isDisabled}
				/>
			}
		/>
	)
}
