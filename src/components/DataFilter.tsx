import { DataFilterProps, GroupType, OptionType } from '../types'
import styled from 'styled-components';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import TreeCheckbox from './TreeCheckbox';
import { useContext, useEffect, useState } from 'react';
import { options, dataGenerator, peopleOptions, groups } from '../data'
import JSONContext from '../JSONContext';

const Label = styled.label`
    color: #42C6C7;
`;
export const styles = {
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

const DataFilter = (props: DataFilterProps) => {
    const { filterData } = props
    const cost = useContext(JSONContext);

    const [data, setData] = useState({
        selectedYears: [] as OptionType[],
        selectedPeople: [] as OptionType[],
        selectedGroups: [] as GroupType[]
    })
    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        filterData(dataGenerator(data));
    }, [data])
    const loadAnimation = () => {
        setTimeout(() => {
            setDisabled(false);  
        }, 1200)
    }
    const selectYears = (selectedYears: any) => {
        setDisabled(true)
        setData({
            ...data,
            selectedYears
        });
        loadAnimation()
    }
    const selectGroups = (selectedGroups: GroupType[]) => {
        setDisabled(true)
        setData({
            ...data,
            selectedGroups
        })
        loadAnimation()
    }
    const selectPeople = (selectedPeople: any) => {
        setDisabled(true)
        setData({
            ...data,
            selectedPeople
        })
        loadAnimation()
    }

    return (
        <>
            <Label>Year:</Label>
            <Select
                closeMenuOnSelect={false}
                components={makeAnimated()}
                isMulti
                options={options}
                isDisabled={disabled}
                styles={styles}
                onChange={selectYears}
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
            <Select
                closeMenuOnSelect={false}
                components={makeAnimated()}
                isMulti
                options={peopleOptions}
                isDisabled={disabled}
                styles={styles}
                onChange={selectPeople}
                value={data.selectedPeople}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        primary25: '#FE6A6A',
                        primary: 'white',
                    }
                })}
            /><br />
            <Label>Expenditure Group: </Label>
            <TreeCheckbox groups={groups} selectGroups={selectGroups} disabled={disabled}/>
        </>
    )
}

export default DataFilter
