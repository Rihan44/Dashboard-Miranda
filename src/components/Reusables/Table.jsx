import React from "react";
import styled from "styled-components"
import { MainContainer } from "./MainContainer"

export const Table = ({ cols, data, totalCols}) => {

    const displayRow = row => (
        <TableContainerBody key={row.id}>
                <TableContainerBodyContent totalCols={totalCols}>
            {cols.map((col, i) => (
                    <div key={i}>{typeof col.display === 'function' ? col.display(row) : row[col.property]}
                    </div>
            ))}
                </TableContainerBodyContent>
        </TableContainerBody>
    )

    return (
        <MainContainer>
            <TableContainerTitle>
                {cols?.map((col, i) =>
                    <TableTitles key={i}>{col.label && col.label}</TableTitles>
                )}
            </TableContainerTitle>
            <TableBody>
                {data?.map(displayRow)}
            </TableBody>
        </MainContainer>
    )
}


const TableContainerTitle = styled.div`
    border-radius: 20px 20px 0px 0px;
    border: 1px solid #00000015;
    height: 65px;
    margin-top: 35px;
    width: 1400px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
`;

const TableTitles = styled.div`
    color: #393939;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    width: calc(1400px / 6); ${'' /* TODO PASARLO POR PARAMETRO */}
    margin-right: 10px;
    margin-left: 10px;
    text-align: center;
`;

const TableContainerBody = styled.div`
    border: 1px solid #00000015;
    width: 1400px;
`;

const TableContainerBodyContent = styled.div`
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    width: 1400px;
    display: flex;
    justify-content: space-between;

    div {
        width: calc(1400px / ${props => props.totalCols});
        margin-right: 10px;
        margin-left: 10px;
        text-align: center;
        display:flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }

`;

const TableBody = styled.div`
    height: 680px;
    width: 1442px;
`;