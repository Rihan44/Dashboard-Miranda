import React, { useContext } from "react";
import styled from "styled-components"
import { AsideContext } from "../Context/ToggleAsideContext";
import { useAutoAnimate } from '@formkit/auto-animate/react'

export const Tabla = ({ cols, data, totalCols, totalHeaders}) => {

    const {asideState} = useContext(AsideContext);
    const [tableRef] = useAutoAnimate();
    
    const displayRow = row => (
        <TableContainerBodyContent darkmode={asideState.darkMode}  totalcols={totalCols} key={row.id}>
            {cols.map((col, i) => (
                <td key={i}>{typeof col.display === 'function' ? col.display(row) : row[col.property]}
                </td>
            ))}
        </TableContainerBodyContent>
    )

    return (
        <>
            <TableContainer>
                <TableContainerTitle darkmode={asideState.darkMode}>
                    <TableContainerTitleTR>
                        {cols?.map((col, i) =>
                            <TableTitles darkmode={asideState.darkMode} totalheaders={totalHeaders} key={i}>{col.label && col.label}</TableTitles>
                        )}
                    </TableContainerTitleTR>
                </TableContainerTitle>
                <TableBodyContainer>
                    <TableBody darkmode={asideState.darkMode} ref={tableRef}>
                        {data?.map(displayRow)}
                    </TableBody>
                </TableBodyContainer>
            </TableContainer>
        </>
    )
}

const TableContainer = styled.table`
    border-top: none;
    border-collapse: collapse;
    margin-top: 35px;
`;

const TableContainerTitle = styled.thead`
    border: ${props => props.darkmode ? '1px solid #0004' : '1px solid #00000015'};
    border-radius: 20px 20px 0px 0px;
    border-bottom: none;
    height: 65px;
    width: 1400px;
    display: flex;
    transition: 0.5s;
    background-color: ${props => props.darkmode ? '#202020' : '#ffff'};
`;

const TableContainerTitleTR = styled.tr`
    display: flex;
    padding: 20px;
    width: 100%;
`;

const TableTitles = styled.th`
    color: ${props => props.darkmode ? '#fff' : '#393939'};
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: ${props => props.darkmode ? 'normal' : 600};
    display: flex;
    justify-content: center;
    width: calc(1400px / ${props => props.totalheaders});
    transition: 0.5s;
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
        border: ${props => props.darkmode ? '1px solid #0004' : '1px solid #00000015'};
        padding: 10px;
    }

`;

const TableBody = styled.tbody`
    height: auto;
    width: 1442px;
    color: ${props => props.darkmode ? '#fff' : '#393939'};
    transition: 0.5s;
    background-color: ${props => props.darkmode ? '#202020' : '#ffff'};
`;

const TableBodyContainer = styled.div`
  max-height: 59vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;