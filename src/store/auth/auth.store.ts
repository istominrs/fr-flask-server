import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { AuthStore } from '@/store/auth/auth.types'

export const authStore = create(
	persist<AuthStore>(
		set => ({
			isAuthenticated: false,
			setIsAuthenticated: (isAuthenticated: boolean) =>
				set({ isAuthenticated: isAuthenticated })
		}),
		{
			name: 'auth',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
