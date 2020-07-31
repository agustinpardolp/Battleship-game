import React from 'react'
import styled from "styled-components";

const Wrapper = styled.div`
width:50%;
display:grid;
justify-content:flex-start;
grid-template-columns: 60% 30%;
`;

export default function ContentWrapper({children}) {
    return (
        <Wrapper>
          {children}  
        </Wrapper>
    )
}
