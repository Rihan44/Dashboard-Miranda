import styled from "styled-components";

import { RotatingLines } from 'react-loader-spinner';

interface SpinnerInterface {
    position?: boolean
}

export const DeleteSpinner = ({position}: SpinnerInterface) => {
    return (
        <RotatingsContainer position={position}>
            <RotatingLines
                strokeColor="#135846"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
            />
        </RotatingsContainer>
    )
}

const RotatingsContainer = styled.div<{position?: boolean}>`
    position: fixed;
    top: 35%;
    left: ${props => props.position ? '53%' : '47%'};
    z-index: 10;
`;