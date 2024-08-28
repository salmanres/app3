import { configureStore } from '@reduxjs/toolkit';
import TicketSlice, { newticket } from './TicketSlice';

export const appStore = configureStore({
    reducer:{
        ticket : TicketSlice,
    }
});