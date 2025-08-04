import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoslice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
};

const persisttReducer = persistReducer(persistConfig, todoReducer);

export const store = configureStore({
	reducer: {
		todo: persisttReducer,
	},
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
