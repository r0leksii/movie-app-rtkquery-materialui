import React from 'react'
import { useSelector } from 'react-redux'
import { MovieList } from '../lists/MovieList'
import { SearchedList } from '../lists/SearchedList'
import { FavoritesList } from '../lists/FavoritesList'
import { Box } from '@mui/material'

export const MainComponent = () => {
  const searchTerm = useSelector((state) => state.search.term)
  const view = useSelector((state) => state.view.view)

  if (view === 'favorites') {
    return <FavoritesList />
  }

  return (
    <Box component="main">{searchTerm ? <SearchedList /> : <MovieList />}</Box>
  )
}
