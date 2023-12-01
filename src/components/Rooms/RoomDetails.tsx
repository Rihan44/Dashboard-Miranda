import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import error_image from '../../assets/error_image3.png';

import styled from "styled-components";
import { format } from "date-fns";

import { LiaBedSolid } from "react-icons/lia";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdAir } from "react-icons/md";
import { AiOutlineWifi } from "react-icons/ai";
import { BsShieldCheck } from "react-icons/bs";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { GiTowel } from "react-icons/gi";
import { MdOutlineLocalBar } from "react-icons/md";
import { FaCoffee } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BiBath } from "react-icons/bi";
import { BsEmojiHeartEyes } from "react-icons/bs";

import { MainContainer } from "../Reusables/MainContainer";
import { SpinnerLoader } from "../Reusables/SpinnerLoader";
import { AsideContext } from "../Context/ToggleAsideContext";
import { getRoom } from "../../features/slices/rooms/roomThunk";
import { RoomInterface } from "../../interfaces/roomInterface";

export const RoomDetail = () => {

    const { asideState } = useContext(AsideContext);
    let darkMode: boolean = asideState?.darkMode || false;
    
    const navigate = useNavigate();

    const [dataRoom, setDataRoom] = useState<RoomInterface>({
        _id: '',
        room_photo: '',
        room_type: '',
        room_number: '',
        amenities: [],
        price: 0, 
        discount: 0,
        status: '',
        description: ''
    });

    const roomDetail = useAppSelector((state) => state.rooms.dataRoom);
    const status = useAppSelector((state) => state.rooms.status);

    const paramsID = useParams();
    const id: string | undefined = paramsID.id;
    const dispatch = useAppDispatch();

    useEffect(() => {
        let data: RoomInterface = roomDetail;
        
        if(status === 'fulfilled') 
        setDataRoom(data);

    }, [roomDetail])

    useEffect(() => {
        if (id !== undefined)
            dispatch(getRoom(id));

    }, [dispatch, id])

    return (
        <MainContainer>
            {status === 'fulfilled' ?
                <FileRoomContainer>
                    <ButtonBack onClick={() => navigate('/bookings')}><AiOutlineArrowLeft /></ButtonBack>
                    <InfoContainer>
                        <NameContainer >
                            <NameTitle darkmode={darkMode ? 0 : 1}></NameTitle>
                            <NameParagraph>{dataRoom._id}</NameParagraph>
                        </NameContainer>

                        <RoomInfoContainer>
                            <InnerInfo>
                                <InnerInfoContainer>
                                    <InnerInfoTitle darkmode={darkMode ? 0 : 1}>Room Info</InnerInfoTitle>
                                    <InnerInfoParagraph darkmode={darkMode ? 0 : 1}>{dataRoom.room_type} Nº {dataRoom.room_number}</InnerInfoParagraph>
                                </InnerInfoContainer>
                                <InnerInfoContainer>
                                    <InnerInfoTitle darkmode={darkMode ? 0 : 1}>Price</InnerInfoTitle>
                                    <InnerInfoParagraph darkmode={darkMode ? 0 : 1}>{dataRoom.price}<small>/night</small></InnerInfoParagraph>
                                </InnerInfoContainer>
                            </InnerInfo>
                            <RoomDescription darkmode={darkMode ? 0 : 1}>{dataRoom.description}</RoomDescription>
                        </RoomInfoContainer>
                        <FacilitiesRooms darkmode={darkMode ? 0 : 1}>
                            <h3>Facilities</h3>
                            <FacilitiesInner>
                            </FacilitiesInner>
                        </FacilitiesRooms>
                    </InfoContainer>
                    <ImageContainer>
                        {dataRoom?.room_photo 
                            ? <ImageRoom src={dataRoom.room_photo}/>
                            : <ImageRoom src='https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg?width=2560'/>        
                        }      
                        <ImageDescription>
                            <h3>Bed Room</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </ImageDescription>
                    </ImageContainer>
                </FileRoomContainer>
                : status === 'rejected' ? <ImageRejected src={error_image}/>
                    : <SpinnerLoader></SpinnerLoader>}
        </MainContainer>
    )
}

const FileRoomContainer = styled.div`
    margin-top: 35px;
    margin-left: 50px;
    width: 1475px;
    height: 750px;
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
    overflow-x: scroll;
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
    width: 150px;
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
    overflow: hidden;
    position: relative;
    background-color: #C5C5C5;
    border-radius: 0px 10px 10px 0px;
    display: flex;
    height: 100%;
`;

const ImageRoom = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
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
        color: #FFFFFF;
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
        font-weight: 300;
    }

`;

const StatusDecoration = styled.div<{ status: string }>`
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

    width: 200px;
    height: 50px;
    color: rgb(255, 255, 255);
    border-radius: 10px;
    display: flex;
    -moz-box-align: center;
    align-items: center;
    -moz-box-pack: center;
    justify-content: center;
    font-size: 16px;
    font-family: "Poppins", sans-serif;
    position: absolute;
    right: -45px;
    top: 3%;
    transform: rotate(44deg);
    border: 3px solid #fff;
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
    top: 0%;
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

const ImageRejected = styled.img`
    width:  600px;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 140px;
`;