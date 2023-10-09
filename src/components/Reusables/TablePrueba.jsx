import React from "react";
import styled from "styled-components"
import { MainContainer } from "./MainContainer"

export const TablePrueba = ({ cols, data, totalCols }) => {

    const displayRow = row => (
        <TableContainerBodyContent totalcols={totalCols}>
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
                    <TableContainerTitleTH>
                        {cols?.map((col, i) =>
                            <TableTitles key={i}>{col.label && col.label}</TableTitles>
                        )}
                    </TableContainerTitleTH>
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

const TableContainerTitleTH = styled.tr`
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
    width: calc(1400px / 7); 
`;


const TableContainerBodyContent = styled.tr`
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    width: 1400px;
    display: flex;
    justify-content: space-between;

    td {
        width: calc(1400px / ${props => props.totalcols});
        text-align: center;
        display:flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #00000015;
    }

`;

const TableBody = styled.tbody`
    height: auto;
    width: 1442px;
`;