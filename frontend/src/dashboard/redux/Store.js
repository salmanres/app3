import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import ticketReducer from './TicketSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, ticketReducer);

export const appStore = configureStore({
  reducer: {
    ticket: persistedReducer,
  },
});

export const persistor = persistStore(appStore);
