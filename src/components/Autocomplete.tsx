import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components';
import { AutocompleteProps } from '../types';

const Autocomplete = (props: AutocompleteProps) => {
    const {onChange, onKeyDown, text, suggestionsList} = props;

    return (
        <div>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={text}
                style={{ width: '245px', border: '1px solid #ccc', height: '30px', borderRadius: '4px' }}
            /><br />
            {suggestionsList}
        </div>
    )
}

export default Autocomplete
