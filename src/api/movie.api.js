import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

const MOVIE_API_KEY = process.env.REACT_APP_TMDB_API_KEY

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: MOVIE_API_KEY,
  },
})

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: api,
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ page = 1, genreIds = '' }) => ({
        url: 'discover/movie',
        params: {
          language: 'en-US',
          sort_by: 'popularity.desc',
          include_adult: false,
          include_video: false,
          page,
          with_genres: genreIds,
        },
      }),
    }),

    getGenres: builder.query({
      query: () => ({
        url: 'genre/movie/list',
        params: {
          language: 'en-US',
        },
      }),
    }),

    getActors: builder.query({
      query: (movieId) => ({
        url: `movie/${movieId}/credits`,
        params: {
          language: 'en-US',
        },
      }),
    }),

    getSearchedMovies: builder.query({
      query: (searchTerm) => ({
        url: 'search/movie',
        params: {
          language: 'en-US',
          include_adult: false,
          query: searchTerm,
          page: 1,
        },
      }),
    }),
  }),
})

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetActorsQuery,
  useGetSearchedMoviesQuery,
} = movieApi
