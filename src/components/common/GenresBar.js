import React from 'react'
import { useGetGenresQuery } from '../../api/movie.api'
import { useDispatch } from 'react-redux'
import { setSelectedGenre } from '../../store/selectedGenreSlice'

export const GenresBar = () => {
  const { data: genres } = useGetGenresQuery()
  const dispatch = useDispatch()

  const handleClick = (id) => {
    dispatch(setSelectedGenre(id))
  }

  return (
    <div>
      <button onClick={() => handleClick('')}>All</button>
      {genres?.genres.map((genre) => (
        <button key={genre.id} onClick={() => handleClick(genre.id)}>
          {genre.name}
        </button>
      ))}
    </div>
  )
}
