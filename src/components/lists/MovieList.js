import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetMoviesQuery, useGetGenresQuery } from '../../api/movie.api'
import { MovieCard } from '../cards/MovieCard'
import { Grid } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'

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

  if (isErrorMovies) return <div>Error loading data.</div>
  if (isFetchingMovies && movies.length === 0) return <div>Loading...</div>

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
        <h2>Selected Genres: {selectedGenreNames.join(', ')}</h2>
      )}
      <InfiniteScroll
        dataLength={movies.length}
        hasMore={hasMore}
        next={loadMore}
        loader={<h4>Loading more movies...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Grid container spacing={2}>
          {movies.map((movie, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              key={`${movie.id}-${index}`}
            >
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  )
}
