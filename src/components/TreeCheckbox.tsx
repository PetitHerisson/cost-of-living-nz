import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import '../app.css'
import { GroupStateType, GroupType, SubgroupType, TreeCheckboxProps } from '../types';
import DataContext from '../DataContext'


const Ul = styled.ul`
    list-style: none;
`;
const Button = styled.span`
    border-radius: 5px;
    background: transparent;
    color: #FE6A6A;
    padding: 0 5px;
    margin-right: 5px;
    text-align: center;
    outline: none;
    border: 2px solid #42C6C7;
    cursor: pointer;
`;
const TreeCheckbox = (props: TreeCheckboxProps) => {
    const data = useContext(DataContext);
    const { initialState, setData } = props;
    const nodeArray = (selector: string, parent = document as unknown as Element) => [].slice.call(parent.querySelectorAll<HTMLInputElement>(selector)) as HTMLInputElement[];
    
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let check = e.target as HTMLInputElement;

        // Set local state
        initialState.forEach(i => {
            if (i.name === check.name) {
                i.checked = check.checked
                // Check all children if parent is checked
                i.children.forEach(j => {
                    j.checked = check.checked
                });
            }
            i.children.forEach(j => {
                if (j.name === check.name) {
                    j.checked = check.checked
                    // Check parent if any of the children is checked
                    if (check.checked) {
                        i.checked = true;
                    }
                }
            });
        });

        // Set filtered data
        initialState.forEach(g => {
            let index = data.selectedGroups.indexOf(g.name)
            if (g.checked === true && index === -1) {
                data.selectedGroups.push(g.name)
                setData(data)
            }
        });

        //	check/unchek children (includes check itself)
        const children = nodeArray('input', check.parentNode as Element);
        children.forEach(child => child.checked = check.checked);

        //	traverse up from target check
        while (check) {

            //	find parent and sibling checkboxes (quick'n'dirty)
            const ulElement = check.closest('ul') as Element;
            const ulParent = ulElement?.parentNode as ParentNode;
            const parent = ulParent?.querySelector('input') as HTMLInputElement & ParentNode;

            const liElement = parent?.closest('li') as Element;
            const siblings = nodeArray('input', liElement?.querySelector<Element>('ul') as unknown as Element);

            //	get checked state of siblings
            //	are every or some siblings checked (using Boolean as test function) 
            const checkStatus = siblings.map(check => check.checked);
            const every = checkStatus.every(Boolean);
            const some = checkStatus.some(Boolean);

            //	check parent if all siblings are checked
            //	set indeterminate if not all and not none are checked
            if (parent) {
                parent.checked = every;
                parent.indeterminate = !every && every !== some;
            }

            //	prepare for nex loop
            // check = check != parent ? parent : 0;
            if (check != parent) {
                check = parent
            }
        }
    }
    const toggle = (id: string) => {
        const subgroup = document.getElementById(id) as Element;
        const button = document.getElementById(id + 1) as Element;

        if (subgroup.className === 'visible') {
            subgroup.className = 'hidden';
            button.innerHTML = '+';
        } else {
            subgroup.className = 'visible';
            button.innerHTML = '-';
        }
    }

    return (
        <Ul>
            {initialState.map((i, index: number) => (
                <li key={index}>
                    <Button onClick={() => toggle(i.name)} id={i.name + 1}>+</Button>
                    <input type="checkbox" name={i.name} onChange={onChange} />
                    <label htmlFor={i.name}>{i.name}</label>
                    <Ul id={i.name} className='hidden'>
                        {i.children.map((j, index: number) => (
                            <li key={index}>
                                <input type="checkbox" name={j.name} id={j.name} onChange={onChange} />
                                <label htmlFor={j.name}>{j.name}</label>
                            </li>
                        ))}
                    </Ul>
                </li>
            ))}
        </Ul>
    )
}

export default TreeCheckbox
