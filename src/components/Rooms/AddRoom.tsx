import styled from "styled-components";
import Swal from 'sweetalert2';

import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";

import { MainContainer } from "../Reusables/MainContainer"

import { AiOutlineArrowLeft } from "react-icons/ai";
import { createRoom } from "../../features/roomsSlice";
import { roomsData } from "../../data/roomsData";
import { RoomInterface } from "../../interfaces/roomInterface";

export const AddRoom = () => {

    const [roomTypeState, setRoomTypeState] = useState('Single Bed');
    const [roomNumberState, setRoomNumberState] = useState('');
    const [offerState, setOfferState] = useState(false);
    const [priceState, setPriceState] = useState('');
    const [discountState, setDiscountState] = useState(0);
    const [amenitiesState, setAmenitiesState] = useState<string[]>([]);
    const [roomDescription, setRoomDescription] = useState('');

    const [sameNumberAlert, setSameNumberAlert] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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

    const idAleatorio = () => {
        const numeroAleatorio = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const letraAleatoria = letras.charAt(Math.floor(Math.random() * letras.length));

        return numeroAleatorio + letraAleatoria;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    }

    const handleUpdate = async () => {
        const id = idAleatorio();

        const roomType = roomTypeState === '' ? 'Single Bed' : roomTypeState;
        const roomNumber = roomNumberState === '' ? '0' : roomNumberState;
        const price = priceState === '' ? '30' : priceState;
        const descriptionDefault = roomDescription === '' ? 'This is a default description for the room' : roomDescription;
        const amenitiesDefault = amenitiesState.length === 0 ? ['Free Wifi', 'Air Conditioner', 'Towels', 'Television'] : amenitiesState;

        const dataUpdate: RoomInterface = {
            id: id,
            room_type: roomType,
            room_number: roomNumber,
            offer_price: offerState,
            price: price,
            status: "available",
            discount: offerState ? discountState : 0,
            amenities: amenitiesDefault,
            description: descriptionDefault
        }
        
        const ToastAdd = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        if (roomTypeState === 'Single Bed' && roomNumberState === '' &&
            priceState === '' && roomDescription === '' && amenitiesState.length === 0) {

            const { value: accept } = await Swal.fire({
                title: 'Are you sure yo want to add a room with the default values?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#135846',
                cancelButtonColor: '#E23428',
                confirmButtonText: 'Yes!'
            })

            if (accept) {
                ToastAdd.fire({
                    icon: 'success',
                    title: 'Added room successfully!'
                })
                dispatch(createRoom(dataUpdate));
                navigate('/rooms');
            }
        } else if(sameNumberAlert){
            Swal.fire({
                title: 'You cant add a room if the room number already exists',
                icon: 'warning',
                confirmButtonColor: '#135846',
                confirmButtonText: 'Ok'
            })
        } else if(!sameNumberAlert) {
            ToastAdd.fire({
                icon: 'success',
                title: 'Added room successfully!'
            })
            dispatch(createRoom(dataUpdate));
            navigate('/rooms');
        }
    }

    const handleSelectType = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRoomTypeState(e.target.value);
    }

    const handleRoomNumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const roomExist = roomsData.find((data) => data.room_number === parseInt(e.target.value)) || '';
        setRoomNumberState(e.target.value);
        
        if(roomExist === ''){
            setSameNumberAlert(false);
        } else {
            setSameNumberAlert(true);
        }
        
    }

    const handleSelectOffer = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.value === "Yes") {
            setOfferState(true);
        } else {
            setOfferState(false);
        }
    }

    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPriceState(e.target.value);
    }

    const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setDiscountState(parseInt(e.target.value));
    }

    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRoomDescription(e.target.value);
    }

    const handleAmenities = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setAmenitiesState((prevAmenities) => { return [...prevAmenities, value] });
    }

    return (
        <>
            <MainContainer>
                <AddRoomContainer>
                    <ButtonBack onClick={() => navigate('/rooms')}><AiOutlineArrowLeft /></ButtonBack>
                    <FormContainer >
                        <Title>Room Form</Title>
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
                                            <Option>Single Bed</Option>
                                            <Option>Double Bed</Option>
                                            <Option>Suite</Option>
                                            <Option>Deluxe</Option>
                                        </Select>
                                    </div>
                                    <div style={{position: 'relative'}}>
                                        <Label>Room Number</Label>
                                        <Input type="text" placeholder="049..." onChange={handleRoomNumber} />
                                        <ErrorNumber visible={sameNumberAlert ? 0 : 1}>The room number already exists</ErrorNumber>
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <TextArea type="text" placeholder="This rooms have single bed, is beautiful..." onChange={handleDescription}></TextArea>
                                    </div>
                                    <div>
                                        <Label>Offer</Label>
                                        <Select onChange={handleSelectOffer}>
                                            <Option>No</Option>
                                            <Option>Yes</Option>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Price /Night</Label>
                                        <Input type="text" placeholder="145..." onChange={handlePrice} />
                                    </div>
                                    <div>
                                        {!offerState
                                            ? <Label style={{ color: 'grey' }}><del>Discount</del></Label>
                                            : <Label>Discount</Label>
                                        }
                                        {!offerState
                                            ? <Input type="number" min="0" max="100" placeholder="0..." onChange={handleDiscount} disabled />
                                            : <Input type="number" min="0" max="100" placeholder="20%..." onChange={handleDiscount} />
                                        }
                                    </div>
                                    <div>
                                        <Label>Cancellation</Label>
                                        <TextArea type="text" placeholder="Cancellation..." ></TextArea>
                                    </div>
                                </FormBoxInner>
                                <AmenitiesBox>
                                    <Label>Amenities</Label>
                                    <CheckBoxContainer>
                                        {amenitiesList.map((e, index) =>
                                            <div key={index}>
                                                <Label>{e}</Label>
                                                {
                                                    e === 'Free Wifi' || e === 'Towels' || e === 'Air Conditioner' || e === 'Television'
                                                        ? <Input type="checkbox" checked value={e} onChange={handleAmenities} />
                                                        : <Input type="checkbox" value={e} onChange={handleAmenities} />
                                                }

                                            </div>
                                        )}
                                    </CheckBoxContainer>
                                </AmenitiesBox>
                            </FormBox>
                            <Button onClick={handleUpdate}>Add Room</Button>
                        </Form>
                    </FormContainer>
                </AddRoomContainer>
            </MainContainer>
        </>
    )
}

const AddRoomContainer = styled.div`
    margin: 20px;
    position: relative;
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

const Form = styled.form<{ onSubmit: any }>`
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
    transition: 0.5s;
    background: #ffff;

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

const Select = styled.select<{ onChange: any }>`
    width: 129px; 
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

const TextArea = styled.textarea<{ type: string, placeholder?: string, onChange?: any }>`
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

const AmenitiesBox = styled.div`
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

const ErrorNumber = styled.p<{visible: number}>`
    position: absolute;
    bottom: -15px;
    font-size: 14px;
    color: #E23428;
    transition: 0.5;
    opacity: ${props => props.visible === 0 ? '1' : '0'};
`;