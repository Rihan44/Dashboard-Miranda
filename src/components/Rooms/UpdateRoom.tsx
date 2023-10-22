import styled from "styled-components";
import Swal from 'sweetalert2';

import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { MainContainer } from "../Reusables/MainContainer";

import { AiOutlineArrowLeft } from "react-icons/ai";

import { getRoom, updateRoom } from "../../features/roomsSlice";
import { AsideContext } from "../Context/ToggleAsideContext";

import { SpinnerLoader } from "../Reusables/SpinnerLoader";
import { ToastAlert } from "../Reusables/ToastAlert";
import { RoomInterface } from "../../interfaces/roomInterface";

export const UpdateRoom = () => {

    const [roomTypeState, setRoomTypeState] = useState('');
    const [roomNumberState, setRoomNumberState] = useState<string | number>(0);
    const [offerState, setOfferState] = useState(false);
    const [priceState, setPriceState] = useState<string | number>(0);
    const [discountState, setDiscountState] = useState(0);
    const [amenitiesState, setAmenitiesState] = useState<string[]>([]);
    const [roomDescription, setRoomDescription] = useState('');

    const {id} = useParams();
    const {asideState} = useContext(AsideContext);

    const roomData = useAppSelector((state) => state.rooms.dataRoom);

    const status = useAppSelector((state) => state.rooms.status);

    const dispatch = useAppDispatch();
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    }

    const handleUpdate = () => {
        const ToastUpdated = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        const dataUpdate: RoomInterface = {
            id: id,
            room_type: roomTypeState,
            room_number: roomNumberState,
            offer_price: offerState,
            price: priceState,
            discount: offerState ? discountState : 0,
            amenities: amenitiesState,
            description: roomDescription,
            status
        }
        dispatch(updateRoom(dataUpdate));
        navigate('/rooms');
        ToastUpdated.fire({
            icon: 'success',
            title: `Room with id: ${id} updated successfully!`
        })
    }

    const handleSelectType = (e: React.ChangeEvent<HTMLInputElement>): void  => {
        setRoomTypeState(e.target.value);
    }

    const handleRoomNumber = (e: React.ChangeEvent<HTMLInputElement>): void  => {
        setRoomNumberState(e.target.value);
    }

    const handleSelectOffer = (e: React.ChangeEvent<HTMLInputElement>): void  => {
        if(e.target.value === "Yes") {
            setOfferState(true);    
        } else {
            setOfferState(false);    
        }
    }

    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>): void  => {
        setPriceState(e.target.value);
    }

    const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>): void  => {
        setDiscountState(parseInt(e.target.value));
    }

    const handleAmenities = (e: React.ChangeEvent<HTMLInputElement>, amenity: string): void  => {
        if (e.target.checked) {
            setAmenitiesState([...amenitiesState, amenity]);
          } else {
            setAmenitiesState(amenitiesState.filter((item) => item !== amenity));
          }
    }

    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRoomDescription(e.target.value);
    }

    useEffect(() => {
        let data: RoomInterface[] =[...roomData];

        if(status === 'fulfilled') { 
            try {
                setRoomTypeState(data[0].room_type);
                setRoomNumberState(data[0].room_number);
                setOfferState(data[0].offer_price);
                setPriceState(data[0].price);
                setDiscountState(data[0].discount);
                setAmenitiesState(data[0].amenities);
                setRoomDescription(data[0].description);
            } catch {
                <ToastAlert></ToastAlert>
            }
        }

    }, [roomData, status]);

    useEffect(() => {
        if(id !== undefined)
            dispatch(getRoom(id));
    }, [dispatch, id]);

    return(
        <MainContainer>
            <UpdateRoomContainer>
            {status === 'fulfilled' ?
                <>
                    <ButtonBack onClick={() => navigate('/rooms')}><AiOutlineArrowLeft/></ButtonBack>
                    <FormContainer>
                        <Title>Update Room: {id}</Title>
                        <Form onSubmit={handleSubmit} darkmode={asideState.darkMode ? 0 : 1}>
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
                                        <TextArea type="text" value={roomDescription} onChange={handleDescription}></TextArea>
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
                                        {!offerState 
                                            ? <Input type="number" min="0" max="100" value={0} onChange={handleDiscount} disabled/>
                                            : <Input type="number" min="0" max="100" value={discountState} onChange={handleDiscount}/>
                                        }  
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
                                                <Input type="checkbox" checked={amenitiesState.includes(amenity)} onChange={(e:React.ChangeEvent<HTMLInputElement> ) => handleAmenities(e, amenity)}/>
                                            </div>
                                        )}
 
                                    </CheckBoxContainer>
                                </AmenetiesBox>
                                    
                            </FormBox>
                            <Button onClick={handleUpdate}>Update Room</Button>
                        </Form>
                    </FormContainer>
                    </>
                    : status === 'rejected' ? <ToastAlert></ToastAlert>
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

const Form = styled.form<{darkmode: number}>`
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
    background-color: ${props => props.darkmode === 0 ? '#202020' : '#ffff'};
    transition: 0.5s;

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

const Select = styled.select<{onChange: any}>`
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

const TextArea = styled.textarea<{type?: string, onChange?: any, placeholder?: string}>`
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

const Input = styled.input<{type?: string, value?: number | string}>`
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