import styled from "styled-components";

import { RotatingLines } from 'react-loader-spinner'

export const DeleteSpinner = () => {
    return (
        <RotatingsContainer>
            <RotatingLines
                strokeColor="#E23428"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
            />
        </RotatingsContainer>
    )
}

const RotatingsContainer = styled.div`
    position: fixed;
    top: 35%;
    left: 53%;
    z-index: 10;
`;