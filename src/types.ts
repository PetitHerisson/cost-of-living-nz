export interface StateType {
    name: string;
    children: YearType[];
}
export interface YearType {
    name: string;
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
    value: string
}

export interface BarChatProps{
    data: object;
}

export interface DataFilterProps{
    filterData: any;
}

export interface AutocompleteProps {
    onChange: any;
    onKeyDown: any;
    text: string;
    suggestionsList: any
}
export interface TreeCheckboxProps {
    groups: GroupType[];
    setData: any
}
export interface OptionType {
    value: string;
    label: string;
}