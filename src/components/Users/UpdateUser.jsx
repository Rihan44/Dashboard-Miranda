import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";

import { MainContainer } from "../Reusables/MainContainer";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { updateUser } from "../../features/usersSlice";
import { AsideContext } from "../Context/ToggleAsideContext";
import { ToastAlert } from "../Reusables/ToastAlert";
import { SpinnerLoader } from "../Reusables/SpinnerLoader";


export const UpdateUser = () => {

    const [dataUsers, setDataUsers] = useState([]);

    const navigate = useNavigate();

    const userData = useSelector((state) => state.rooms.dataUser);

    const status = useSelector((state) => state.rooms.status);

    const dispatch = useDispatch();
    const {asideState} = useContext(AsideContext);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleUpdate = () => {
        dispatch(updateUser());
        navigate('/rooms');
    }


    useEffect(() => {
        let data = [...userData];
        data.forEach(info => {
            setDataUsers(info);
        });

    }, [userData]);

    return (
        <>
            <MainContainer>
                <UpdateUserContainer>
                {status === 'fulfilled' ?
                <>
                    <ButtonBack onClick={() => navigate('/users')}><AiOutlineArrowLeft /></ButtonBack>
                    <FormContainer>
                        <Title>Update User</Title>
                        <Form onSubmit={handleSubmit} darkmode={asideState.darkMode}>
                            <FormBox>
                                <FormBoxInner>
                                    <div>
                                        <Label>Add 1 photo</Label>
                                        <Input type="file" placeholder="Add photos..." />
                                    </div>
                                    <div>
                                        <Label>Full Name</Label>
                                        <Input type="text" placeholder={dataUsers ? dataUsers.name : 'Full name...'} />
                                    </div>
                                    <div>
                                        <Label>Position</Label>
                                        <Select>
                                            <Option>Manager</Option>
                                            <Option>Receptionist</Option>
                                            <Option>Room Service</Option>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <Input type="text" placeholder={dataUsers ? dataUsers.email : "Email..."} />
                                    </div>
                                    <div>
                                        <Label>Phone Number</Label>
                                        <Input type="text" placeholder={dataUsers ? dataUsers.phone_number : "Phone number..."} />
                                    </div>
                                    <div>
                                        <Label>Start Date</Label>
                                        <Input type="date" placeholder={dataUsers ? dataUsers.hire_date : "Start date..."} />
                                    </div>
                                    <div>
                                        <Label>Functions Descriptions</Label>
                                        <TextArea type="text" placeholder={dataUsers ? dataUsers.job_description : "Job description..."} ></TextArea>
                                    </div>
                                    <div>
                                        <Label>Password</Label>
                                        <Input type="password" placeholder={dataUsers ? dataUsers.password_hash : "Password..."} />
                                    </div>
                                    <StatusContainer>
                                        <Label>Status</Label>
                                        <CheckBoxContainer>
                                            <div>
                                                <Label style={{ color: '#5AD07A' }}>Active</Label>
                                                <Input type="checkbox" value="Active" checked={dataUsers.status}/>
                                            </div>
                                            <div>
                                                <Label style={{ color: '#E23428' }}>Inactive</Label>
                                                <Input type="checkbox" value="Inactive" checked={dataUsers.status}/>
                                            </div>
                                        </CheckBoxContainer>
                                    </StatusContainer>
                                </FormBoxInner>
                            </FormBox>
                            <Button>Update User</Button>
                        </Form>
                    </FormContainer>
                    </>
                    : status === 'rejected' ? <ToastAlert></ToastAlert>
                        : <SpinnerLoader></SpinnerLoader>}
                </UpdateUserContainer>
            </MainContainer>
        </>
    )
}

const UpdateUserContainer = styled.div`
    margin: 20px;
    min-width: 1400px;
    position: relative;
`;

const FormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 1400px;
`;

const Title = styled.h2`
    font-size: 2em;
    color: #135846;
    font-family: 'Poppins', sans-serif;
`;

const Form = styled.form`
    width: 600px;
    height: 700px;
    box-shadow: 0px 3px 10px #00000030;
    margin-top: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: ${props => props.darkmode ? '#202020' : '#ffff'};
    transition: 0.5s;

    div {
        display: flex;
        width: 90%;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;
    }
`;

const FormBox = styled.div`
    display: flex;
    margin-top: 20px;
`;

const FormBoxInner = styled.div`
    display:flex;
    flex-direction: column;

    div {
        width: 70%;
        display: flex;
        align-items: center;
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

const StatusContainer = styled.div`
    display: flex;
    flex-direction: column;

    label {
        margin-right: 15px;
    }

    div {
        margin-right: 10px;
    }
`;