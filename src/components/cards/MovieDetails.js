import { useGetGenresQuery, useGetActorsQuery } from '../../api/movie.api'
import { mapGenreIdsToNames } from '../utils/genresUtils'
import { mapActorDataToNames } from '../utils/actorsUtils'
import { Box } from '@mui/material'
import { Grid } from '@mui/material'

export const MovieDetails = ({ movie }) => {
  const { data: genresData } = useGetGenresQuery()
  const { data: actorsData } = useGetActorsQuery(movie.id) // Add this line

  const genreNames = genresData
    ? mapGenreIdsToNames(movie.genre_ids, genresData.genres)
    : 'Loading...'

  const actors = actorsData ? mapActorDataToNames(actorsData) : []

  return (
    <Box>
      <h2>Genres</h2>
      <p className="movie-genres">{genreNames}</p>
      {actors.length > 0 && (
        <div className="movie-actors">
          <h2>Actors</h2>
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
                <div key={name} className="actor-details">
                  {profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w45${profile_path}`}
                      alt={name}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/45x68?text=No+Image"
                      alt="placeholder"
                    />
                  )}
                  <p>{name}</p>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Box>
  )
}
