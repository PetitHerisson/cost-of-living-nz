import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { RootState } from '../reducer';
import { ExpenditureType } from '../types';
import BarChart from './BarChart';
import DataFilter from './DataFilter';
import Introduction from './Introduction';

const Container = styled.div`
    margin: 1em;
    display: grid;
    grid-template-rows: 250px 75%;
    grid-template-columns: 300px 60% 150px;
    grid-template-areas: "header header header" "sidebar main empty";
    justify-content: center;
`;
const Header = styled.div`
    grid-area: header;
    margin: 1em;
    & > h2 {
        color: #42C6C7;
        text-align: center;
    }
`;
const Sidebar = styled.div`
    grid-area: sidebar;
`;
const Main = styled.div`
    grid-area: main;
`;
const Layout = () => {
    const [data, filterData] = useState([])

    return (
        <Container>
            <Header>
                <h2>Household Living-costs Price Indexes</h2>
                <Introduction />
            </Header>
            <Sidebar>
                <DataFilter filterData={filterData} />
            </Sidebar>
            <Main>
                <BarChart data={data} />
            </Main>
        </Container>
    )
}

export default Layout
