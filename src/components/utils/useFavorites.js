// useFavorites.js
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToFavorites, removeFromFavorites } from '../../store/favoritesSlice'

export const useFavorites = (movie) => {
  const dispatch = useDispatch()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    setIsFavorite(favorites.some((favorite) => favorite.id === movie.id))
  }, [movie.id])

  const handleFavoriteChange = (event) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const movieInFavorites = favorites.find(
      (favorite) => favorite.id === movie.id
    )
    const newFavorites = event.target.checked
      ? [...favorites, movie].filter(
          (value, index, self) =>
            self.findIndex((m) => m.id === value.id) === index
        )
      : favorites.filter((favorite) => favorite.id !== movie.id)

    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setIsFavorite(event.target.checked)

    if (event.target.checked && !movieInFavorites) {
      dispatch(addToFavorites(movie))
    } else if (!event.target.checked && movieInFavorites) {
      dispatch(removeFromFavorites(movie))
    }
  }

  return { isFavorite, handleFavoriteChange }
}
