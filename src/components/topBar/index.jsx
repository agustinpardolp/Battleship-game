import React from 'react';
import styled from "styled-components";

const StyledTopBar = styled.div`
width:50%;
display:flex;
justify-content:space-evenly;
margin-bottom:2%;
h1{
    font-style: italic;
}
img{
    width:20%
}

`;

export default function TopBar() {
    
    return (
        <StyledTopBar>
            <h1>Battleship game</h1>
            <img src={process.env.PUBLIC_URL +"ship.png"} alt=""/>
        </StyledTopBar>
    )
}
