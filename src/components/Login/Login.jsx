import styled from "styled-components"

import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/AuthContainer";

export const Login = (/* {setAuthenticated} */) => {

    const navigate = useNavigate();
    
    const [inputTextEmail, setInputTextEmail] = useState('');
    const [inputTextPass, setInputTextPass] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const {auth, authDispatch} = useContext(AuthContext);

    useEffect(() => {
        if (auth.authenticated) {
          navigate('/');
        }
      }, [auth.authenticated, navigate]);

    const userAdmin = {
        user: "ASDev",
        email: "asmuela.dev@gmail.com",
        password: 123456
    }

    function handleChangeEmail(e) {
        setInputTextEmail(e.target.value);   
    }

    function handleChangePass(e) {
        setInputTextPass(parseInt(e.target.value));   
    }

    function handleSubmit(e){
        e.preventDefault();
        if(inputTextEmail === userAdmin.email && inputTextPass === userAdmin.password){
            setIsCorrect(false);
            authDispatch({type: 'LOGIN', payload: {authenticated: true, username: userAdmin.user, email: userAdmin.email}})
            navigate('/');
        } else {
            setIsCorrect(true);
        }
    }

    return(
        
        <LoginContainer>
            <Title>Login</Title>
            <FormContainer onSubmit={handleSubmit}>
                <Label>Email</Label>
                <Input type="text" onChange={handleChangeEmail}/>
                <Label>Password</Label>
                <Input type="text" onChange={handleChangePass}/>
                <Button data-cy="login">Login</Button>
                <FormParagraph>Email Test: <small>asmuela.dev@gmail.com</small></FormParagraph>
                <FormParagraph>Pass Test: <small>123456</small></FormParagraph>
                {isCorrect ? <WrongParagraph>El user o la pass son incorrectos</WrongParagraph>: ''}
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