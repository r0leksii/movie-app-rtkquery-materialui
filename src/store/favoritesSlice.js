import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: JSON.parse(localStorage.getItem('favorites')) || [],
  reducers: {
    addToFavorites: (state, action) => {
      state.push(action.payload)
      localStorage.setItem('favorites', JSON.stringify(state))
    },
    removeFromFavorites: (state, action) => {
      return state.filter((movie) => movie.id !== action.payload.id)
    },
  },
})

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions

export const favoritesReducer = favoritesSlice.reducer
