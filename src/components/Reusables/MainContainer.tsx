import React, { useContext } from "react"
import styled from "styled-components"
import { AsideContext } from "../Context/ToggleAsideContext";

interface Props {
    children: any 
}

export const MainContainer: React.FC<Props> = ({children}) => {
    const { asideState } = useContext(AsideContext);

    return(
        <Main menuToggle={asideState.asideVisible ? 0 : 1}>{children}</Main>
    )
}

export const Main = styled.main<{menuToggle: number}>`
    display: flex;
    flex-direction: column;
    height: auto;
    max-width: 1400px;
    transition: 1s;
    margin-left: ${props => props.menuToggle === 0 && '10%'}
   /*  margin: ${props => props.menuToggle === 0 && 'auto'}; */
`
