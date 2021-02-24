import React from 'react'
import styled from 'styled-components'
import DataFilter from './DataFilter';

const Container = styled.div`
    display: grid;
    width: 100%;
    height: 1000px;
`;

const Sidebar = styled.div`
`;

const Layout = () => {
    return (
        <Container>
            <Sidebar><DataFilter /></Sidebar>
        </Container>
    )
}

export default Layout
