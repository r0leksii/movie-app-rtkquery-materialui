import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  genreId: '',
}

export const selectedGenreSlice = createSlice({
  name: 'selectedGenre',
  initialState,
  reducers: {
    setSelectedGenre: (state, action) => {
      state.genreId = action.payload
    },
  },
})

export const { setSelectedGenre } = selectedGenreSlice.actions

export const selectedGenreReducer = selectedGenreSlice.reducer
