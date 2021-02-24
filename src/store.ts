import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import middleware from './middleware'
import { fetchJSON } from './action'

const store = configureStore({
    reducer: reducer,
    middleware: [middleware],
})
store.dispatch(fetchJSON());

export default store;