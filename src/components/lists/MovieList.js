import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetMoviesQuery, useGetGenresQuery } from '../../api/movie.api'
import { MovieGrid } from '../utils/MovieGrid'
import { Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import InfiniteScroll from 'react-infinite-scroll-component'

const colorRed = red[500]

export const MovieList = () => {
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const selectedGenreIds = useSelector((state) => state.selectedGenre.genreIds)

  const {
    data: movieData,
    isLoading: isFetchingMovies,
    isError: isErrorMovies,
  } = useGetMoviesQuery({ page, genreIds: selectedGenreIds.join(',') })

  const { data: allGenres } = useGetGenresQuery()

  useEffect(() => {
    setMovies([])
    setPage(1)
  }, [selectedGenreIds])

  useEffect(() => {
    if (movieData && movieData.results) {
      if (movieData.page === 1) {
        setMovies(movieData.results)
      } else {
        setMovies((prevMovies) => [...prevMovies, ...movieData.results])
      }
      setHasMore(movieData.page < movieData.total_pages)
    }
  }, [movieData])

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  if (isErrorMovies)
    return (
      <Typography
        component="p"
        sx={{
          color: colorRed,
        }}
      >
        Error loading data.
      </Typography>
    )
  if (isFetchingMovies && movies.length === 0)
    return <Typography component="p">Loading...</Typography>

  let selectedGenreNames = []
  if (allGenres && allGenres.genres && selectedGenreIds.length > 0) {
    selectedGenreNames = allGenres.genres
      .filter((genre) => selectedGenreIds.includes(genre.id))
      .map((genre) => genre.name)
  }

  console.log('selectedGenreIds', selectedGenreIds)
  console.log('movieData', movieData)
  console.log('movies', movies)

  return (
    <>
      {selectedGenreNames.length > 0 && (
        <Typography variant="h3" component="h2">
          Selected Genres: {selectedGenreNames.join(', ')}
        </Typography>
      )}
      <InfiniteScroll
        dataLength={movies.length}
        hasMore={hasMore}
        next={loadMore}
        loader={<Typography component="p">Loading more movies...</Typography>}
        endMessage={
          <Typography component="p" style={{ textAlign: 'center' }}>
            Yay! You have seen it all
          </Typography>
        }
      >
        <MovieGrid movies={movies} />
      </InfiniteScroll>
    </>
  )
}
