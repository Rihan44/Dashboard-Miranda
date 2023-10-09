import styled from "styled-components"


export const MainContainer = ({children}) => {

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
`
