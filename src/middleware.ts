import { AnyAction, Middleware } from '@reduxjs/toolkit'
import { fetchCSV } from './action'
import { fetchCSVSuccess } from './reducer'
import { csv } from 'd3';

const middleware: Middleware = ({ dispatch }) => (next: any) => (action: AnyAction) => {
    const { type, payload } = action;
    next(action);
    if(type === fetchCSV.type) {
        csv('/Household-living-costs.csv')
            .then(res => dispatch(fetchCSVSuccess(res)));
    }
}

export default middleware;