import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
    name: "ticket",
    initialState: {
        username: "",
        mobile:"",
        pickup: "",
        drop: "",
        seats: "",
        date: "",
        model: "",
        registration: "",
        drivername: "",
        drivernumber: "",
        route: "",
        departuretime: "",
        fare: 0,
    },
    reducers: {
        newticket: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    }
});

export const { newticket } = ticketSlice.actions;
export default ticketSlice.reducer;
