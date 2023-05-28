import React, { useState } from 'react'
import { useGetGenresQuery } from '../../api/movie.api'
import { useDispatch } from 'react-redux'
import { setSelectedGenre } from '../../store/selectedGenreSlice'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'

export const GenresBar = () => {
  const { data: genres } = useGetGenresQuery()
  const dispatch = useDispatch()

  const [selectedGenres, setSelectedGenres] = useState([])

  const handleClick = (id) => {
    let updatedGenres

    if (selectedGenres.includes(id)) {
      updatedGenres = selectedGenres.filter((genre) => genre !== id)
    } else {
      updatedGenres = [...selectedGenres, id]
    }

    setSelectedGenres(updatedGenres)
    dispatch(setSelectedGenre(updatedGenres))
  }

  const handleReset = () => {
    setSelectedGenres([])
    dispatch(setSelectedGenre([]))
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.5rem',
        margin: '2rem 0 2rem 0',
      }}
    >
      <Button
        variant={selectedGenres.length === 0 ? 'contained' : 'outlined'}
        onClick={() => handleReset()}
      >
        All
      </Button>
      {genres?.genres.map((genre) => (
        <Button
          key={genre.id}
          onClick={() => handleClick(genre.id)}
          variant={selectedGenres.includes(genre.id) ? 'contained' : 'outlined'}
        >
          {genre.name}
        </Button>
      ))}
    </Box>
  )
}
