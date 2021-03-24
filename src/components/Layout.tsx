import React, { useState } from 'react'
import styled from 'styled-components'
import BarChart from './BarChart';
import DataFilter from './DataFilter';
import Introduction from './Introduction';
import { JSONProvider } from '../JSONContext'
import JSON from '../cost-of-living';


const Container = styled.div`
    margin: 1em;
    display: grid;
    grid-template-rows: 250px 75%;
    grid-template-columns: 300px 70%;
    grid-template-areas: "header header" "sidebar main";
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
        <JSONProvider value={JSON}>
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
        </JSONProvider>
    )
}

export default Layout
