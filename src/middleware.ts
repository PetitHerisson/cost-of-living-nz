import { AnyAction, Middleware } from '@reduxjs/toolkit'
import { fetchJSON } from './action'
import { fetchJSONSuccess } from './reducer'
import { json } from 'd3';

const middleware: Middleware = ({ dispatch }) => (next: any) => (action: AnyAction) => {
    const { type, payload } = action;
    next(action);
    if(type === fetchJSON.type) {
        json('cost-of-living.json')
            .then(res => dispatch(fetchJSONSuccess(res)));
    }
}

export default middleware;