import { configureStore } from '@reduxjs/toolkit'
import { movieApi } from '../api/movie.api'
import { searchReducer } from './searchSlice'
import { selectedGenreReducer } from './selectedGenreSlice'
import { favoritesReducer } from './favoritesSlice'
import { viewReducer } from './viewSlice'

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    search: searchReducer,
    selectedGenre: selectedGenreReducer,
    favorites: favoritesReducer,
    view: viewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
})
