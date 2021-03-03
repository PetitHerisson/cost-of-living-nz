import { useSelector } from 'react-redux'
import { RootState } from '../reducer'
import { DataFilterProps, ExpenditureType, GroupStateType, GroupType, OptionType, PeopleType, SubgroupType, YearType } from '../types'
import Autocomplete from './Autocomplete'
import styled from 'styled-components';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import TreeCheckbox from './TreeCheckbox';
import { useEffect, useState } from 'react';
import { DataProvider } from '../DataContext'
import { people, options, DataGenerator } from '../data'

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
const Button = styled.div`
    border: 1px solid #42C6C7;
    text-align: center;
    width: 180px;
    color: #42C6C7;
    padding: 5px;
    margin-left: 30px;
    &:hover {
        background: #FE6A6A;
        color: #ccc;
        border: 1px solid #ccc;
        cursor: pointer
    }
`;

const DataFilter = (props: DataFilterProps) => {
    const expenditure = useSelector((state: RootState) => state.reducer)
    const { filterData } = props
    
    useEffect(() => {
        filterData(expenditure);
    }, [])
    const [data, setData] = useState({
        selectedYears: [] as OptionType[],
        selectedPeople: [] as PeopleType[],
        selectedGroups: [] as string[]
    })

    const handleSelect = (selectedYears: any) => {
        setData({
            ...data,
            selectedYears
        })
    }
    let groups = [] as GroupType[]
    let initialState = [] as GroupStateType[];
    expenditure.children.forEach(y => {
        if (y.name === '2008') {
            y.children.forEach(p => {
                if (p.name === 'Maori') {
                    groups = p.children
                }
            });
        }
    });
    groups.forEach(g => {
        initialState.push({
            name: g.name,
            checked: false,
            children: []
        })
        g.children.forEach(s => {
            initialState.forEach(i => {
                if (g.name === i.name) {
                    i.children.push({
                        name: s.name,
                        checked: false
                    })
                }
            })
        });
    });
    const getData = () => {
        const finalData = DataGenerator(data.selectedYears, data.selectedPeople, data.selectedGroups, expenditure)
        setData({
            selectedYears: [],
            selectedPeople: [],
            selectedGroups: []
        })
        console.log(finalData)
        filterData(finalData)
    }
    return (
        <DataProvider value={data}>
            <>
                <Label>Year:</Label>
                <Select
                    closeMenuOnSelect={false}
                    components={makeAnimated()}
                    isMulti
                    options={options}
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
                    setData={setData}
                    suggestions={people.sort()}
                /><br />
                <Label>Expenditure Group: </Label>
                <TreeCheckbox initialState={initialState} setData={setData} />
                <Button onClick={getData}>View Data Visualization</Button>
            </>
        </DataProvider>
    )
}

export default DataFilter
