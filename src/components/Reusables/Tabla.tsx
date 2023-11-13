import React, { useContext } from "react";
import styled from "styled-components"
import { AsideContext } from "../Context/ToggleAsideContext";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { BookingsInterface } from "../../interfaces/bookingsInterface";
import { RoomInterface } from "../../interfaces/roomInterface";
import { UsersInterface } from "../../interfaces/usersInterface";
import { ContactInterface } from "../../interfaces/contactInterface";

interface ColsInterface {
    property: string,
    label: string,
    i?: number,
    display?: (data: any) => void
}

interface TablaInterface {
    cols?: ColsInterface[],
    data?: BookingsInterface[] | RoomInterface[] | UsersInterface[] | ContactInterface[],
    totalCols?: number,
    totalHeaders?: number
}

interface TitleInterface {
    label: string
}

export const Tabla = ({ cols, data, totalCols, totalHeaders}: TablaInterface) => {

    const {asideState} = useContext(AsideContext);
    let darkMode: boolean = asideState?.darkMode || false;
    const [tableRef] = useAutoAnimate();
    
    const displayRow = (row: BookingsInterface | RoomInterface | UsersInterface | ContactInterface) => (
        <TableContainerBodyContent darkmode={darkMode ? 0 : 1}  totalcols={totalCols} key={row._id}>
            {cols !== undefined && cols.map((col: ColsInterface, i: number) => (
                <td key={i}>{typeof col.display === 'function' ? col.display(row) : (row as Record<string, any>)[col.property as string]}
                </td>
            ))}
        </TableContainerBodyContent>
    )

    return (
        <>
            <TableBodyContainer>
                <TableContainer>
                    <TableContainerTitle darkmode={darkMode ? 0 : 1}>
                        <TableContainerTitleTR>
                            {cols?.map((col: TitleInterface, i: number) =>
                                <TableTitles darkmode={darkMode ? 0 : 1} totalheaders={totalHeaders} key={i}>{col.label && col.label}</TableTitles>
                            )}
                        </TableContainerTitleTR>
                    </TableContainerTitle>
                        <TableBody darkmode={darkMode ? 0 : 1} ref={tableRef}>
                            {data?.map(displayRow)}
                        </TableBody>
                </TableContainer>
            </TableBodyContainer>

        </>
    )
}

const TableContainer = styled.table`
    border-top: none;
    border-collapse: collapse;
    min-width: 1450px;
`;

const TableContainerTitle = styled.thead<{darkmode?: number}>`
    border: ${props => props.darkmode === 0 ? '1px solid #0004' : '1px solid #00000015'};
    border-radius: 20px 20px 0px 0px;
    border-bottom: none;
    height: 65px;
    width: 1400px;
    display: flex;
    transition: 0.5s;
    background-color: ${props => props.darkmode === 0 ? '#202020' : '#ffff'};
`;

const TableContainerTitleTR = styled.tr`
    display: flex;
    padding: 20px;
    width: 100%;
`;

const TableTitles = styled.th<{darkmode?: number, totalheaders?:number}>`
    color: ${props => props.darkmode === 0 ? '#fff' : '#393939'};
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: ${props => props.darkmode === 0 ? 'normal' : 600};
    display: flex;
    justify-content: center;
    width: calc(1400px / ${props => props.totalheaders});
    transition: 0.5s;
`;

const TableContainerBodyContent = styled.tr<{totalcols?: number, darkmode?: number}>`
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
        border: ${props => props.darkmode === 0 ? '1px solid #0004' : '1px solid #00000015'};
        padding: 10px;
    }

`;

const TableBody = styled.tbody<{darkmode?: number}>`
    height: auto;
    width: 1442px;
    color: ${props => props.darkmode === 0 ? '#fff' : '#393939'};
    transition: 0.5s;
    background-color: ${props => props.darkmode === 0 ? '#202020' : '#ffff'};
`;

const TableBodyContainer = styled.div`
  max-height: 64vh;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 30px;
  min-width: 1400px;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Scroll suave */
  scroll-behavior: smooth;
`;