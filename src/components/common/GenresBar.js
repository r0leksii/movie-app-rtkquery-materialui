import React, { useState } from 'react'
import { useGetGenresQuery } from '../../api/movie.api'
import { useDispatch } from 'react-redux'
import { setSelectedGenre } from '../../store/selectedGenreSlice'

export const GenresBar = () => {
  const { data: genres } = useGetGenresQuery()
  const dispatch = useDispatch()

  const [selectedGenres, setSelectedGenres] = useState([])

  // GenresBar.js

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
    <div>
      <button onClick={() => handleReset()}>All</button>
      {genres?.genres.map((genre) => (
        <button key={genre.id} onClick={() => handleClick(genre.id)}>
          {genre.name}
        </button>
      ))}
    </div>
  )
}
