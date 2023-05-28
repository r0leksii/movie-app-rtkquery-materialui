import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { switchToFavorites } from '../../store/viewSlice'

export const FavoritesBar = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(switchToFavorites())
  }

  return <Button onClick={handleClick}>My Favorite Movies</Button>
}
