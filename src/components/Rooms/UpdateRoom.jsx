import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MainContainer } from "../Reusables/MainContainer";

import { AiOutlineArrowLeft } from "react-icons/ai";

import { useNavigate, useParams } from "react-router-dom";
import { getAllRooms, getRoom, updateRoom } from "../../features/roomsSlice";
import { SpinnerLoader } from "../Reusables/SpinnerLoader";

export const UpdateRoom = () => {

    const [roomTypeState, setRoomTypeState] = useState('');
    const [roomNumberState, setRoomNumberState] = useState(0);
    const [offerState, setOfferState] = useState(false);
    const [priceState, setPriceState] = useState(0);
    const [discountState, setDiscountState] = useState(0);
    const [amenitiesState, setAmenitiesState] = useState([]);

    const {id} = useParams();

    const roomsData = useSelector((state) => state.rooms.data);
    const status = useSelector((state) => state.rooms.status);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const amenitiesList = [
        "1/3 Bed Space",
        "Free Wifi",
        "Air Conditioner",
        "Television",
        "Towels",
        "Coffee Set",
        "24-Hour Guard",
        "Mini Bar",
        "Coffee Set",
        "Nice Views",
        "Bathtub",
        "Jacuzzi",
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleUpdate = () => {
        const dataUpdate = {
            id: id,
            room_type: roomTypeState,
            room_number: roomNumberState,
            offer_price: offerState,
            price: priceState,
            discount: discountState,
            amenities: amenitiesState
        }
        dispatch(updateRoom(dataUpdate));
        navigate('/rooms');
    }

    const handleSelectType = (e) => {
        setRoomTypeState(e.target.value);
    }

    const handleRoomNumber = (e) => {
        setRoomNumberState(e.target.value);
    }

    const handleSelectOffer = (e) => {
        setOfferState(e.target.value);
    }

    const handlePrice = (e) => {
        setPriceState(e.target.value);
    }

    const handleDiscount = (e) => {
        setDiscountState(e.target.value);
    }

    const handleAmenities = (e, amenity) => {
        if (e.target.checked) {
            setAmenitiesState([...amenitiesState, amenity]);
          } else {
            setAmenitiesState(amenitiesState.filter((item) => item !== amenity));
          }
    }

    useEffect(() => {
        let data = [...roomsData];

        try {
            setRoomTypeState(data[0].room_type);
            setRoomNumberState(data[0].room_number);
            setOfferState(data[0].offer_price);
            setPriceState(data[0].price);
            setDiscountState(data[0].discount);
            setAmenitiesState(data[0].amenities);
        } catch {
            console.log('Un error inesperado');
        }

    }, [roomsData]);

    useEffect(() => {
        dispatch(getAllRooms());
        dispatch(getRoom(id));
    }, [dispatch, id]);

    return(
        <MainContainer>
            <UpdateRoomContainer>
            {status === 'fulfilled' ?
                <>
                    <ButtonBack onClick={() => navigate('/rooms')}><AiOutlineArrowLeft/></ButtonBack>
                    <FormContainer>
                        <Title>Update Room</Title>
                        <Form onSubmit={handleSubmit}>
                        <FormBox>
                                <FormBoxInner>
                                    <div>
                                        <Label>Add 3 / 5 photos</Label>
                                        <Input type="text" placeholder="Add photos..." />
                                    </div>
                                    <div>
                                        <Label>Room Type</Label>
                                        <Select onChange={handleSelectType}>
                                            <Option>{roomTypeState}</Option>
                                            <Option>Single Bed</Option>
                                            <Option>Double Bed</Option>
                                            <Option>Suite</Option>
                                            <Option>Deluxe</Option>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Room Number</Label>
                                        <Input type="text" value={roomNumberState} onChange={handleRoomNumber}/>
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <TextArea type="text" placeholder="Room description..." ></TextArea>
                                    </div>
                                    <div>
                                        <Label>Offer</Label>
                                        <Select onChange={handleSelectOffer}>
                                            <Option>{offerState ? 'Yes' : 'No'}</Option>
                                            <Option>Yes</Option>
                                            <Option>No</Option>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Price /Night</Label>
                                        <Input type="text" value={priceState} onChange={handlePrice}/>
                                    </div>
                                    <div>
                                        <Label>Discount</Label>
                                        <Input type="number" min="0" max="100" value={discountState} onChange={handleDiscount}/>
                                    </div>                              
                                    <div>
                                    <Label>Cancellation</Label>
                                        <TextArea type="text" placeholder="Cancellation..." ></TextArea>
                                    </div>
                                </FormBoxInner>
         
                                <AmenetiesBox>
                                    <Label>Amenities</Label>
                                    <CheckBoxContainer>
                                        {amenitiesList.map((amenity, index) =>
                                            <div key={index}>
                                                <Label>{amenity}</Label>
                                                <Input type="checkbox" checked={amenitiesState.includes(amenity)} onChange={(e) => handleAmenities(e, amenity)}/>
                                            </div>
                                        )}
 
                                    </CheckBoxContainer>
                                </AmenetiesBox>
                                    
                            </FormBox>
                            <Button onClick={handleUpdate}>Update Room</Button>
                        </Form>
                    </FormContainer>
                    </>
                    : status === 'rejected' ? alert('Algo falló')
                        : <SpinnerLoader></SpinnerLoader>}
            </UpdateRoomContainer>
        </MainContainer>
    )
}

const UpdateRoomContainer = styled.div`
    margin: 20px;
    position: relative;
    max-width: 1300px;
`;


const FormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h2`
    font-size: 2em;
    color: #135846;
    font-family: 'Poppins', sans-serif;
`;

const Form = styled.form`
    width: 1050px;
    height: 660px;
    box-shadow: 0px 3px 10px #00000030;
    margin-top: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    div {
        display: flex;
        width: 90%;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        margin-top: 10px;
    }
`;

const FormBox = styled.div`
    display: flex;
`;

const FormBoxInner = styled.div`
    display:flex;
    flex-direction: column;

    div {
        width: 80%;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
    }
`;

const Select = styled.select`
    width: 140px; 
    height: 30px;
    border: 1px solid #135846;
    border-radius: 12px;
    color: #135846;
    background: none;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    margin-right: 10px;
`;

const Option = styled.option`
    background: #ffffff;
`;

const TextArea = styled.textarea`
    width: 150px;
    resize: none;
    border: none;
    outline: gray;
    border-radius: 5px;
    box-shadow: 0px 3px 10px #00000030;
    padding: 10px;
    font-family: 'Poppins', sans-serif;
    color: #262626;
`;

const Input = styled.input`
    margin-left: 20px;
    margin-bottom: 10px;
    width: 150px;
    height: 30px;
    border: none;
    outline: gray;
    border-radius: 5px;
    box-shadow: 0px 3px 10px #00000030;
    padding: 10px;
    font-family: 'Poppins', sans-serif;
    color: #262626;
`;

const Label = styled.label`
    color: #135846;
    font-family: 'Poppins', sans-serif;
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
    margin-bottom: 25px;
    border: none;
    box-shadow: 0px 3px 10px #00000030;
    position: absolute;
    bottom: 0px;
    right: 10px;

    &:hover {
        background: #799283;
    }

    &:hover {
        background: #799283 0% 0% no-repeat padding-box;
        color: #EBF1EF;
    }
`;

const AmenetiesBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const CheckBoxContainer = styled.div`
    display: flex;
    flex-wrap: wrap;

    Input {
        width: 20px;
    }

    Label {
        margin-bottom: 10px;
        margin-left: 20px;
    }

    div {
        display:flex;
        width: 35%;
        margin: 10px;
        margin-top: 25px;
        justify-content: space-between;
    }
`;


const ButtonBack = styled(Button)`
    position: absolute;
    top: 1%;
    left: 3%;
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