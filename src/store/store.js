import { configureStore } from '@reduxjs/toolkit'
import { movieApi } from '../api/movie.api'
import { searchReducer } from './searchSlice'
import { selectedGenreReducer } from './selectedGenreSlice'

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    search: searchReducer,
    selectedGenre: selectedGenreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
})
