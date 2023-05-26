import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetMoviesQuery } from '../../api/movie.api'
import { MovieCard } from '../cards/MovieCard'
import { Grid } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'

export const MovieList = () => {
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const selectedGenreId = useSelector((state) => state.selectedGenre.genreId)

  const {
    data: movieData,
    isLoading: isFetchingMovies,
    isError: isErrorMovies,
  } = useGetMoviesQuery(page)

  useEffect(() => {
    if (movieData && movieData.results) {
      setMovies((prevMovies) => [...prevMovies, ...movieData.results])
      setHasMore(movieData.page < movieData.total_pages)
    }
  }, [movieData])

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const displayedMovies = selectedGenreId
    ? movies.filter((movie) => movie.genre_ids.includes(selectedGenreId))
    : movies

  if (isErrorMovies) return <div>Error loading data.</div>
  if (!displayedMovies.length && isFetchingMovies) return <div>Loading...</div>

  return (
    <>
      <InfiniteScroll
        dataLength={displayedMovies.length}
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
          {displayedMovies.map((movie, index) => (
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
