import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "styled-components"

export const Login = ({setAuthenticated}) => {

    const navigate = useNavigate();
    
    const [inputTextValue, setInputTextValue] = useState('');
    const [inputTextPass, setInputTextPass] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
  
    const userAdmin = {
        user: "admin",
        password: "admin1234"
    }

    function handleChangePassword(e) {
        setInputTextPass(e.target.value);   
    }

    function handleChangeText(e) {
        setInputTextValue(e.target.value);   
    }

    function handleSubmit(e){
        e.preventDefault();
        if(inputTextValue === userAdmin.user && inputTextPass === userAdmin.password){
            setAuthenticated(true);
            setIsCorrect(false);

            localStorage.setItem('auth', true);
            navigate('/');
        } else {
            setAuthenticated(false);
            setIsCorrect(true);
            localStorage.setItem('auth', false);
        }
    }

    return(
        <LoginContainer>
            <Title>Login</Title>
            <FormContainer onSubmit={handleSubmit}>
                <Label>User Name</Label>
                <Input type="text" onChange={handleChangeText}/>
                <Label>User Name</Label>
                <Input type="password" onChange={handleChangePassword}/>
                <Button>Login</Button>
                <FormParagraph>User Test: <small>admin</small></FormParagraph>
                <FormParagraph>Pass Test: <small>admin1234</small></FormParagraph>
                {isCorrect ? <WrongParagraph>El user o la pass son incorrectos</WrongParagraph>: ''}
            </FormContainer>
        </LoginContainer>
    )
}

const LoginContainer = styles.div`
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styles.h2`
    font-size: 2em;
    color: #135846;
    font-family: 'Poppins', sans-serif;
`;

const FormContainer = styles.form`
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

const Input = styles.input`
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

const Label = styles.label`
    color: #135846;
    font-family: 'Poppins', sans-serif;
    &:nth-child(1) {
        margin-top: 20px;
    }
`;

const Button = styles.button` 
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

const FormParagraph = styles.p`
    color: #135846;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 20px;

    small {
        color: #262626;
    }
`

const WrongParagraph = styles(FormParagraph)`
    color: #E23428;
`;