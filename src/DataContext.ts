import React, { createContext } from 'react'
import { GroupType, OptionType, PeopleType, YearType } from './types';

export const data = {
    selectedYears: [] as OptionType[],
    selectedPeople: [] as PeopleType[],
    selectedGroups: [] as string[]
}
const DataContext = createContext(data);

export const DataProvider = DataContext.Provider
export const DataConsumer = DataContext.Consumer

export default DataContext