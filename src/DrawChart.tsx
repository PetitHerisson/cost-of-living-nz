import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './reducer';
import { Item } from './types'

const DrawChart= () => {
    const list = useSelector<RootState, Item[]>(state => state.reducer.list);
    console.log(list);
    return (
        <div>
            {list[0].hlpi_name}
            {list[1].hlpi_name}
        </div>
    )
}

export default DrawChart
