import React, { useState } from 'react'
import { useFavorites } from '../utils/useFavorites'
import { MovieDetails } from './MovieDetails'
import { Box, Card, Typography } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Favorite from '@mui/icons-material/Favorite'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Image from 'mui-image'
import CardActions from '@mui/material/CardActions'

const label = { inputProps: { 'aria-label': 'Add to favorites' } }

export const MovieCard = ({ movie }) => {
  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
  })

  const { isFavorite, handleFavoriteChange } = useFavorites(movie)

  const style = {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translate(-50%, 0)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: '70%',
    height: 'auto',
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Card
      sx={{
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <CardContent>
        {movie.poster_path ? (
          <Box
            sx={{
              marginBottom: '1rem',
            }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </Box>
        ) : (
          <Box>
            <Image
              src="https://via.placeholder.com/500x750?text=No+Image"
              alt="placeholder"
            />
          </Box>
        )}

        <Box
          sx={{
            padding: 1,
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              lineHeight: '1.2',
              letterSpacing: '0.0075em',
            }}
          >
            {movie.title}
          </Typography>
          <Typography component="p">{releaseDate}</Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={isFavorite}
                onChange={handleFavoriteChange}
              />
            }
            label="Favorite"
          />
        </FormGroup>
        <Button onClick={handleOpen}>Details</Button>
      </CardActions>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          overflowY: 'scroll',
          top: 0,
          height: '100%',
        }}
        disableScrollLock={false}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '1rem',
            }}
          >
            <Button onClick={handleClose}>Close</Button>
          </Box>
          <MovieDetails movie={movie} />
        </Box>
      </Modal>
    </Card>
  )
}
