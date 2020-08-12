import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
// import { TvSeasons } from "../../Components/Seasons";
import ContentNav from "../../Components/ContentNav";

const Container = styled.div`
    margin-left: 20%;
    padding: 50px;
    height: calc(100vh - 50px);
    width:100%;
    position: relative;
    display:flex;
    justify-content: center;
`;
const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 70%;
    height: 70%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index:0;
    margin-top: 40px;

`;
const Content = styled.div`
    display: flex;
    width: 100%;
    height:100%;
    position: relative;
    z-index: 1;
`;
const Cover = styled.div`
    width: 15%;
    height: 50%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
`;
const Data = styled.div`
    width: 65%;
    margin-left: 15px;
`;
const TitleImdb = styled.div`
    width: 50%; 
    display: flex;
    justify-content: space-between;
`;
const Title = styled.h3`
    font-size: 32px;
`;

const ImdbIcon = styled.div` 
    /* width: 65px;
    height: 32px;
    background-color: #E2B616;
    color: black;
    font-size: 19px;
    border-radius: 3px;
    font-weight: 800;
    margin-left: 15px; */
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ImdbLink = styled.a`
    width: 65px;
    height: 32px;
    background-color: #E2B616;
    color: black;
    font-size: 19px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    margin-left: 15px;
    display: flex;
    justify-content: center;
    align-items: center; 
    color: black;

`;

const VideoContainer = styled.div`
`;
const VideoLink = styled.a`
  display: inline-block;
  position: relative;
  /* width: 85px; */
    /* height: 52px; */
    width: 48px;
    height: 32px;
    margin-left: 7px;
    margin-top: 3px;
  background-position: center center;
  background-size: cover;
    background-image: url(${props => props.src});
`;

const ItemContainer = styled.div`
    margin: 20px 0px;
`;
const Item = styled.span`
    /* display:flex; */
`;
const Divider = styled.span`
    padding: 0px 10px;
`;
const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width:55%;
`;


// const TVSeasons = styled.div`
// `;


// const NavContainer = styled.nav`
//     display: inline-block;

// `;
// const List = styled.ul`
// `;
// const SLink = styled(Link)`
// `;

// const NavContent = styled.div`
//     position: absolute;
// `;

// const ProductionCountries = styled.div`
//     position: absolute;
//     top:0;
//     left: 0;
//     z-index: 99;
// `;
// const ProductionCompany = styled.div`
//     position: absolute;
//     top:0;
//     left: 0;
// `;

const DetailPresenter = ({key, id, result, loading, error, pathname, isMovie}) => 
    loading? (
        <Loader />
    ) : (
    <>
    <Container>
        <Backdrop
        bgImage={result.backdrop_path 
            ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
            : require("../../assets/noPosterSmall.png")} />
        <Content>
            <Cover
                bgImage={
                    result.poster_path
                    ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                    : require("../../assets/noPosterSmall.png")
                }
            />
            <Data>
                <TitleImdb>
                    <Title>
                        {result.original_title
                        ? result.original_title
                        :result.original_name}
                    </Title>
                    <Item>
                    <ImdbIcon>
                    {result.imdb_id &&
                        <ImdbLink href={`https://www.imdb.com/title/${result.imdb_id}`}>
                            IMDB
                        </ImdbLink>
                    }
                    
                    <VideoContainer>
                    {result.videos.results &&
                    //  (result.videos.results.map((video,index) => 
                    // <VideoLink
                    //     key={video.id}
                    //     id={video.id}
                    //     href={`https://www.youtube.com/watch?v=${video.key}`}
                    //     target={"_blank"}
                    //     src={require("../../assets/youtube.png")} />
                    // ))
                    <VideoLink
                        key={result.videos.results.id}
                        id={result.videos.results.id}
                        href={`https://www.youtube.com/watch?v=${result.videos.results[0].key}`}
                        target={"_blank"}
                        src={require("../../assets/youtube.png")} />
                    }
                    </VideoContainer>
                    </ImdbIcon>
                    </Item>

                </TitleImdb>
                <ItemContainer>
                    <Item>
                        {result.release_date 
                        ? `📅 ${result.release_date.substring(0,4)}`
                        : `📅 ${result.first_air_date.substring(0,4)}`}
                    </Item>
                    <Divider>•</Divider>
                    <Item>
                        {result.runtime
                        ? `🕗 ${result.runtime} m`
                        : `🕗 ${result.episode_run_time[0]} m`}
                    </Item>
                    <Divider>•</Divider>
                    <Item>
                        {result.genres && 
                        result.genres.map((genre, index)=>
                        index === result.genres.length -1
                        ? genre.name : `${genre.name}/`
                        )}
                    </Item>
                </ItemContainer>
                {/* <productionCompany>
                        {result.production_companies &&
                        result.production_companies.map(company => company.name)}
                    </productionCompany>
                    <productionCountries>
                        {result.production_countries ?
                        result.production_countries.map(contry => contry.name) :
                        result.origin_country
                        }
                    </productionCountries> */}
                <Overview>{result.overview}</Overview>
                {/* {result.seasons &&
                <TVSeasons>
                    {result.seasons.map(seanson =><TvSeasons {...seanson} />)}
                </TVSeasons>
                } */}
        {/* <NavContainer>
            <List>
                <Item>
                    <SLink to="/company">Company</SLink>
                </Item>
                <Item>
                    <SLink to="/contry">Contry</SLink>
                </Item>
            </List>
            <NavContent>
                <ProductionCompany>
                    {result.production_companies &&
                    result.production_companies.map(company => company.name)}
                </ProductionCompany>
                <ProductionCountries>
                    {result.production_countries ?
                    result.production_countries.map(contry => contry.name) :
                    result.origin_country
                    }
                </ProductionCountries>
            </NavContent>
        </NavContainer> */}
        <ContentNav
        id={result.id}
        pathname={pathname}
        isMovie={isMovie} 
        />            
            </Data>
        </Content>
    </Container>
        </>
)
;

DetailPresenter.prototype = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default DetailPresenter;