import { configureStore } from '@reduxjs/toolkit';
import animeItemsReducer from "../features/getAnimeSlice";

export const store = configureStore({
    reducer: {
      animeItems: animeItemsReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

