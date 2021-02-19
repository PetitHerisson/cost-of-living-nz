import { configureStore } from '@reduxjs/toolkit'
import reducer, { fetchCSVSuccess } from './reducer'
import middleware from './middleware'
import { fetchCSV } from './action'

const store = configureStore({
    reducer: reducer,
    middleware: [middleware],
})
store.dispatch(fetchCSV());

export default store;