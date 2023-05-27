import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  genreIds: [],
}

const selectedGenreSlice = createSlice({
  name: 'selectedGenre',
  initialState,
  reducers: {
    setSelectedGenre: (state, action) => {
      state.genreIds = action.payload
    },
  },
})

export const { setSelectedGenre } = selectedGenreSlice.actions
export const selectedGenreReducer = selectedGenreSlice.reducer
