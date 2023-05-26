export function mapGenreIdsToNames(genreIds, genres) {
  return genreIds
    .map((id) => {
      const genre = genres.find((g) => g.id === id)
      return genre ? genre.name : 'Unknown Genre'
    })
    .join(', ')
}
