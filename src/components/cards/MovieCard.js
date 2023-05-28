import React, { useState, useEffect } from 'react'
import { MovieDetails } from './MovieDetails'
import { useDispatch } from 'react-redux'
import { addToFavorites, removeFromFavorites } from '../../store/favoritesSlice'
import styles from './MovieCard.module.scss'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Favorite from '@mui/icons-material/Favorite'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

const label = { inputProps: { 'aria-label': 'Add to favorites' } }

export const MovieCard = ({ movie }) => {
  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
  })

  const dispatch = useDispatch()

  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    setIsFavorite(favorites.some((favorite) => favorite.id === movie.id))
  }, [movie.id])

  const handleFavoriteChange = (event) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []

    if (event.target.checked) {
      if (!favorites.some((favorite) => favorite.id === movie.id)) {
        // Add the movie to favorites if it's not already there
        favorites.push(movie)
        dispatch(addToFavorites(movie))
      }
    } else {
      // Remove the movie from favorites
      const index = favorites.findIndex((favorite) => favorite.id === movie.id)
      if (index !== -1) {
        favorites.splice(index, 1)
        dispatch(removeFromFavorites(movie))
      }
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
    setIsFavorite(event.target.checked)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Card>
      <CardContent
        sx={{
          padding: 1,
        }}
      >
        <div className={styles.movieCard}>
          {movie.poster_path ? (
            <img
              className={styles.moviePoster}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <img
              src="https://via.placeholder.com/500x750?text=No+Image"
              alt="placeholder"
            />
          )}

          <div className="movie-details">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-release-date">{releaseDate}</p>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={isFavorite} // Add this line
                    onChange={handleFavoriteChange} // Add this line
                  />
                }
                label="Add to favorites"
              />
            </FormGroup>
            <Button onClick={handleOpen}>Details</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <MovieDetails movie={movie} />
                <Button onClick={handleClose}>Close</Button>
              </Box>
            </Modal>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
