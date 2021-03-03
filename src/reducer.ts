import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit'
import { ExpenditureType, YearType } from './types';

const initialState: ExpenditureType = {
    name: 'cost',
    children: [] as YearType[]
};

export const fetchJSONSuccess = createAction<any>('fetchJSONSuccess');

const reducer = createReducer(initialState, {
    [fetchJSONSuccess.type]: (state, action) => {
        state.children = action.payload.children;
        // Order children by year
        state.children.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    }
})

const rootReducer = combineReducers({
    reducer: reducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;