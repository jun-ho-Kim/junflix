import React from "react";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";
import Company from "./Tap/Company";
import Country from "./Tap/Country";
import TvSeasons from "./Tap/Seasons";
import CommingSoon from "./Tap/CommingSoon";
import VideoList from "./Tap/VideoList";

const NavContainer = styled.nav`
    margin-top: 20px;
    background-color: rgb(59, 59, 59, 0.7);
    width: 60%;
    min-width: 350px;
    height: 40px;
    min-height: 40px;
    border-top-left-radius: 10em 10em;
    border-top-right-radius: 1em 5em;
`;

const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(0.5fr, 1fr));
    grid-template-rows: repeat(2, minmax(0.5fr, 1fr));
    grid-auto-flow: column;
`;

const Item = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    margin-top: 12px;
    padding: 0 7px;
    color: ${props => (props.select ? "yellow" : "white")};
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


const ContentNav = ({pathname, id ,isMovie}) => (


<>
<NavContainer>
    <List>
        {isMovie &&
        <>
        <Item select={pathname === `/movie/${id}/company`}>
            <SLink to={`/movie/${id}/company`}>Company</SLink>
        </Item>
        <Item select={pathname === `/movie/${id}/country`}>
            <SLink to={`/movie/${id}/country`}>Country</SLink>
        </Item>
        <Item select={pathname === `/movie/${id}/credits`}>
            <SLink to={`/movie/${id}/credits`}>Cridits</SLink>
        </Item>
        <Item select={pathname === `/movie/${id}/videos`}>
            <SLink to={`/movie/${id}/videos`}>Videos</SLink>
        </Item>
        </>
        }
        {!isMovie &&
        <>
        <Item select={pathname === `/show/${id}/company`}>
            <SLink to={`/show/${id}/company`}>Company</SLink>
        </Item>
        <Item select={pathname === `/show/${id}/country`}>
            <SLink to={`/show/${id}/country`}>Country</SLink>
        </Item>
        <Item select={pathname === `/show/${id}/seasons`}>
            <SLink to={`/show/${id}/seasons`}>Seasons</SLink>
        </Item>
        <Item select={pathname === `/show/${id}/credits`}>
            <SLink to={`/show/${id}/credits`}>Cridits</SLink>
        </Item>
        <Item select={pathname === `/show/${id}/videos`}>
            <SLink to={`/show/${id}/videos`}>Videos</SLink>
        </Item>                  
        </>    
        }
    </List>

    {/* <List>
        <Item select={pathname === isMovie ? `/movie/${id}/company` :`/show/${id}/company`}>
            <SLink to={isMovie ? `/movie/${id}/company` : `/show/${id}/company`}>Company</SLink>
        </Item>
        <Item select={pathname === isMovie ? `/movie/${id}/country` : `/show/${id}/country`}>
            <SLink to={isMovie ? `/movie/${id}/country` : `/show/${id}/country`}>Country</SLink>
        </Item>
    </List> */}
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
<Route path="/movie/:id/country" component={Country} />
<Route path="/movie/:id/credits" component={CommingSoon} />
<Route path="/movie/:id/videos" component={VideoList} />

<Route path="/show/:id/company" component={Company} />
<Route path="/show/:id/country" component={Country} />
<Route path="/show/:id/seasons" component={TvSeasons} />
<Route path="/show/:id/credits" component={CommingSoon} />
<Route path="/show/:id/videos" component={VideoList} />
</>
);

export default ContentNav;