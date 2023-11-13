import styled from "styled-components"
import Swal from 'sweetalert2';

import fetch from 'cross-fetch';

import { FormEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/AuthContainer";

export const Login = () => {

    const navigate = useNavigate();
    // const apiUrl = 'http://localhost:3000/';
    const apiUrl = 'https://rx3866rpnh.execute-api.eu-west-1.amazonaws.com/';
    
    const [inputTextEmail, setInputTextEmail] = useState('');
    const [inputTextPass, setInputTextPass] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const {auth, authDispatch} = useContext(AuthContext);

    const userAdmin = {
        user: "ASdev",
        email: "asmuela.dev@gmail.com",
        password: 'ASdev12345'
    }

    function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>): void {
        setInputTextEmail(e.target.value);   
    }

    function handleChangePass(e: React.ChangeEvent<HTMLInputElement>): void {
        setInputTextPass(e.target.value);   
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>): void{
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

        e.preventDefault();

        if(inputTextEmail === userAdmin.email && inputTextPass === userAdmin.password){
            setIsCorrect(false);
            
            fetch(`${apiUrl}login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user: userAdmin.user,
                  email: inputTextEmail,
                  password: inputTextPass
                }),
              })
                .then((response) => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    ToastLogin.fire({
                        icon: 'error',
                        title: 'Authentication failed'
                    });
                  }
                })
                .then((data) => {
                  const tokenLogin = data.token;
                  authDispatch({type: 'LOGIN', payload: {authenticated: true, username: userAdmin.user, email: userAdmin.email, token: tokenLogin}})
                    navigate('/');
                })
                .catch((error) => {
                  setIsCorrect(true);
                });
                
            ToastLogin.fire({
                icon: 'success',
                title: 'Login successfully!'
            })
        } else {
            setIsCorrect(true);
            ToastLogin.fire({
                icon: 'error',
                title: 'Error with the user or the pass'
            })
        }
        
    }

    return(
        <LoginContainer>
            <Title>Login Miranda Dashboard</Title>
            <FormContainer onSubmit={handleSubmit}>
                <Label>Email</Label>
                <Input type="text" placeholder="email@gmail.com..." onChange={handleChangeEmail} data-cy='inputUserEmail'/>
                <Label>Password</Label>
                <Input type="password" placeholder="password..." onChange={handleChangePass} data-cy='inputPasswordUser'/>
                <Button data-cy="loginButton">Login</Button>
                <FormParagraph>Email Test: <small>asmuela.dev@gmail.com</small></FormParagraph>
                <FormParagraph>Pass Test: <small>ASdev12345</small></FormParagraph>
                {isCorrect ? <WrongParagraph data-cy="loginError">El user o la pass son incorrectos</WrongParagraph>: ''}
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