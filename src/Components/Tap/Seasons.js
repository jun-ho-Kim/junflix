import React, {useState, useEffect} from "react";
import {useHistory, useParams, useLocation, Link} from "react-router-dom";
import PropsTypes from "prop-types";
import styled from "styled-components";
import { tvApi } from "../../api";
import TapLoader from "./TapLoader";

const Container = styled.div`
    width: 60%;
    height: 50%;
    display:grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: repeat(auto-fill,1fr);
    grid-auto-flow: row;
    overflow-y: scroll;
    justify-content: center;
`;

const SeansonNumber = styled.span`
`;
const AirDate = styled.h5`
`;
const EpisodeCount = styled.span`
`;
const Overview = styled.p`
`;

const PosterContainer = styled.div`
    /* height: 100%;
    display: flex;
    align-items: center; */
`;

const PosterLink = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0px;
`;
const Poster = styled.img`
    width: 130px;
    height: 100%;
    /* background-image: URL(${props => props.src}); */
`;

const Name = styled.h3`
    width: 60%;
    text-align:center;
    margin-top: 7px;
    font-size: 15px;
    font-weight: 600;
`;

const Year = styled.h3`
    margin-top: 7px;
    opacity: 0.7;
`;


const TvSeasons = ({}) => { 
    const [detail, setDetail] = useState({
        loading: true,
        data: []
    });
    const {id} = useParams();
    const {pathname} = useLocation();
    let result = null;
    async function getData() {
        try {
            ({data:result} = await tvApi.showDetail(id));
        } catch(error) {
            console.log(error);
        } finally {
            setDetail({
                loading: false,
                data: result
            })
        }
    }
    useEffect(() => {
        getData();
    }, []);

    return detail.loading ? <TapLoader /> : (
        <Container>
            {console.log("season:", detail.data.seasons)}
            {detail.data.seasons && detail.data.seasons.map((season,index) =>
            <PosterLink to={`/show/${season.id}`}> 
                <PosterContainer>
                <Poster src={season.poster_path ? 
                `https://image.tmdb.org/t/p/original${season.poster_path}` :
                require("../../assets/noPosterSmall.png")} />
                </PosterContainer>                
                <Name>{`${index+1}.`}{" "}
                {season.name && season.name.length > 26 ?
                `${season.name.substring(0,25)}...` :
                season.name}</Name>
                {season.air_date &&
                <Year>{season.air_date.substring(0,4)}</Year>
                }
                </PosterLink>
            )}
        </Container>
    );
}

export default TvSeasons;