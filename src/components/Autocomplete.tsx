import React, { ChangeEvent, useContext, useState } from 'react'
import styled from 'styled-components';
import { AutocompleteProps } from '../types';
import DataContext from '../DataContext'

const Ul = styled.div`
    border: 1px solid #999;
    display: inline-block;
    width: 200px;
`;
const Li = styled.div`
    cursor: pointer;
`;
const Autocomplete = (props: AutocompleteProps) => {
    // const {onChange, onKeyDown, text, suggestionsList} = props;
    const data = useContext(DataContext);
    const { suggestions, setData } = props
    const [userInput, setUserInput] = useState({
        activeSuggestion: 0,
        filteredSuggestions: [] as string[],
        showSuggestions: false,
        text: ''
    })
    const { activeSuggestion, filteredSuggestions, showSuggestions, text } = userInput;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        const filteredSuggestions = suggestions.filter(
            suggestion => suggestion.toLowerCase().indexOf(text.toLowerCase()) !== -1
        )
        setUserInput({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            text: e.currentTarget.value
        })
    }
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // User presses enter key
        if (e.keyCode === 13) {
            setUserInput({
                ...userInput,
                activeSuggestion: 0,
                showSuggestions: false,
                text: filteredSuggestions[activeSuggestion]
            })

            setData({
                ...data,
                selectedPeople: [...data.selectedPeople, {name: filteredSuggestions[activeSuggestion], children: []}]
            })
        } else if (e.keyCode === 38) { // Up arrow
            if (activeSuggestion === 0) return;
            setUserInput({ ...userInput, activeSuggestion: activeSuggestion - 1 })
        } else if (e.keyCode === 40) { // Down arrow
            if (activeSuggestion - 1 === filteredSuggestions.length) return;
            setUserInput({ ...userInput, activeSuggestion: activeSuggestion + 1 })
        }
    }
    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        setUserInput({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            text: e.currentTarget.innerText
        })
    }
    const suggestionsList = showSuggestions && text && filteredSuggestions.length ?
        <Ul>
            {filteredSuggestions.map((suggestion, index) => (
                index === activeSuggestion ?
                    <Li key={index} onClick={onClick} style={{ background: '#FE6A6A' }}>{suggestion}</Li> : <Li key={index} onClick={onClick}>{suggestion}</Li>
            ))}
        </Ul> : <></>
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
