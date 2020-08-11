import React from "react";
import styled from "styled-components";

const ProductionC = styled.div`
    /* position: absolute;
    top:0;
    left: 0; */
`;

const Contry = ({production_countries, origin_country}) => 
    <ProductionC>
        {production_countries ?
        production_countries.map(contry => contry.name) :
        origin_country
        }
    </ProductionC>

export default Contry;
