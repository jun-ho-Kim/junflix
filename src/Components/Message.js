import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    height:100vh;
    display: flex;
    justify-content: center;
`;

const Text = styled.span`
    font-size: 32px;
    color: ${props => props.color};
    font-weight: 600;
`;
const Message = ({text, color}) => (
    <Container>
        <Text color={color}>{text}</Text>
    </Container>
);

Message.prototype = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}

export default Message;