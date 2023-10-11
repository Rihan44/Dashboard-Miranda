import styled from "styled-components";
import React from 'react';

export const StatusParagraph = ({status, children}) => {

    const estilos = {
        backgroundColor: status === 'check_in' ? '#5AD07A' : status === 'check_out' ? '#FFEDEC' : status === 'in_progress' ? '#E2E2E2' : '#5AD07A'
    }

    return(
        <>
            <Status style={estilos} $status={status} data-testid='statusParagraph'>
                {children}
            </Status>
        </>
    )
}

const Status = styled.p`
    display: flex;
    align-items: center;

${'' /*     ${(props) => {
        switch (props.$status) {
            case 'check_in':
                return `
                background-color: #5AD07A;
            `;
            case 'check_out':
                return `
                background-color: #FFEDEC;
            `;
            case 'in_progress':
                return ` 
                background-color: #E2E2E2;
            `;
            default:
                return ` 
                background-color: #5AD07A;
            `
        }
    }} */}

    padding: 15px;
    border-radius: 12px;
`;