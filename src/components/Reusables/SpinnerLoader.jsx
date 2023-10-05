import styled from "styled-components";

import { InfinitySpin } from 'react-loader-spinner'

export const SpinnerLoader = () => {
    return (
        <SpinnerContainer>
            <InfinitySpin
                width='200'
                color="#135846"
            />
        </SpinnerContainer>
    )
}

const SpinnerContainer = styled.div`
    position: absolute;
    top: 35%;
    left: 50%;
`;