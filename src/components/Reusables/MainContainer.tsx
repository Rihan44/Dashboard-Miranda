import React from "react"
import styled from "styled-components"

interface Props {
    children: any /* TODO CAMBIAR EL TIPO */,
}

export const MainContainer: React.FC<Props> = ({children}) => {
    return(
        <Main>{children}</Main>
    )
}

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    height: auto;
    max-width: 1400px;
`
