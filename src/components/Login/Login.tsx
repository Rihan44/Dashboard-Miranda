import styled from "styled-components"
import Swal from 'sweetalert2';

import { FormEvent, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { login } from "../../features/thunks/loginThunk";

import { AuthContext } from "../Context/AuthContainer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DeleteSpinner } from "../Reusables/DeleteSpinner";

export const Login = () => {

    const [inputTextEmail, setInputTextEmail] = useState('');
    const [inputTextPass, setInputTextPass] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    const {auth, authDispatch} = useContext(AuthContext);

    const loginData = useAppSelector((state) => state.login.data);
    const loginStatus = useAppSelector((state) => state.login.status);
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>): void {
        setInputTextEmail(e.target.value);   
    }

    function handleChangePass(e: React.ChangeEvent<HTMLInputElement>): void {
        setInputTextPass(e.target.value);   
    }

    function handleFastLogin(): void {
        setInputTextEmail('asdev@gmail.com');   
        setInputTextPass('admin');   
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        const loginUser = {
            email: inputTextEmail,
            password: inputTextPass
        }
    
        dispatch(login(loginUser));
    }

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        
        if(auth.authenticated && token === loginData.token){
            navigate('/');
        } else {
            navigate('/login');
        }

        const ToastLogin = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        if (loginStatus === 'fulfilled') {
            authDispatch({
                type: 'LOGIN',
                payload: {
                    authenticated: true,
                    username: loginData.payload.user || 'us',
                    email: loginData.payload.email || 'em',
                    imageSrc: loginData.payload.userPhoto || 'ph',
                },
            });

            ToastLogin.fire({
                icon: 'success',
                title: 'Login successfully!'
            })

            setIsCorrect(false);

        } else if(loginStatus === 'rejected') {
            setIsCorrect(true);

            ToastLogin.fire({
                icon: 'error',
                title: 'Authentication failed'
            });
        }
    }, [loginStatus, loginData, authDispatch, navigate, auth.authenticated]);

    return(
        <LoginContainer>
            <Title>Login Miranda Dashboard</Title>
            <FormContainer onSubmit={handleSubmit}>
                {loginStatus === 'pending' && <DeleteSpinner></DeleteSpinner>}
                <Label>Email</Label>
                <Input type="text" value={inputTextEmail || ''} placeholder="email@gmail.com..." onChange={handleChangeEmail} data-cy='inputUserEmail'/>
                <Label>Password</Label>
                <Input type="password" value={inputTextPass || ''} placeholder="password..." onChange={handleChangePass} data-cy='inputPasswordUser'/>
                <Button data-cy="loginButton">Login</Button>
                <Button style={{marginTop: '0', background: 'rgb(19, 88, 70)', color: '#ffff'}} onClick={handleFastLogin}>Fast Login</Button>
                <FormParagraph>Email Test: <small>asdev@gmail.com</small></FormParagraph>
                <FormParagraph>Pass Test: <small>admin</small></FormParagraph>
                {isCorrect ? <WrongParagraph data-cy="loginError">The username or password is incorrect</WrongParagraph>: ''}
            </FormContainer>
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
    width: 100%;
    height: 90vh;
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

const FormContainer = styled.form`
    width: 350px;
    height: auto;
    box-shadow: 0px 3px 10px #00000030;
    margin-top: 50px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
    width: 90%;
    height: 50px;
    border: none;
    outline: gray;
    padding-right: 20px;
    border-radius: 5px;
    box-shadow: 0px 3px 10px #00000030;
    padding: 10px;
    margin: 20px 20px;
`;

const Label = styled.label`
    color: #135846;
    font-family: 'Poppins', sans-serif;
    &:nth-child(1) {
        margin-top: 20px;
    }
`;

const Button = styled.button` 
    background: #EBF1EF 0% 0% no-repeat padding-box;
    border-radius: 8px;
    color: #135846;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    width: 158px;
    height: 47px;
    border: none;
    cursor: pointer;
    transition: .4s;
    margin: 20px 30px;

    &:hover {
        background: #799283 0% 0% no-repeat padding-box;
        color: #EBF1EF;
    }
`;

const FormParagraph = styled.p`
    color: #135846;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 20px;

    small {
        color: #262626;
    }
`

const WrongParagraph = styled(FormParagraph)`
    color: #E23428;
`;