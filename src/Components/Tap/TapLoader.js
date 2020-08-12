import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    width: 60%;
    display: flex;
    justify-content: center;
    font-size: 28px;
    margin-top: 20px;
`;

export default () => (
    <Container>
        <span role="img" aria-lable="Loading">
        {/* <span> */}
            👀 ⌛
        </span>
    </Container>
);