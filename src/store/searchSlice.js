import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  term: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.term = action.payload
    },
    clearSearchTerm: (state) => {
      state.term = ''
    },
  },
})

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions

export const searchReducer = searchSlice.reducer
