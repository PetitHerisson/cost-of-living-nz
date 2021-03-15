import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components';
import '../app.css'
import { Item, GroupType, SubgroupType, TreeCheckboxProps } from '../types';

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
    const { groups, selectGroups } = props;

    let groupCheckbox: Item[] = [];
    groups.forEach(g => {
        groupCheckbox.push({ name: g.name, children: [], checked: false });
        g.children.forEach(s => {
            groupCheckbox.forEach(i => {
                if (i.name === g.name) {
                    i.children.push({ name: s.name, children: [], checked: false, parent: g.name })
                }
            })
        })
    });
    const itemMap = new Map();
    const flattenObj = (item: Item) => {
        const { children } = item;
        itemMap.set(item.name, item);
        children.forEach(flattenObj);
    }
    flattenObj({ name: 'groups', children: groupCheckbox, checked: false });
    itemMap.delete('groups');
    const [items, setItems] = useState(itemMap);

    const nodeArray = (selector: string, parent = document as unknown as Element) => [].slice.call(parent.querySelectorAll<HTMLInputElement>(selector)) as HTMLInputElement[];
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let check = e.target as HTMLInputElement;
        const isChecked = check.checked;
        //	check/unchek children (includes check itself)
        const children = nodeArray('input', check.parentNode as Element);
        children.forEach(child => child.checked = check.checked);
        const item = items.get(check.name)
        setItems(prevItems => {
            prevItems.set(item.name, { ...item, checked: isChecked });
            item.children.forEach((child: Item) => {
                prevItems.set(child.name, { ...child, checked: isChecked })
            })
            return prevItems;
        })

        // Get selected groups and subgroups
        let selectedGroups = [] as GroupType[];
        groups.forEach(g => {
            if (items.get(g.name).checked === true) {
                selectedGroups.push({ name: g.name, children: g.children });
            } else {
                let subgroups = [] as SubgroupType[];
                g.children.forEach(s => {
                    if (items.get(s.name).checked === true) {
                        subgroups.push({ name: s.name, value: 0 })
                    }
                });

                if (subgroups.length !== 0) {
                    selectedGroups.push({ name: g.name, children: subgroups });
                }
            }
        });

        // Set selectedGroups in data
        selectGroups(selectedGroups);

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
            {groupCheckbox.map((i, index: number) => (
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
