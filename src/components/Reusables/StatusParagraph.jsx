import styled from "styled-components";


export const StatusParagraph = ({status, children}) => {
    return(
        <>
            <Status $status={status}>
                {children}
            </Status>
        </>
    )
}

const Status = styled.p`
    display: flex;
    align-items: center;
    
    ${(props) => {
        switch (props.$status) {
            case 'check_in':
                return `
                background: #5AD07A;
            `;
            case 'check_out':
                return `
                background: #FFEDEC;
            `;
            case 'in_progress':
                return ` 
                background: #E2E2E2;
            `;
            default:
                return ` 
                background: #5AD07A;
            `
        }
    }}

    padding: 15px;
    border-radius: 12px;
`;