import styled from "styled-components"
import { useContext } from "react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";

import { MainContainer } from "../Reusables/MainContainer"

import { AiOutlineArrowLeft } from "react-icons/ai";
import { AsideContext } from "../Context/ToggleAsideContext";

import { createUser } from "../../features/usersSlice";
import { UsersInterface } from "../../interfaces/usersInterface";
import { Props } from "../../interfaces/Props";

export const AddUser = () => {

    /* TODO MODAL QUE DIGA QUE SE4 HA AÑADIDO CORRECTAMENTE */

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPosition, setUserPosition] = useState('');
    const [userNumber, setUserNumber] = useState<string | number>(0);
    const [userHireDate, setUserHireDate] = useState<string | Date>(new Date());
    const [userJobDescription, setUserJobDescription] = useState('');
    const [userStatus, setUserStatus] = useState(true);
    const [userPassword, setUserPassword] = useState('');

    const [alert, setAlert] = useState('false');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { asideState } = useContext(AsideContext);

    const idAleatorio = () => {
        const numeroAleatorio = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const letraAleatoria = letras.charAt(Math.floor(Math.random() * letras.length));

        return numeroAleatorio + letraAleatoria;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    }

    const handleUpdate = () => {
        const id = idAleatorio();
        const hireDate = userHireDate;

        const newDate = new Date(hireDate);
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const day = String(newDate.getDate()).padStart(2, '0');
        const formatedDate = `${year}-${month}-${day}`;

        const updateData: UsersInterface = {
            id: id,
            name: userName,
            email: userEmail,
            employee_position: userPosition,
            phone_number: userNumber,
            hire_date: formatedDate,
            job_description: userJobDescription,
            status: userStatus,
            password_hash: userPassword
        }

        if(userName !== '' && userEmail !== '') {
            dispatch(createUser(updateData));
            navigate('/users');
            setAlert('false');
        } else {
            setAlert('true');
        }
    }

    const handleName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserName(e.target.value);
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserEmail(e.target.value);
    }

    const handlePosition = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserPosition(e.target.value);
    }

    const handleNumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserNumber(e.target.value);
    }

    const handleHireDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserHireDate(e.target.value);
    }

    const handleJobDescription = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserJobDescription(e.target.value);
    }

    const handleStatus = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.value === "Active") {
            setUserStatus(true);
        } else {
            setUserStatus(false);
        }
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserPassword(e.target.value);
    }

    return (
        <>
            <MainContainer>
                <AddUserContainer>
                <ButtonBack onClick={() => navigate('/users')}><AiOutlineArrowLeft /></ButtonBack>
                    <FormContainer>
                        <Title>Add User</Title>
                        <Form onSubmit={handleSubmit} darkmode={asideState.darkMode}>
                            <FormBox>
                                <FormBoxInner>
                                    <ErrorParagraph visible={alert}>
                                        {userName === '' && userEmail === ''
                                            ? 'Fill in at least the name and email'
                                            : userName === '' && userEmail !== '' 
                                                ? 'Fill the name too'
                                                : userName !== '' && userEmail === '' 
                                                    && 'Fill the email too'
                                        }
                                    </ErrorParagraph>
                                    <div>
                                        <Label>Add 1 photo</Label>
                                        <Input type="file" placeholder="Add photos..." />
                                    </div>
                                    <div>
                                        <Label>Full Name</Label>
                                        <Input type="text" placeholder="Olivia Johns..." onChange={handleName} />
                                    </div>
                                    <div>
                                        <Label>Position</Label>
                                        <Select onChange={handlePosition}>
                                            <Option>Manager</Option>
                                            <Option>Receptionist</Option>
                                            <Option>Room Service</Option>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <Input type="text" placeholder="gmail@gmail.com..." onChange={handleEmail} />
                                    </div>
                                    <div>
                                        <Label>Phone Number</Label>
                                        <Input type="text" placeholder="61087632..." onChange={handleNumber} />
                                    </div>
                                    <div>
                                        <Label>Start Date</Label>
                                        <Input type="date" onChange={handleHireDate} />
                                    </div>
                                    <div>
                                        <Label>Functions Descriptions</Label>
                                        <TextArea type="textarea" placeholder="Manage de hotel..." onChange={handleJobDescription}></TextArea>
                                    </div>
                                    <div>
                                        <Label>Password</Label>
                                        <Input type="password" placeholder="Password..." onCanPlay={handlePassword} />
                                    </div>
                                    <StatusContainer>
                                        <Label>Status</Label>
                                        <CheckBoxContainer>
                                            <div>
                                                <Label style={{ color: '#5AD07A' }}>Active</Label>
                                                <Input type="checkbox" value="Active" onChange={handleStatus} />
                                            </div>
                                            <div>
                                                <Label style={{ color: '#E23428' }}>Inactive</Label>
                                                <Input type="checkbox" value="Inactive" onChange={handleStatus} />
                                            </div>
                                        </CheckBoxContainer>
                                    </StatusContainer>
                                </FormBoxInner>
                            </FormBox>
                            <Button onClick={handleUpdate}>Add User</Button>
                        </Form>
                    </FormContainer>
                </AddUserContainer>
            </MainContainer>
        </>
    )
}

const AddUserContainer = styled.div`
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
    position: relative;
`;

const Title = styled.h2`
    font-size: 2em;
    color: #135846;
    font-family: 'Poppins', sans-serif;
`;

const Form = styled.form<Props>`
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

const Select = styled.select<Props>`
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

const TextArea = styled.textarea<Props>`
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
    z-index: 10;
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

const ErrorParagraph = styled.p<Props>`
    position: absolute;
    top: 12px;
    color: #E23428;
    transition: 0.3s;
    opacity: ${props => props.visible === 'true' ? 1 : 0};
`;