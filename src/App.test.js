// App.test.js
import { render, screen } from '@testing-library/react'
import { useGetMoviesQuery } from './movie.api'
import App from './App'

jest.mock('./movie.api')

test('renders MovieList component with mocked data', () => {
  useGetMoviesQuery.mockReturnValue({
    data: {
      results: [
        {
          id: 1,
          title: 'Test Movie 1',
          overview: 'Test overview 1',
          release_date: '2022-01-01',
        },
        {
          id: 2,
          title: 'Test Movie 2',
          overview: 'Test overview 2',
          release_date: '2022-01-02',
        },
      ],
      total_pages: 1,
    },
    isFetching: false,
    isError: false,
  })

  render(<App />)

  // Check that the mocked movies are being rendered
  const movie1Element = screen.getByText('Test Movie 1')
  const movie2Element = screen.getByText('Test Movie 2')
  expect(movie1Element).toBeInTheDocument()
  expect(movie2Element).toBeInTheDocument()
})
