import React from 'react'
import { useSelector } from 'react-redux'
import { MovieGrid } from '../utils/MovieGrid'

export const FavoritesList = () => {
  const favorites = useSelector((state) => state.favorites)

  return <MovieGrid movies={favorites} />
}
