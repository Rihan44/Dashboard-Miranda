import styled from "styled-components"
import { MainContainer } from "../Reusables/MainContainer"

export const RoomsForm = () => {

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

    /* TODO CONTROLAR DATOS Y QUE SALGA MODAL DE QUE SE HA GUARDADO CORRECTAMENTE */

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <MainContainer>
                <AddRoomContainer>
                    <FormContainer>
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
                                        <Select>
                                            <Option>Single Bed</Option>
                                            <Option>Double Bed</Option>
                                            <Option>Suite</Option>
                                            <Option>Deluxe</Option>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Room Number</Label>
                                        <Input type="text" placeholder="186..." />
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <TextArea type="text" placeholder="Room description..." ></TextArea>
                                    </div>
                                    <div>
                                        <Label>Offer</Label>
                                        <Select>
                                            <Option>Yes</Option>
                                            <Option>No</Option>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Price /Night</Label>
                                        <Input type="text" placeholder="296.50..." />
                                    </div>
                                    <div>
                                        <Label>Discount</Label>
                                        <Input type="number" min="0" max="100" placeholder="20%..." />
                                    </div>                              
                                    <div>
                                    <Label>Cancellation</Label>
                                        <TextArea type="text" placeholder="Cancellation..." ></TextArea>
                                    </div>
                                </FormBoxInner>
                                <AmenetiesBox>
                                    <Label>Amenities</Label>
                                    <CheckBoxContainer>
                                        {amenitiesList.map(e =>
                                            <div>
                                                <Label>{e}</Label>
                                                <Input type="checkbox" value={e} />
                                            </div>
                                        )}
                                    </CheckBoxContainer>
                                </AmenetiesBox>
                            </FormBox>
                            <Button>Add Room</Button>
                        </Form>
                    </FormContainer>
                </AddRoomContainer>
            </MainContainer>
        </>
    )
}

const AddRoomContainer = styled.div`
    margin: 20px;
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