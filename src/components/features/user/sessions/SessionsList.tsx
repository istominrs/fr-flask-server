'use client'

import { SessionItem } from '@/components/features/user/sessions/SessionItem'
import { Heading } from '@/components/ui/elements/Heading'
import { ToggleCardSkeleton } from '@/components/ui/elements/ToggleCardSkeleton'

import {
	useFindCurrenSessionQuery,
	useFindSessionsByUserQuery
} from '@/graphql/generated/output'

export function SessionsList() {
	const { data: sessionData, loading: isLoadingCurrent } =
		useFindCurrenSessionQuery()
	const currentSession = sessionData?.findCurrentSession!

	const { data: sessionsData, loading: isLoadingSessions } =
		useFindSessionsByUserQuery()
	const userSessions = sessionsData?.findSessionsByUser ?? []

	return (
		<div className='space-y-6'>
			<Heading title='Current session' size='sm' />
			{isLoadingCurrent ? (
				<ToggleCardSkeleton />
			) : (
				<SessionItem session={currentSession} isCurrentSession />
			)}

			<Heading title='Active sessions' size='sm' />
			{isLoadingSessions ? (
				Array.from({ length: 3 }).map((_, index) => (
					<ToggleCardSkeleton key={index} />
				))
			) : userSessions.length ? (
				userSessions.map((session, index) => (
					<SessionItem key={index} session={session} />
				))
			) : (
				<div className='text-muted-foreground'>
					No active sessions found
				</div>
			)}
		</div>
	)
}
