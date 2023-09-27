import { useEffect, useState } from "react"
import { useParams} from "react-router-dom";

import { bookingData } from "../data/bookingData";

import styled from "styled-components";


export const BookingFile = () => {

    const [dataBooking, setDataBooking] = useState('');

    const { id } = useParams();

    let options = {year: 'numeric', month: 'long', day: 'numeric' };

    const checkOutDate = dataBooking ? new Date(dataBooking.check_out.split("-")[0], dataBooking.check_out.split("-")[1]-1, 
    dataBooking.check_out.split("-")[2]).toLocaleDateString('en-EN', options) : '';

    const checkInDate = dataBooking ? new Date(dataBooking.check_in.split("-")[0], dataBooking.check_in.split("-")[1]-1, 
    dataBooking.check_in.split("-")[2]).toLocaleDateString('en-EN', options) : '';

    useEffect(() => {
        let data = [...bookingData];

        data.map(e => {
            if(e.id === id) {
                setDataBooking(e);
            }
        });

    },[id])

    return(
        <>
            <Main>
                <FileBookingContainer>
                    <InfoContinainer>
                        <NameContainer>
                            <h3>{dataBooking.guest}</h3>
                            <p>{id}</p>
                        </NameContainer>
                        <CheckContainer>
                            <div>
                                <h3>Check In</h3>
                                <p>{checkInDate}</p>
                            </div>
                            <div>
                                <h3>Check Out</h3>
                              <p>{checkOutDate}</p> 
                            </div>
                        </CheckContainer>
                        <RoomInfoContainer>
                            <InnerInfo>
                                <div>
                                    <h3>Room Info</h3>
                                    <p>{dataBooking.room_type}</p>
                                </div>
                                <div>
                                    <h3>Price</h3>
                                    <p>{dataBooking.price}<small>/night</small></p>
                                </div>
                            </InnerInfo>
                            <RoomDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</RoomDescription>
                        </RoomInfoContainer>
                        <FacilitiesRooms>
                                <h3>Facilites</h3>
                                <FacilitiesInner>
                                    <BigFacilitie>

                                    </BigFacilitie>
                                    <BigFacilitie>
                                        
                                    </BigFacilitie>
                                    <BigFacilitie>
                                        
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
                    </InfoContinainer>
                    <ImageContainer>

                    </ImageContainer>
                </FileBookingContainer>
            </Main>
        </>
    )
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
`;

const FileBookingContainer = styled.div`
    margin: 50px;
    width: 1475px;
    height: 792px;
    box-shadow: 0px 4px 4px #00000010;
    border-radius: 10px;
    display: flex;
`;

const InfoContinainer = styled.div`
    width: 50%;
    padding: 40px;
`;

const ImageContainer = styled.div` 
    width: 50%;
    background: #C5C5C5;
    border-radius: 0px 10px 10px 0px;
`;

const NameContainer = styled.div`
    h3 {
        color: #212121;
        font-family: 'Poppins', sans-serif;
        font-size: 30px;
        margin-bottom: 13px;
    }

    p {
        color: #799283;
        font-family: 'Poppins', sans-serif;
    }
`;

const CheckContainer = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 30px;
    border-bottom: 1px solid #00000010;
    padding-bottom: 50px;   

    div {
        h3 {
            color: #6E6E6E;
            font-size: 14px;
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
        }
    
        p {
            color: #212121;
            font-family: 'Poppins', sans-serif;
            font-size: 16px;
            margin-right: 50px;
        }
    }

`;


const RoomInfoContainer = styled.div`

    div {

        h3 {
            color: #6E6E6E;
            font-size: 14px;
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
        }

        p {
            color: #212121;
            font-family: 'Poppins', sans-serif;
            font-size: 24px;
            margin-right: 50px;
        }
    }

`;

const InnerInfo = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin-bottom: 50px;
`;

const RoomDescription = styled.p`
    color: #363636;
    font-size: 14px;
    width: 90%;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 30px;
`;

const FacilitiesRooms = styled.div`
    h3 {
        color: #6E6E6E;
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
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

`;

const SmallFacilitie = styled(FacilitiesTab)`
    width: 121px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
