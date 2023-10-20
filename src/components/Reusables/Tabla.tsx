import React, { useContext } from "react";
import styled from "styled-components"
import { AsideContext } from "../Context/ToggleAsideContext";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { BookingsInterface } from "../../interfaces/bookingsInterface";
import { RoomInterface } from "../../interfaces/roomInterface";
import { UsersInterface } from "../../interfaces/usersInterface";
import { ContactInterface } from "../../interfaces/contactInterface";

/* INTERFAZ PARA COLUMNAS */

interface TablaInterface {
    cols?: object[] | any,
    data?: BookingsInterface[] | RoomInterface[] | UsersInterface[] | ContactInterface[],
    totalCols?: number,
    totalHeaders?: number
}

interface DataTabla { 
    display?: object
    id: string,
    property: string | number
}

interface TitleInterface {
    label: string
}

export const Tabla = ({ cols, data, totalCols, totalHeaders}: TablaInterface) => {

    const {asideState} = useContext(AsideContext);
    const [tableRef] = useAutoAnimate();
    
    const displayRow = (row: BookingsInterface | RoomInterface | UsersInterface | ContactInterface) => (
        <TableContainerBodyContent darkmode={asideState.darkMode?.toString()}  totalcols={totalCols} key={row.id}>
            {cols !== undefined && cols.map((col: DataTabla, i: number) => (
                <td key={i}>{typeof col.display === 'function' ? col.display(row) : (row as Record<string, any>)[col.property as string]}
                </td>
            ))}
        </TableContainerBodyContent>
    )

    return (
        <>
        {/* TODO HACER LO QUE ME PASÓ JOHN */}
            {/* <TableContainer>
                <TableContainerTitle darkmode={asideState.darkMode?.toString()}>
                    <TableContainerTitleTR>
                        {cols?.map((col: TitleInterface, i: number) =>
                            <TableTitles darkmode={asideState.darkMode?.toString()} totalheaders={totalHeaders} key={i}>{col.label && col.label}</TableTitles>
                        )}
                    </TableContainerTitleTR>
                </TableContainerTitle>
                <TableBodyContainer>
                    <TableBody darkmode={asideState.darkMode?.toString()} ref={tableRef}>
                        {data?.map(displayRow)}
                    </TableBody>
                </TableBodyContainer>
            </TableContainer> */}
            <TableBodyContainer>
                <TableContainer>
                    <TableContainerTitle darkmode={asideState.darkMode?.toString()}>
                        <TableContainerTitleTR>
                            {cols?.map((col: TitleInterface, i: number) =>
                                <TableTitles darkmode={asideState.darkMode?.toString()} totalheaders={totalHeaders} key={i}>{col.label && col.label}</TableTitles>
                            )}
                        </TableContainerTitleTR>
                    </TableContainerTitle>
                        <TableBody darkmode={asideState.darkMode?.toString()} ref={tableRef}>
                            {data?.map(displayRow)}
                        </TableBody>
                </TableContainer>
            </TableBodyContainer>
        </>
    )
}

interface Props {
    darkmode?: boolean | string,
    totalheaders?: number,
    totalcols?: number
}

const TableContainer = styled.table`
    border-top: none;
    border-collapse: collapse;
    margin-top: 35px;
`;

const TableContainerTitle = styled.thead<Props>`
    border: ${props => props.darkmode === 'true' ? '1px solid #0004' : '1px solid #00000015'};
    border-radius: 20px 20px 0px 0px;
    border-bottom: none;
    height: 65px;
    width: 1400px;
    display: flex;
    transition: 0.5s;
    background-color: ${props => props.darkmode === 'true' ? '#202020' : '#ffff'};
`;

const TableContainerTitleTR = styled.tr`
    display: flex;
    padding: 20px;
    width: 100%;
`;

const TableTitles = styled.th<Props>`
    color: ${props => props.darkmode === 'true' ? '#fff' : '#393939'};
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: ${props => props.darkmode === 'true' ? 'normal' : 600};
    display: flex;
    justify-content: center;
    width: calc(1400px / ${props => props.totalheaders});
    transition: 0.5s;
`;

const TableContainerBodyContent = styled.tr<Props>`
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
        border: ${props => props.darkmode === 'true' ? '1px solid #0004' : '1px solid #00000015'};
        padding: 10px;
    }

`;

const TableBody = styled.tbody<Props>`
    height: auto;
    width: 1442px;
    color: ${props => props.darkmode === 'true' ? '#fff' : '#393939'};
    transition: 0.5s;
    background-color: ${props => props.darkmode === 'true' ? '#202020' : '#ffff'};
`;

const TableBodyContainer = styled.div`
  max-height: 57vh;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Scroll suave */
  scroll-behavior: smooth;
`;