export interface d3Node {
    id: string,
    group: number
}
export interface d3Link {
    source: string,
    target: string,
    value: number
}
export interface Graph {
    nodes: d3Node[],
    links: d3Link[]
}
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

