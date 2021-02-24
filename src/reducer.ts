import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit'
import { StateType } from './types';

const initialState: StateType = {
    name: 'cost',
    children: []
};

export const fetchJSONSuccess = createAction<any>('fetchJSONSuccess');

const reducer = createReducer(initialState, {
    [fetchJSONSuccess.type]: (state, action) => {
        state.children = action.payload.children;  
        // Order children by year
        state.children.sort((a, b) => (a.name > b.name) ? 1:((b.name > a.name)? -1:0))     
    }
})

const rootReducer = combineReducers({
    reducer: reducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;