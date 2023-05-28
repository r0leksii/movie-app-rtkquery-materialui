import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { switchToFavorites } from '../../store/viewSlice'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export const FavoritesBar = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(switchToFavorites())
  }

  return (
    <Button
      variant="contained"
      startIcon={<FavoriteBorderIcon />}
      onClick={handleClick}
    >
      My Favorite Movies
    </Button>
  )
}
