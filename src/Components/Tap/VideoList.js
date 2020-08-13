import React, {useState, useEffect} from "react";
import {useHistory, useLocation, useParams, Link} from "react-router-dom";
import styled from "styled-components";
import { moviesApi, tvApi } from "../../api";
import TapLoader from "./TapLoader";

const Container = styled.div`
    width: 60%;
    min-width: 350px;
    min-height: 130px;
    max-height: 250px;
    margin-top: 12px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    /* height: 100%; */
    /* display: flex;
    justify-content: center;
    align-items: center; */
`
const VideoLink = styled.a`
`;

const VideoName  = styled.h3`
    margin-top: 7px;
    font-size: 12px;
    font-weight: 600;
    width: 75%;
    text-align: center;
`;
const VideoBox = styled.div`
    padding-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const VideoIcon = styled.img`
    width: 40px;
`;

const VideoList = () => {
    const [detail, setDetail] = useState({
        loading: true,
        data: []
    });
    const {id} = useParams();
    const {pathname} = useLocation();
    const isMovie = pathname.includes("/movie/");
    let result = null;
    async function getData() {
        try {
            if(isMovie) {
                ({data:result} = await moviesApi.movieDetail(id));
            } else {
                ({data:result} = await tvApi.showDetail(id));
            }// setDetail({data:result});
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
    },[]);

    return detail.loading ? <TapLoader /> : (
        <Container>
            {detail.data.videos.results &&
            detail.data.videos.results.map(video => (
            <VideoBox>
                <VideoLink 
                    href={`https://www.youtube.com/watch?v=${video.key}`}
                >
                    <VideoIcon src={require("../../assets/youtube.png")} />
                </VideoLink>
                <VideoName>{video.name.length >37 ? `${video.name.substring(0,36)}...` : video.name}</VideoName>
            </VideoBox>
                ))}
        </Container>
    )
}


export default VideoList;