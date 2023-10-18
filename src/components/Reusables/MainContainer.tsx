import { ReactNode } from "react";
import styled from "styled-components"


type Props = {
    children: ReactNode
}

export const MainContainer = ({children}: Props) => {

    return(
        <Main>
            {children}
        </Main>
    );

}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    height: auto;
    max-width: 1400px;
    ${'' /* background-color: #171717; */}
`
