// SearchBar.js
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchTerm, clearSearchTerm } from '../../store/searchSlice'
import { Input } from '@mui/material'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export const SearchBar = () => {
  const dispatch = useDispatch()
  const [localTerm, setLocalTerm] = useState('')

  const handleChange = (event) => {
    setLocalTerm(event.target.value)
    if (event.target.value === '') {
      dispatch(clearSearchTerm())
    }
  }

  const handleSearch = () => {
    dispatch(setSearchTerm(localTerm))
  }

  const handleClear = () => {
    setLocalTerm('')
    dispatch(clearSearchTerm())
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <Input
        type="text"
        value={localTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Search movies..."
      />
      <Button variant="contained" onClick={handleSearch} disabled={!localTerm}>
        Search Movie
      </Button>
      <Button variant="outlined" onClick={handleClear} disabled={!localTerm}>
        Clear
      </Button>
    </Box>
  )
}
