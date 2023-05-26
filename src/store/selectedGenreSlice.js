// selectedGenreSlice.js
import { createSlice } from '@reduxjs/toolkit'

const selectedGenreSlice = createSlice({
  name: 'selectedGenre',
  initialState: null,
  reducers: {
    setSelectedGenre: (state, action) => action.payload,
    clearSelectedGenre: () => null,
  },
})

export const { setSelectedGenre, clearSelectedGenre } =
  selectedGenreSlice.actions
export const selectedGenreReducer = selectedGenreSlice.reducer
