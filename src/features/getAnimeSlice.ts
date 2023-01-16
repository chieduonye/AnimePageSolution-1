import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnimeCardData, AnimeCardArray } from "../models/api/GetAnime";

export interface AnimeItemsState {
  animeItems: {
    [rank: string]: AnimeCardData;
}}

const initialState: AnimeItemsState = {
    animeItems: {}
}
  


const animeItemsSlice = createSlice({
    initialState,
    name: "animeItems",
    reducers: {
      updatedAnimeItems(state, action: PayloadAction<AnimeCardArray>) {
        const animeItems = action.payload;
        
        animeItems.data.forEach(animeItem => {
          state.animeItems[animeItem.mal_id] = animeItem;
        })
      }
    },
  });

export const selectAnimeItems = (state: {animeItems: AnimeCardData} ) => state.animeItems
export const { updatedAnimeItems } = animeItemsSlice.actions;
export default animeItemsSlice.reducer;