import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
    country: string | null;
    city: string | null;
}

const initialState: LocationState = {
    country: null,
    city: null,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setCountry(state, action: PayloadAction<string>) {
            state.country = action.payload;
        },
        setCity(state, action: PayloadAction<string>) {
            state.city = action.payload;
        },
    },
});

export const { setCountry, setCity } = locationSlice.actions;

export default locationSlice.reducer;