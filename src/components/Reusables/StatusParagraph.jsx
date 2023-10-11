import styled from "styled-components";
import React from 'react';

export const StatusParagraph = styled.p`
    display: flex;
    align-items: center;

    ${(props) => {
        switch (props.status) {
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
            case 'available':
                return `
                background-color: #5AD07A;
            `;
            case 'booked':
                return `
                background-color: #E23428;
                color: #ffffff; 
            `;
            default:
                return ` 
                    background-color: #5AD07A;
                `
        }
    }} 
    
    padding: 15px;
    border-radius: 12px;
`;