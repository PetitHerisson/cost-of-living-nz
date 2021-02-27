import { useSelector } from 'react-redux'
import { RootState } from '../reducer'
import { DataFilterProps, GroupType, OptionType, YearType } from '../types'
import Autocomplete from './Autocomplete'
import styled from 'styled-components';
import Layout from './Layout';
import Select, { ValueType } from 'react-select'
import makeAnimated from 'react-select/animated'
import TreeCheckbox from './TreeCheckbox';
import { ChangeEvent, createRef, useState } from 'react';

const Label = styled.label`
    color: #42C6C7;
`;
const styles = {
    menu: (provided: any) => ({
        ...provided,
        width: '250px',
        padding: 0
    }),
    control: (provided: any) => ({
        ...provided,
        width: '250px',
        padding: 0
    })
}
const Container = styled.div`
    margin: 1em;

`;
const Button = styled.button`
    outline: none;
    // border: none;
    color: #42C6C7;
    width: 150px;
    font-size: 16px;
    border-radius: 10px;
    background: transparent;
    transition: 0.5s;
    &:hover {
        box-shadow: 0 0 0 1em #FE6A6A inset;
        border: 3px solid #42C6C7;
        cursor: pointer;
    }
`;
const Ul = styled.div`
    border: 1px solid #999;
    display: inline-block;
    width: 200px;
`;
const Li = styled.div`
    cursor: pointer;
`;
const DataFilter = (props: DataFilterProps) => {
    const expenditure = useSelector((state: RootState) => state.reducer)
    const { filterData } = props
    let years: string[] = [];
    let people: string[] = [];
    let groups: GroupType[] = [];
    let options: OptionType[] = []

    expenditure.children.forEach(y => {
        years.push(y.name);
        y.children.forEach(p => {
            if (people.indexOf(p.name) === -1) {
                people.push(p.name);
            }
        })
        if(y.name === '2008'){
            y.children.forEach(p => {
                if(p.name === 'Superannuitant'){
                    groups = p.children
                }
            });
        }
    });

    years.forEach(y => {
        options.push({
            value: y,
            label: y
        })
    });
    const [data, setData] = useState({
        selectedYears: [],
        selectedPeople: [],
        selectedGroup: ''
    })

    const handleSelect = (selectedYears: any) => {
        setData({
            ...data,
            selectedYears,
        })
    }

    const handleSubmit = () => {
        filterData(expenditure);
    }
    const  suggestions  = people.sort();
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
        setData({
            ...data,
            selectedGroup: text
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
        <Container>
            <Label>Year:</Label>
            <Select 
                closeMenuOnSelect={false}
                components={makeAnimated()}
                isMulti
                options={options}
                width='20px'
                styles={styles}
                onChange={handleSelect}
                value={data.selectedYears}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        primary25: '#FE6A6A',
                        primary: 'white',
                    }
                })}
            /><br />
            <Label>Household Group: </Label>
            <Autocomplete 
                onChange={onChange}
                onKeyDown={onKeyDown}
                text={text}
                suggestionsList={suggestionsList}
            /><br />
            <Label>Expenditure Group: </Label>
            <TreeCheckbox groups={groups} setData={setData}/>
            <Button onClick={handleSubmit}>Confirm</Button>
        </Container>
    )
}

export default DataFilter
