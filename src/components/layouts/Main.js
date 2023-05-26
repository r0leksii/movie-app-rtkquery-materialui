import React from 'react'
import { useSelector } from 'react-redux'
import { MovieList } from '../lists/MovieList'
import { SearchedList } from '../lists/SearchedList'

export const MainComponent = () => {
  const searchTerm = useSelector((state) => state.search.term)

  return <>{searchTerm ? <SearchedList /> : <MovieList />}</>
}
