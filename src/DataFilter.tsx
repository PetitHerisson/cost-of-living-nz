import { useSelector } from 'react-redux'
import { RootState } from './reducer'
import { GroupType, PeopleType, YearType } from './types'

const DataFilter = () => {
    const expenditure = useSelector((state: RootState) => state.reducer)
    // If parent is unchecked, uncheck and hide its children
    const toggle = (pId: string) => (cId: string)  => {
        const parent = document.getElementById(pId) as HTMLInputElement;
        const children = document.getElementById(cId) as HTMLElement;
        if (!parent.checked) {
            children.style.display = 'none'
        }
    }

    return (
        <ul>
            {expenditure.children.map((y: YearType) => (
                <li key={y.name}>
                    <input type="checkbox" name={y.name} id={y.name}/>
                    <label htmlFor={y.name}>{y.name}</label>
                    <ul id={y.name}>
                        {y.children.map((p: PeopleType) => (
                            <li key={p.name}>
                                <input type="checkbox" name={p.name} />
                                <label htmlFor={p.name}>{p.name}</label>
                                <ul id={p.name}>
                                    {p.children.map((g: GroupType) => (
                                        <li key={g.name} >
                                            <input type="checkbox" name={g.name}/>
                                            <label htmlFor={g.name}>{g.name}</label>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )
}

export default DataFilter
