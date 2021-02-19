import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit'
import { Item, StateType } from './types'
import { DSVRowString } from 'd3'

const initialState: StateType = {
    list: [],
    errorMessage: ''
};

export const fetchCSVSuccess = createAction<DSVRowString[]>('fetchCSVSuccess');

const reducer = createReducer(initialState, {
    [fetchCSVSuccess.type]: (state, action) => {
        state.list = action.payload;
    }
})

const rootReducer = combineReducers({
    reducer: reducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;