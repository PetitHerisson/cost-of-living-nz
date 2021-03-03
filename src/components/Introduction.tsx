import React from 'react'
import styled from 'styled-components';

const Capital = styled.span`
    display: block;
    float: left;
    font-size: 7rem;
    margin-right: 20px;
    line-height: 1;
    margin-left: 50px;
`;
const Bold = styled.span`
    float: right;
    margin-right: 100px;
    font-style: bold;
    font-size: 2em;
`;
const Introduction = () => {
    return (
        <div style={{width: '1000px'}}> 
            <p style={{lineHeight: 1.8}}>
            <Capital>H</Capital>ousehold living-costs price indexes (HLPIs) provide new insights into the inflation experienced by 13 different household groups: beneficiaries, Māori, income quintiles (five groups), expenditure quintiles (five groups), and superannuitants. <br />
            <Bold>stats.govt.nz</Bold>
            </p>
        </div>
    )
}

export default Introduction
