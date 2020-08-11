import React, { useState, useEffect } from 'react';
import {useLocation, useParams} from "react-router-dom";
import styled from 'styled-components';
import { moviesApi, tvApi } from "api";

const Cover = styled.div`
    width: 60%;
    /* height: 50%; */
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, 1fr);
    grid-template-rows: repeat(auto-fit, 1fr));
    gap: 8px;
    align-items: center;
    overflow-x: scroll;
    background-color: inherit;
    position: relative;
`;
const Container = styled.div`
    /* padding: 10px 10px 0px 10px; */
    /* width: 80px;
    height: 80px; */
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Name = styled.div`
    /* margin: 15px 0; */
    position: absolute;
    bottom: -5px;
    font-size: 17px;
    font-weight: 600;
`;

const CompanyLogo = styled.img`
    /* background-size: cover;
    background-position: center center; */
    width: 100px;

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
                ({data: result} = await tvApi.showDetail(id));
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
        "loading"
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