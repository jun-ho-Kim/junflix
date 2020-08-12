import React,{useState, useEffect} from "react";
import {useHistory, useParams, useLocation} from "react-router-dom";
import styled from "styled-components";
import { moviesApi, tvApi } from "api";
import TapLoader from "./TapLoader";

const Cover = styled.div`
    width: 60%;
   /* display: flex; */
    display: grid;
    /* flex-direction: column; */
    justify-content: space-around;
    /* align-items: center; */
    /* height: 50%; */
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, 1fr); */
    /* grid-template-rows: repeat(2, 1fr));
    /* gap: 8px;
    align-items: center;
    overflow-x: scroll;
    background-color: inherit;
    position: relative; */
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Name = styled.div`
    font-size: 22px;
    font-weight: 600;
`;

const CountryFlagImage = styled.img`
    /* margin-left: 40%; */
    margin-top: 15px;
`;

const CountryTap = () => {
    const [detail, setDetail] = useState({
        loading: true,
        data: null
    });
    const {id} = useParams();
    const {pathname} = useLocation();
    const isMovie = pathname.includes("/movie/");
    let result = [];
    async function getData() {
    try {
        if(isMovie) {
            ({data:result} = await moviesApi.movieDetail(id));
        } else {
            ({data:result} = await tvApi.showDetail(id)); 
        }
    } catch(error){
        console.log(error);
    } finally {
        setDetail({
            loading: false,
            data: result
        })
        };
    };
    useEffect(() => {
        getData();
    },[]);
    return detail.loading ? <TapLoader /> : (
        <Cover>
            {console.log("id",id)}
            {isMovie && detail.data.production_countries.map(country =>(
            <Container>
                <CountryFlagImage src={`https://www.countryflags.io/${country.iso_3166_1}/flat/64.png`} />
                <Name>{country.name}</Name>
            </Container>
            ))}
            {!isMovie && 
            <Container>            
            <CountryFlagImage src={`https://www.countryflags.io/${detail.data.origin_country}/flat/64.png`} />
            <Name>{detail.data.origin_country}</Name>
            </Container>  
            }            
        </Cover>
    )
};
export default CountryTap;
