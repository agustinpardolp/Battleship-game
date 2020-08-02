import React from 'react'
import styled from "styled-components";

const Wrapper = styled.div`
width:60%;
display:grid;
justify-content:flex-start;
grid-template-columns: 50% 50%;
`;

export default function ContentWrapper({children}) {
    return (
        <Wrapper>
          {children}  
        </Wrapper>
    )
}
