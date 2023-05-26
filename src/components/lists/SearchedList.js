import React from 'react'
import { useSelector } from 'react-redux'
import { useGetSearchedMoviesQuery } from '../../api/movie.api'
import { MovieCard } from '../cards/MovieCard'
import { Grid } from '@mui/material'

export const SearchedList = () => {
  const searchTerm = useSelector((state) => state.search.term)

  const {
    data: searchResultData,
    isLoading,
    isError,
  } = useGetSearchedMoviesQuery(searchTerm)

  if (isError) return <div>Error loading data.</div>
  if (isLoading || !searchResultData) return <div>Loading...</div>

  const searchResults = searchResultData.results

  if (searchResults.length === 0) return <div>No results found.</div>

  return (
    <Grid container spacing={2}>
      {searchResults.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  )
}
