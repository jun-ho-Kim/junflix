import React, {useState, useEffect} from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 60%;
    /* height: 100%; */
    display: flex;
    justify-content: center;
    align-items: center;
`
const H3 = styled.h3`
    margin-top: 20px;
    font-size: 24px;
    font-weight: 600;
`

export default () => 
    <Container>
        <H3>Comming Soon</H3>
    </Container>