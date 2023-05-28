import { SearchBar } from '../common/SearchBar'
import { GenresBar } from '../common/GenresBar'
import { FavoritesBar } from '../common/FavoritesBar'

export const Header = () => {
  return (
    <header>
      <SearchBar />
      <FavoritesBar />
      <GenresBar />
    </header>
  )
}
