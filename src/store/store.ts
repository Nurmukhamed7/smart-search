import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { platinumAPI } from './queries/platinumAPI'

const rootReducer = combineReducers({
	[platinumAPI.reducerPath]: platinumAPI.reducer,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(platinumAPI.middleware),
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
