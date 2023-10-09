import React from "react";
import styled from "styled-components"
import { MainContainer } from "./MainContainer"

export const Tabla = ({ cols, data, totalCols, totalHeaders}) => {

    const displayRow = row => (
        <TableContainerBodyContent totalcols={totalCols} key={row.id}>
            {cols.map((col, i) => (
                <td key={i}>{typeof col.display === 'function' ? col.display(row) : row[col.property]}
                </td>
            ))}
        </TableContainerBodyContent>
    )

    return (
        <MainContainer>
            <TableContainer>
                <TableContainerTitle>
                    <TableContainerTitleTR>
                        {cols?.map((col, i) =>
                            <TableTitles totalheaders={totalHeaders} key={i}>{col.label && col.label}</TableTitles>
                        )}
                    </TableContainerTitleTR>
                </TableContainerTitle>
                <TableBody>
                    {data?.map(displayRow)}
                </TableBody>
            </TableContainer>
        </MainContainer>
    )
}

const TableContainer = styled.table`
    border-top: none;
    border-collapse: collapse;
    margin-top: 35px;
`;

const TableContainerTitle = styled.thead`
    border: 1px solid #00000015;
    border-radius: 20px 20px 0px 0px;
    border-bottom: none;
    height: 65px;
    width: 1400px;
    display: flex;
`;

const TableContainerTitleTR = styled.tr`
    display: flex;
    padding: 20px;
    width: 100%;
`;

const TableTitles = styled.th`
    color: #393939;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    display: flex;
    justify-content: center;
    width: calc(1400px / ${props => props.totalheaders});
`;


const TableContainerBodyContent = styled.tr`
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    width: 1400px;
    display: flex;
    justify-content: space-between;
    transition: transform 0.5s;

    &:hover {
        transform: scale(1.01);
    }

    td {
        width: calc(1400px / ${props => props.totalcols});
        text-align: center;
        display:flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #00000015;
        padding: 10px;
    }

`;

const TableBody = styled.tbody`
    height: auto;
    width: 1442px;
`;