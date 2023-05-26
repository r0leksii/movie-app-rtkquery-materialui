import React, { useEffect, useState } from 'react'
import { useGetMoviesQuery } from '../../api/movie.api'
import { MovieCard } from '../cards/MovieCard'
import { Grid } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'

export const MovieList = () => {
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])

  const [hasMore, setHasMore] = useState(true)

  const {
    data: movieData = {},
    isFetching: isFetchingMovies,
    isError: isErrorMovies,
    refetch: fetchMoreMovies,
  } = useGetMoviesQuery(page)

  useEffect(() => {
    if (movieData.results) {
      setMovies((prevMovies) => [...prevMovies, ...movieData.results])

      setHasMore(movieData.results.length > 0)
    }
  }, [movieData])

  const loadMore = () => {
    if (!isFetchingMovies) {
      fetchMoreMovies()
      setPage(page + 1)
    }
  }

  if (isErrorMovies) return <div>Error loading data.</div>
  if (!movieData.results && isFetchingMovies) return <div>Loading...</div>

  return (
    <>
      <InfiniteScroll
        dataLength={movies.length}
        hasMore={hasMore}
        next={loadMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Grid container spacing={2}>
          {movies.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  )
}
