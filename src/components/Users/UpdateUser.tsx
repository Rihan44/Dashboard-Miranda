import styled from "styled-components";
import Swal from 'sweetalert2';

import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import error_image from '../../assets/error_image3.png';

import { MainContainer } from "../Reusables/MainContainer";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { SpinnerLoader } from "../Reusables/SpinnerLoader";
import { UsersInterface } from "../../interfaces/usersInterface";
import { getAllUsers, getUser, updateUser } from "../../features/thunks/usersThunk";

export const UpdateUser = () => {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPosition, setUserPosition] = useState('');
    const [userNumber, setUserNumber] = useState<string | number>(0);
    const [userHireDate, setUserHireDate] = useState('');
    const [userJobDescription, setUserJobDescription] = useState('');
    const [userStatus, setUserStatus] = useState(true);
    const [userPassword, setUserPassword] = useState('');

    const navigate = useNavigate();

    const userData = useAppSelector((state) => state.users.dataUser);
    const status = useAppSelector((state) => state.users.status);

    const dispatch = useAppDispatch();

    const { id } = useParams();

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void  => {
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

        const updateData: UsersInterface = {
            _id: id,
            name: userName,
            email: userEmail,
            employee_position: userPosition,
            phone_number: userNumber,
            hire_date: userHireDate,
            job_description: userJobDescription,
            status: userStatus,
            password_hash: userPassword
        }
        dispatch(updateUser(updateData)) 
            .then(() => {
                dispatch(getAllUsers());
                navigate('/users');
            });
        ToastUpdated.fire({
            icon: 'success',
            title: `User with id: ${id} updated successfully!`
        })
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
        if (e.target.checked) {
            setUserStatus(true);
        } else {
            setUserStatus(false);
        }
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserPassword(e.target.value);
    }

    useEffect(() => {
        let data: UsersInterface = userData;
        
        if (status === 'fulfilled') {
            try {
                setUserName(data.name);
                setUserEmail(data.email);
                setUserPosition(data.employee_position);
                setUserNumber(data.phone_number);
                setUserHireDate(data.hire_date);
                setUserJobDescription(data.job_description);
                setUserStatus(data.status);
                setUserPassword(data.password_hash);
            } catch (error) {
                console.log(error);
            }
        } else if(status === 'idle'){
            dispatch(getUser(id || ''));
        }

    }, [userData, status]);
    
    return (
        <>
            <MainContainer>
                <UpdateUserContainer>
                    {status === 'fulfilled' ?
                        <>
                            <ButtonBack onClick={() => navigate('/users')}><AiOutlineArrowLeft /></ButtonBack>
                            <FormContainer>
                                <Title>Update User: {id}</Title>
                                <Form onSubmit={handleSubmit}>
                                    <FormBox>
                                        <FormBoxInner>
                                            <div>
                                                <Label>Add 1 photo</Label>
                                                <Input type="file" placeholder="Add photos..."/>
                                            </div>
                                            <div>
                                                <Label>Full Name</Label>
                                                <Input type="text" value={userName} onChange={handleName} />
                                            </div>
                                            <div>
                                                <Label>Position</Label>
                                                <Select onChange={handlePosition}>
                                                    <Option>{userPosition}</Option>
                                                    <Option>Manager</Option>
                                                    <Option>Receptionist</Option>
                                                    <Option>Room Service</Option>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label>Email</Label>
                                                <Input type="text" value={userEmail} onChange={handleEmail} />
                                            </div>
                                            <div>
                                                <Label>Phone Number</Label>
                                                <Input type="text" value={userNumber} onChange={handleNumber} />
                                            </div>
                                            <div>
                                                <Label>Start Date</Label>
                                                <Input type="datetime-local" value={userHireDate} onChange={handleHireDate} />
                                            </div>
                                            <div>
                                                <Label>Functions Descriptions</Label>
                                                <TextArea type="text" value={userJobDescription} onChange={handleJobDescription}></TextArea>
                                            </div>
                                            <div>
                                                <Label>Password</Label>
                                                <Input type="password" value={userPassword} onChange={handlePassword} />
                                            </div>
                                            <StatusContainer>
                                                <CheckBoxContainer>
                                                    <div style={{width: '42%', position: 'relative'}}>
                                                        <LabelSwitch>
                                                            <input type="checkbox" onChange={handleStatus} defaultChecked={userData.status}/> 
                                                            <span></span>
                                                        </LabelSwitch>
                                                        {userStatus 
                                                            ? <StatusCheck is_active={0}>Active</StatusCheck>
                                                            : <StatusCheck is_active={1}>InActive</StatusCheck>
                                                        }
                                                    </div>
                                                </CheckBoxContainer>
                                            </StatusContainer>
                                        </FormBoxInner>
                                    </FormBox>
                                    <Button onClick={handleUpdate}>Update User</Button>
                                </Form>
                            </FormContainer>
                        </>
                        : status === 'rejected' ? <ImageRejected src={error_image}/>
                            : status === 'pending' && <SpinnerLoader></SpinnerLoader>}
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

const Form = styled.form<{onSubmit: any}>`
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

const Select = styled.select<{onChange: any}>`
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

const TextArea = styled.textarea<{type: string, onChange?: any}>`
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

const Input = styled.input<{type: string, value?: any, placeholder?: string, onChange?: any}>`
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

    small {
        color: #212121;
        font-size: 16px;
    }
`;

const LabelSwitch = styled.label`
    margin: 0;
    margin-right: 0;
    margin-left: 0;
    font-size: 1rem;
    position: relative;
    display: inline-block;
    width: 200px;
    height: 2em;

    input {
        opacity: 0;
        width: 0;
        height: 0;
        &:checked+span:before {
            transform: translateX(2em);
            background: #5AD07A;
        }
    }

    span {
        position: absolute;
        cursor: pointer;
        inset: 0;
        background-color: #eee;
        transition: 0.4s;
        border-radius: 0.5em;
        box-shadow: 0 0.2em #dfd9d9;

        &:before {
            position: absolute;
            content: "";
            height: 1.5em;
            width: 1.4em;
            border-radius: 0.3em;
            left: 0.3em;
            bottom: 0.7em;
            background-color: #E23428;
            transition: 0.4s;
            box-shadow: 0 0.4em #bcb4b4;
        }

        &:hover::before {
            box-shadow: 0 0.2em #bcb4b4;
            bottom: 0.5em;
        }
    }
`

const StatusCheck = styled.p<{is_active: number}>`
    transition: 0.5s;
    position: absolute;
    right: ${props => props.is_active === 0 ? '-90px' :'-115px'};
    bottom: 10px;
    text-transform: uppercase;
    color: ${props => props.is_active === 0 ? '#5AD07A' : '#E23428'};
    font-family: 'Poppins', sans-serif;
    font-size: 1.3em;
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
    z-index: 10;

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

const ImageRejected = styled.img`
    width:  600px;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 140px;
`;
