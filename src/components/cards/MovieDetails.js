import { useGetGenresQuery, useGetActorsQuery } from '../../api/movie.api'
import { mapGenreIdsToNames } from '../utils/genresUtils'
import { mapActorDataToNames } from '../utils/actorsUtils'
import { Box, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { Image } from 'mui-image'

export const MovieDetails = ({ movie }) => {
  const { data: genresData } = useGetGenresQuery()
  const { data: actorsData } = useGetActorsQuery(movie.id) // Add this line

  const genreNames = genresData
    ? mapGenreIdsToNames(movie.genre_ids, genresData.genres)
    : 'Loading...'

  const actors = actorsData ? mapActorDataToNames(actorsData) : []

  const stylesHeaderThree = {
    marginTop: '1rem',
    marginBottom: '0.5rem',
    fontSize: '1.5rem',
    fontWight: 700,
    lineHeight: 1.2,
  }

  return (
    <Box>
      <Typography variant="h3" sx={stylesHeaderThree}>
        {movie.title} ({movie.release_date.slice(0, 4)})
      </Typography>
      <Typography component="p">
        {movie.release_date ? movie.release_date : 'No release date available.'}
      </Typography>
      <Typography component="p">
        {movie.vote_average
          ? `Rating: ${movie.vote_average} / 10`
          : 'No rating available.'}
      </Typography>
      <Typography variant="h3" sx={stylesHeaderThree}>
        Genres:
      </Typography>
      <Typography>{genreNames}</Typography>
      <Typography component="h3" sx={stylesHeaderThree}>
        Overview:
      </Typography>
      <Typography variaant="p">
        {movie.overview ? movie.overview : 'No overview available.'}
      </Typography>
      {actors.length > 0 && (
        <Box>
          <Typography component="h3" sx={stylesHeaderThree}>
            Actors:
          </Typography>
          <Grid container spacing={2}>
            {actors.map(({ id, name, profile_path }, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                key={`${id}-${index}`}
              >
                <Box key={name}>
                  {profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w185${profile_path}`}
                      alt={name}
                    />
                  ) : (
                    <Image
                      src="https://via.placeholder.com/45x68?text=No+Image"
                      alt="placeholder"
                    />
                  )}
                  <Typography component="p">{name}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  )
}
