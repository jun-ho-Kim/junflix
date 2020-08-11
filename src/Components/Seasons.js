import React from "react";
import PropsTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
`;
const SeansonName = styled.h3`
`;
const SeansonNumber = styled.span`
`;
const AirDate = styled.h5`
`;
const EpisodeCount = styled.span`
`;
const Overview = styled.p`
`;

export const TvSeasons = ({id, name, air_date, episode_count, overview, poster_path, season_number}) => 
    <Container>
        <SeansonName>{name}</SeansonName>
        <AirDate>{air_date}</AirDate>
        <SeansonNumber>{season_number}</SeansonNumber>
        <EpisodeCount>{episode_count}</EpisodeCount>
        <Overview>{overview}</Overview>
    </Container>