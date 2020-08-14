import React, {useState, useEffect} from "react";
import {useLocation, useHistory, useParams} from "react-router-dom";
import styled from "styled-components";
import { moviesApi, tvApi } from "../../api";
import TapLoader from "./TapLoader";

const Container = styled.div`
    width: 60%;
    min-width: 350px;
    min-height: 130px;
    max-height: 250px;
    /* height: 100%; */
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-columns: repeat(auto-fill, 1fr);
    overflow-y: scroll;
`;
const DirectorContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const DirectorBox = styled.div`
`;

const DirectorTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-weight: 700;
    text-align: center;
`;

const DirectorName = styled.div`
    margin: 6px 0;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
`;

const DirectorPhoto = styled.img`
    width: 120px;
    height: 100%;
`;

const Divided = styled.h3`
    margin: 12px 0 27px 5px;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    line-height: 1.5;
`;

const CastBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

const CastPhotoBox = styled.div`
`;
const CastPhoto = styled.img`
    width: 120px;
    height: 100%;
`;
const CastCharacter = styled.span`
    margin: 6px 0;
    font-size: 13px;
    font-weight: 600;
    font-style: italic;
`;

const CastName = styled.h4`
    font-size: 11px;
    margin-bottom: 7px;
`;


const Credits = () => {
    const [detail, setDetail] = useState({
        loading: true,
        data: []
    });
    const {pathname} = useLocation();
    const {id} = useParams();
    const isMovie = pathname.includes("/movie/");
    let result = null;
    async function getData() {
        try {
            if(isMovie) {
                ({data: result} = await moviesApi.credits(id));
            } else {
                ({data: result} = await tvApi.credits(id));
            }
            setDetail({data:result});
        } catch (error) {
            console.log(error);
        } finally {
            setDetail({loading: false});
            setDetail({data:result});
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return detail.loading ? <TapLoader /> : (
    <Container>
        <DirectorTitle>Director 🎬 👉 </DirectorTitle>
        <DirectorContainer>
        {detail.data && detail.data.crew.map(crew =>
        <DirectorBox>
        {crew.department === "Directing" && 
            crew.job === "Director" &&
            <>
            <CastPhotoBox>
            <DirectorPhoto 
                src={crew.profile_path 
                    ? `https://image.tmdb.org/t/p/original${crew.profile_path}` 
                    : require("../../assets/noPosterSmall.png")} 
            />
            </CastPhotoBox>
            <DirectorName>{crew.name}</DirectorName>
            </>
        }
        </DirectorBox>
        )}
        </DirectorContainer>
        {/*  */}
        <Divided>🤸‍♂️ Actor  /🤸‍♀️ Actress 👇</Divided>
        <Divided></Divided>
        {detail.data && detail.data.cast.map((cast,index) =>
        <CastBox>
            <CastPhotoBox>
                <CastPhoto src={cast.profile_path ? 
                    `https://image.tmdb.org/t/p/original${cast.profile_path}` 
                    : require("../../assets/noPosterSmall.png")}
                />
            </CastPhotoBox>
            <CastCharacter>{cast.character}</CastCharacter>
            <CastName>{cast.name}</CastName>
        </CastBox>
        )}
    </Container>
    );
};

export default Credits;