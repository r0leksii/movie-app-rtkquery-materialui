import { SearchBar } from '../common/SearchBar'
import { GenresBar } from '../common/GenresBar'
import { FavoritesBar } from '../common/FavoritesBar'
import { Box, Button } from '@mui/material'

export const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <Button variant="contained" href="/">
          Home
        </Button>
        <SearchBar />
        <FavoritesBar />
      </Box>
      <GenresBar />
    </Box>
  )
}
