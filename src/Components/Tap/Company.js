import React, { useState, useEffect } from 'react';
import {useLocation, useParams} from "react-router-dom";
import styled from 'styled-components';
import { moviesApi, tvApi } from "api";
import TapLoader from './TapLoader';

const Cover = styled.div`
    position: relative;
    width: 60%;
    min-width: 340px;
    min-height: 130px;
    max-height: 250px;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, 1fr);
    /* grid-template-rows: repeat(auto-fit, 1fr)); */
 

    align-self: center;
    overflow-x: scroll;
    background-color: inherit;
`;
const Container = styled.div`
    margin-top: 12px;
    /* padding: 15px; */
    height: 100%;
    /* width: 80px;
    height: 80px; */
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around; */
    display: grid;
    gap: 8px;
    /* grid-template-columns: repeat(1, 1fr); */
    grid-template-rows: repeat(2, 0.6fr);
    align-items: center;
    justify-content:center;
    background-color: white;
`;

const Name = styled.div`
    /* margin-top: 15px; */
    width: 80px;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    justify-content: center;
    color: black;
`;

const CompanyLogo = styled.img`
    /* background-size: cover;
    background-position: center center; */
    margin-top: 12px;
    width: 100px;
    justify-content: center;
    align-self: center;

`;
const CompanyTap = () => {
    const [detail, setDetail] = useState({
        loading: true,
        data: null
    });


    const {pathname} = useLocation();
    const {id} = useParams();
    const isMovie = pathname.includes("/movie/");
    let result = [];


    async function getData() {
        try {
            if(isMovie) {
                ({data:result} = await moviesApi.movieDetail(id));
            } else {
                ({data:result} = await tvApi.showDetail(id));
            }
        } catch(error) {
            console.log(error);
        } finally {
            setDetail({
                loading: false,
                data: result,
            });
        }
    };

    useEffect (() => {
        getData();
    }, []);
    return detail.loading ? (
        <TapLoader />
    ) : (
        <Cover>
            {detail && detail.data.production_companies.map(company =>
            <Container>
                <CompanyLogo src={
                    company.logo_path? `https://image.tmdb.org/t/p/original${company.logo_path}`
                : require("../../assets/noPosterSmall.png")} />
            <Name>{company.name}</Name>
            </Container>
            )}                
        </Cover>
    );
};


// import React from "react";
// import styled from "styled-components";

// const ProductionC = styled.div`
//     /* position: absolute;
//     top:0;
//     left: 0; */
// `;

// const Company = ({production_companies}) => 
// <ProductionC>
// {production_companies &&
// production_companies.map(company => company.name)}
// </ProductionC>

export default CompanyTap;