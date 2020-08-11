import React from "react";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";
import Company from "./Tap/Company";
import Country from "./Tap/Country";

const NavContainer = styled.nav`
    margin-top: 20px;
    background-color: rgb(59, 59, 59, 0.7);
    width: 60%;
    height: 40px;
    border-top-left-radius: 10em 10em;
    border-top-right-radius: 1em 5em;
`;

const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

`;

const Item = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 23px;
    font-weight: 600;
    color: ${props => (props.select ? "yellow" : "white")};
    margin-top: 5px;
`;
const SLink = styled(Link)`
`;

// const NavContent = styled.div`
//     position: relative;
// `;

// const ProductionC = styled.div`
//     position: absolute;
//     top:0;
//     left: 0;
//     ${props => (props.opacity ? `#e74c3c` : 'transparent')};
// `;
// const ProductionCompany = styled.div`
//     position: absolute;
//     top:0;
//     left: 0;
//     ${props => (props.opcacity ? 'black' : 'transparent')}
// `;


const ContentNav = ({pathname, id ,production_companies, production_countries, origin_country}) => (

<>

<NavContainer>
    <List>
        <Item select={pathname === `/movie/${id}/company`}>
            <SLink to={`/movie/${id}/company`}>Company</SLink>
        </Item>
        <Item select={pathname === `/movie/${id}/country`}>
            <SLink to={`/movie/${id}/country`}>Country</SLink>
        </Item>
    </List>
    {/* <NavContent> */}
        {/* <ProductionC opacity={pathname === `/movie/${id}/company`}> */}
            {/* {production_companies &&
            production_companies.map(company => company.name)} */}
            {/* <Company 
                production_companies={production_companies}
            /> */}
        {/* </ProductionC> */}
        {/* <ProductionC opcacity={pathname === `/movie/${id}/contry`}> */}
            {/* {production_countries ?
            production_countries.map(contry => contry.name) :
            origin_country
            } */}
            {/* <Contry 
            production_countries={production_countries}
            origin_country={origin_country} 
            /> */}
        {/* </ProductionC> */}
    {/* </NavContent> */}
</NavContainer>
<Route path="/movie/:id/company" component={Company} />
<Route path="/movie/:id/country" componenet={Country} />
</>
);

export default ContentNav;