export interface Item {
    name: string;
    parent?: string;
    checked: boolean;
    children: Item[];
}

export interface ValueType {
    name: string;
    value: number;
}

export interface ExpenditureType {
    name: string;
    children: YearType[];
}

export interface YearType {
    name: number;
    children: PeopleType[];
}

export interface PeopleType {
    name: string;
    children: GroupType[];
}

export interface GroupType {
    name: string;
    children: SubgroupType[];
}

export interface SubgroupType {
    name: string;
    value: number
}

export interface BarChatProps {
    data: object;
}

export interface DataFilterProps {
    filterData: any;
}

export interface AutocompleteProps {
    suggestions: string[];
    setData: any;
}

export interface TreeCheckboxProps {
    selectGroups: any;
    groups: GroupType[];
}

export interface OptionType {
    value: string;
    label: string;
}

export interface DataType {
    selectedYears: OptionType[];
    selectedPeople: OptionType[];
    selectedGroups: GroupType[];
}