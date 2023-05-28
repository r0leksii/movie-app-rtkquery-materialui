import { createSlice } from '@reduxjs/toolkit'

export const viewSlice = createSlice({
  name: 'view',
  initialState: {
    view: 'movies',
  },
  reducers: {
    switchToFavorites: (state) => {
      state.view = 'favorites'
    },
    switchToMovies: (state) => {
      state.view = 'movies'
    },
  },
})

export const { switchToFavorites, switchToMovies } = viewSlice.actions
export const viewReducer = viewSlice.reducer
