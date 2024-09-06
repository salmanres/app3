import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import ticketReducer from './TicketSlice';
import driverReducer from './DriverSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  ticket: ticketReducer,
  driver: driverReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const appStore = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(appStore);
