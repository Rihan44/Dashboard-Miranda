import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import styled from "styled-components";

import { LiaBedSolid } from "react-icons/lia";
import { AiOutlineWifi } from "react-icons/ai";
import { BsShieldCheck } from "react-icons/bs";

import { AiOutlineArrowLeft } from "react-icons/ai";

import { MainContainer } from "../Reusables/MainContainer";
import { getBookingDetail } from "../../features/bookingsSlice";
import { SpinnerLoader } from "../Reusables/SpinnerLoader";
import { BookingsInterface } from "../../interfaces/bookingsInterface";
import { AsideContext } from "../Context/ToggleAsideContext";

export const BookingFile = () => {

    /* AÑADIR FOTO */

    const { asideState } = useContext(AsideContext);
    let darkMode: boolean = asideState?.darkMode || false;
    
    const navigate = useNavigate();

    const [dataBooking, setDataBooking] = useState<BookingsInterface[] | any>([]);
    const bookingDataDetail = useAppSelector((state) => state.bookings.dataBooking);
    const status = useAppSelector((state) => state.bookings.status);

    const paramsID = useParams();
    const id: string | undefined = paramsID.id;
    const dispatch = useAppDispatch();

    let options: object = { year: 'numeric', month: 'long', day: 'numeric' };

    const handleSelectDate = (date: Date | string) => {
        if (typeof date === 'string') {
            const [year, month, day] = date?.split('-');
            return new Date(Number(year), Number(month) - 1, Number(day)).toLocaleDateString('en-EN', options);
        }
        return date?.toLocaleDateString('en-EN', options);
    };

    useEffect(() => {
        let data: BookingsInterface[] = [...bookingDataDetail];

        data.forEach((e) => {
            setDataBooking(e);
        });

    }, [bookingDataDetail])

    useEffect(() => {
        if (id !== undefined)
            dispatch(getBookingDetail(id));

    }, [dispatch, id])

    return (
        <MainContainer>
            {status === 'fulfilled' ?
                <FileBookingContainer>
                    <ButtonBack onClick={() => navigate('/bookings')}><AiOutlineArrowLeft /></ButtonBack>
                    <InfoContainer>
                        <NameContainer >
                            <NameTitle darkmode={darkMode ? 0 : 1}>{dataBooking.guest}</NameTitle>
                            <NameParagraph>{dataBooking.id}</NameParagraph>
                        </NameContainer>
                        <CheckContainer darkmode={darkMode ? 0 : 1}>
                            <CheckInfo>
                                <CheckTitle darkmode={darkMode ? 0 : 1}>Check In</CheckTitle>
                                <CheckParagraph darkmode={darkMode ? 0 : 1}>{handleSelectDate(dataBooking.check_in)}</CheckParagraph>
                            </CheckInfo>
                            <CheckInfo>
                                <CheckTitle darkmode={darkMode ? 0 : 1}>Check Out</CheckTitle>
                                <CheckParagraph darkmode={darkMode ? 0 : 1}>{handleSelectDate(dataBooking.check_out)}</CheckParagraph>
                            </CheckInfo>
                        </CheckContainer>
                        <RoomInfoContainer>
                            <InnerInfo>
                                <InnerInfoContainer>
                                    <InnerInfoTitle darkmode={darkMode ? 0 : 1}>Room Info</InnerInfoTitle>
                                    <InnerInfoParagraph darkmode={darkMode ? 0 : 1}>{dataBooking.room_type}</InnerInfoParagraph>
                                </InnerInfoContainer>
                                <InnerInfoContainer>
                                    <InnerInfoTitle darkmode={darkMode ? 0 : 1}>Price</InnerInfoTitle>
                                    <InnerInfoParagraph darkmode={darkMode ? 0 : 1}>{dataBooking.price}<small>/night</small></InnerInfoParagraph>
                                </InnerInfoContainer>
                            </InnerInfo>
                            <RoomDescription darkmode={darkMode ? 0 : 1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</RoomDescription>
                        </RoomInfoContainer>
                        <FacilitiesRooms darkmode={darkMode ? 0 : 1}>
                            <h3>Facilites</h3>
                            <FacilitiesInner>
                                <BigFacilitie>
                                    <LiaBedSolid />
                                    3 Bed Space
                                </BigFacilitie>
                                <BigFacilitie>
                                    <BsShieldCheck />
                                    24 Hours Guard
                                </BigFacilitie>
                                <BigFacilitie>
                                    <AiOutlineWifi />
                                    Free Wifi
                                </BigFacilitie>
                                <SmallFacilitie>
                                    2 Bathroom
                                </SmallFacilitie>
                                <SmallFacilitie>
                                    Air Conditioner
                                </SmallFacilitie>
                                <SmallFacilitie>
                                    Television
                                </SmallFacilitie>
                            </FacilitiesInner>
                        </FacilitiesRooms>
                    </InfoContainer>
                    <ImageContainer>
                        <StatusDecoration status={dataBooking.status}>
                            {dataBooking.status}
                        </StatusDecoration>
                        <ImageDescription>
                            <h3>Bed Room</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </ImageDescription>
                    </ImageContainer>
                </FileBookingContainer>
                : status === 'rejected' ? alert('Algo falló')
                    : <SpinnerLoader></SpinnerLoader>}
        </MainContainer>
    )
}

const FileBookingContainer = styled.div`
    margin: 50px;
    width: 1475px;
    height: 792px;
    box-shadow: 0px 4px 4px #00000010;
    border-radius: 10px;
    display: flex;
    position: relative;
`;

const InfoContainer = styled.div`
    width: 50%;
    padding: 40px;
`;

const NameContainer = styled.div``;

const NameTitle = styled.h3<{ darkmode: number }>`
    font-family: 'Poppins', sans-serif;
    font-size: 30px;
    margin-bottom: 13px;
    color: ${props => props.darkmode === 0 ? '#ffff' : '#212121'};
    transition: 0.5s;
`;

const NameParagraph = styled.p`
    color: #799283;
    font-family: 'Poppins', sans-serif;
`;

const CheckContainer = styled.div<{darkmode: number}>`
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 30px;
    border-bottom: ${props => props.darkmode === 0 ? '1px solid #ffff' : ' 1px solid #00000010'};
    padding-bottom: 50px;   
    transition: 0.5s;
`;

const CheckInfo = styled.div``

const CheckTitle = styled.h3<{ darkmode: number }>`
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    color: ${props => props.darkmode === 0 ? '#ffff' : '#6E6E6E'};
    transition: 0.5s;
`;

const CheckParagraph = styled.p<{ darkmode: number }>`
    color: ${props => props.darkmode === 0 ? '#ffff' : '#212121'};
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    margin-right: 50px;
    transition: 0.5s;
`

const RoomInfoContainer = styled.div``;

const InnerInfo = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin-bottom: 35px;
`;

const InnerInfoContainer = styled.div``;
const InnerInfoTitle = styled.h3<{ darkmode: number }>`
    color: ${props => props.darkmode === 0 ? '#ffff' : '#6E6E6E'};
    transition: 0.5s;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
`;

const InnerInfoParagraph = styled.p<{ darkmode: number }>`
    color: ${props => props.darkmode === 0 ? '#ffff' : '#212121'};
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    margin-right: 50px;
    transition: 0.5s;
    
    small {
        color: #799283;
        font-size: 14px;
        margin-left: 15px;
    }
`;

const RoomDescription = styled.p<{ darkmode: number }>`
    color: ${props => props.darkmode === 0 ? '#ffff' : '#363636'};
    transition: 0.5s;
    font-size: 14px;
    width: 90%;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 30px;
`;

const FacilitiesRooms = styled.div<{ darkmode: number }>`
    h3 {
        color: ${props => props.darkmode === 0 ? '#ffff' : '#6E6E6E'};
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        transition: 0.5s;
    }
`;

const FacilitiesInner = styled.div` 
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const FacilitiesTab = styled.div` 
    background: #E8F2EF;
    color: #135846;
    width: 187px;
    height: 65px;
    border-radius: 8px;
    margin: 10px;
    font-size: 14px; 
    font-family: 'Poppins', sans-serif;
    margin-left: 0px;
`;

const BigFacilitie = styled(FacilitiesTab)`
    svg {
        font-size: 20px;
        margin-right: 15px;
    }
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SmallFacilitie = styled(FacilitiesTab)`
    width: 121px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ImageContainer = styled.div` 
    width: 50%;
    background: #C5C5C5;
    border-radius: 0px 10px 10px 0px;
    display: flex;
    height: 100%;
`;

const ImageDescription = styled.div`
    width: 100%;
    padding: 80px;
    align-self: end;
    position: relative;

    h3 {
        color: #FFFFFF;
        font-size: 24px;
        font-family: 'Poppins', sans-serif;
        margin-bottom: 20px;
    }

    p {
        color: #FFFFFF70;
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
        font-weight: 300;
    }

`;

const StatusDecoration = styled.div<{ status: string }>`
    width: 160px;
    height: 50px;
    ${(props) => {
        switch (props.status) {
            case 'check_in':
                return `
                background: #5AD07A;
                color: #FFFFFF;
            `;
            case 'check_out':
                return `
                background: #FFEDEC;
                color: #212121;
            `;
            case 'in_progress':
                return ` 
                background: #E2E2E2;
                color: #212121;
            `;
            default:
                return ` 
                background: #5AD07A;
                color: #FFFFFF;
            `
        }
    }}

    border-radius: 10px;
    display: flex; 
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    position: absolute;
    right: 0px;
    top: 5%;
    transform: rotate(30deg);
`;

const Button = styled.button` 
    background: #EBF1EF 0% 0% no-repeat padding-box;
    background: #135846;
    color: #FFFFFF;
    width: 150px;
    height: 40px;
    border-radius: 12px;
    margin-right: 20px;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    transition: 0.3s;
    cursor: pointer;
    margin-bottom: 20px;
    border: none;
    box-shadow: 0px 3px 10px #00000030;
    position: absolute;
    bottom: 0px;

    &:hover {
        background: #799283;
    }

    &:hover {
        background: #799283 0% 0% no-repeat padding-box;
        color: #EBF1EF;
    }
`;

const ButtonBack = styled(Button)`
    position: absolute;
    top: -4%;
    left: -1%;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

     &:hover {
        transform: scale(1.1);
        background: #135846;
     }
`;

