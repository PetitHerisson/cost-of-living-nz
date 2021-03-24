import { ExpenditureType, GroupStateType, GroupType, OptionType, PeopleType, YearType } from "./types";

export const years = ['2008', '2011', '2014', '2017', '2018', '2020'];
export const people = ['All households', 'Beneficiary', 'Expenditure quintile 1 (low)', 'Expenditure quintile 2', 'Expenditure quintile 3', 'Expenditure quintile 4', 'Expenditure quintile 5 (high)', 'Income quintile 1 (low)', 'Income quintile 2', 'Income quintile 3', 'Income quintile 4', 'Income quintile 5 (high)', 'Maori', 'Superannuitant']
export const groups = ['Alcohol and tobacco', 'Clothing and footwear', 'Communication', 'Contents and services', 'Education', 'Food', 'Health', 'Housing', 'Interest', 'Miscellaneous', 'Recreation and culture', 'Transport']
export const options: OptionType[] = years.map(y => ({label: y, value: y}))

export const DataGenerator = (o: OptionType[], p: PeopleType[], g: string[], e: ExpenditureType) =>{
    let finalData = {name: 'cost', children: []} as ExpenditureType;
    let y = [] as YearType[];
    // Convert option type to year type
    o.forEach(element => {
        y.push({name: element.value, children: []})
    });
    // If user does not select any year, choose all by default
    if(!y.length) {
        years.forEach(i => {
            y.push({name: i, children: []})
        });
    }
    // Add years to final data
    y.forEach(i => {
        finalData.children.push(i)
    });

    // If not people group chosen, show all by default
    if(!p.length){
        people.forEach(i => {
            p.push({name: i, children: []})
        })
    }

    if(!g.length){
        g = groups
    }

    // Add people to each year 
    finalData.children.forEach(y => {
        p.forEach(p => {
            y.children.push(p)
            g.forEach(i => {
                p.children.push({name: i, children: []})
            })
        });
    });
    console.log(finalData)
    // Add subgroup to each group
    e.children.forEach(y1 => {
        finalData.children.forEach(y2 => {
            if(y1.name === y2.name){
                y1.children.forEach(p1 => {
                    y2.children.forEach(p2 => {
                        if(p1.name === p2.name){
                            p1.children.forEach(g1 => {
                                p2.children.forEach(g2 => {
                                    if(g1.name === g2.name){
                                        g2.children = g1.children
                                    }
                                })
                            });
                        }
                    });
                });
            }
        })
    });
    return finalData;
}
