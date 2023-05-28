import React from 'react'
import { useSelector } from 'react-redux'
import { useGetSearchedMoviesQuery } from '../../api/movie.api'
import { MovieGrid } from '../utils/MovieGrid'
import { Typography } from '@mui/material'

export const SearchedList = () => {
  const searchTerm = useSelector((state) => state.search.term)

  const {
    data: searchResultData,
    isLoading,
    isError,
  } = useGetSearchedMoviesQuery(searchTerm)

  if (isError) return <Typography component="p">Error loading data.</Typography>
  if (isLoading || !searchResultData)
    return <Typography component="p">Loading...</Typography>

  const searchResults = searchResultData.results

  if (searchResults.length === 0)
    return <Typography component="p">No results found.</Typography>

  return (
    <>
      <Typography variant="h3">Search results for "{searchTerm}"</Typography>
      <MovieGrid movies={searchResults} />
    </>
  )
}
