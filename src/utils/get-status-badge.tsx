import { Badge } from '@/components/ui/common/Badge'

import { cn } from '@/utils/tw-merge'

export function getStatusBadge(status: string) {
	const base = 'rounded-full px-2 py-0.5 text-xs capitalize'

	switch (status) {
		case 'Active':
			return (
				<Badge className={cn(base, 'bg-green-100 text-green-700')}>
					{status}
				</Badge>
			)
		case 'Inactive':
			return (
				<Badge className={cn(base, 'bg-zinc-100 text-zinc-600')}>
					{status}
				</Badge>
			)
		case 'Error':
			return (
				<Badge className={cn(base, 'bg-red-100 text-red-700')}>
					{status}
				</Badge>
			)
		default:
			return (
				<Badge className={cn(base, 'bg-gray-100 text-gray-700')}>
					{status}
				</Badge>
			)
	}
}
