import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { rootPersist, rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: persistReducer(rootPersist, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export const { dispatch } = store;

export const useDispatch = () => useAppDispatch<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
