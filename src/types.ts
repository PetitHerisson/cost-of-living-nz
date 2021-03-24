export interface ExpenditureType {
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
    setData: any;
    initialState: GroupStateType[];
}
export interface OptionType {
    value: string;
    label: string;
}
export interface GroupStateType {
    name: string;
    checked: boolean;
    children: SubGroupType[]
}
export interface SubGroupType {
    name: string;
    checked: boolean;
}