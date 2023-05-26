import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedGenre } from '../../store/selectedGenreSlice'
import { useGetGenresQuery } from '../../api/movie.api'

export const GenresBar = () => {
  const [selectGenre, setSelectGenre] = useState('')
  const { data: genreData = {} } = useGetGenresQuery()

  const dispatch = useDispatch()

  const handleSelectGenre = (event) => {
    setSelectGenre(event.target.value)
    dispatch(setSelectedGenre(event.target.value))
  }

  return (
    <select value={selectGenre} onChange={handleSelectGenre}>
      <option value="">All</option>
      {genreData.genres &&
        genreData.genres.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
    </select>
  )
}
