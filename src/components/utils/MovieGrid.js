import React from 'react'
import { MovieCard } from '../cards/MovieCard'
import { Grid } from '@mui/material'

export const MovieGrid = ({ movies }) => (
  <Grid container spacing={2}>
    {movies.map((movie, index) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2}
        key={`${movie.id}-${index}`}
      >
        <MovieCard movie={movie} />
      </Grid>
    ))}
  </Grid>
)
