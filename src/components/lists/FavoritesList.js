import React from 'react'
import { useSelector } from 'react-redux'
import { MovieCard } from '../cards/MovieCard'
import { Grid } from '@mui/material'

export const FavoritesList = () => {
  const favorites = useSelector((state) => state.favorites)

  return (
    <Grid container spacing={2}>
      {(favorites || []).map((movie, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  )
}
