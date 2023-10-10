import styled from "styled-components";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContainer";
import { AsideContext } from "../Context/ToggleAsideContext";


export const ProfileCompontent = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState('');
    const [email, setUserUpdate] = useState('');
    const [user, setEmailUpdate] = useState('');
    const {auth, authDispatch} = useContext(AuthContext);
    const {asideState} = useContext(AsideContext);

    const handleOpen = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleFile = (e) => {
        const fileImage = URL.createObjectURL(e.target.files[0]);
        setImgSrc(fileImage);
        authDispatch({type: 'UPDATE', payload: {imageSrc: fileImage}})
    }

    const handleUser = (e) => {
        const newUser = e.target.value;
        setUserUpdate(newUser);
        authDispatch({type: 'UPDATE', payload: {username: newUser}}) 
    }

    const handleEmail = (e) => {
        const newEmail = e.target.value;
        setEmailUpdate(newEmail);
        authDispatch({type: 'UPDATE', payload: {email: newEmail}})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setModalOpen(false);
    }

    return(
        <ProfileContainer darkmode={asideState.darkMode}>
            <Modal $modalOpen={modalOpen}>
                <ModalInfo>
                    <ButtonModalClose onClick={handleCloseModal}>
                        <AiOutlineCloseCircle />
                    </ButtonModalClose>
                    <ImageUpdate src={'https://robohash.org/'+auth.username} alt="imgProfile"/>
                    <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" target="_blank">
                        <Input type="file" name="img" multiple onChange={handleFile}/>
                        <Input type="text" placeholder={auth.username} onChange={handleUser}/>
                        <Input type="text" placeholder={auth.email} onChange={handleEmail}/>
                        <ButtonSave type="submit">Save</ButtonSave>
                    </form>
                </ModalInfo>
            </Modal>
            <ImageProfile src={'https://robohash.org/'+auth.username}/>
            <ProfileTitle darkmode={asideState.darkMode}>{auth.username}</ProfileTitle>
            <ProfileParagraph>{auth.email}</ProfileParagraph>
            <ProfileButton onClick={handleOpen}>Edit</ProfileButton>
        </ProfileContainer>
    )
}


const Modal = styled.div`
    display: ${props => props.$modalOpen === true ? 'block' : 'none'};
    position: fixed; 
    z-index: 10; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
    transition: 0.5s;
`;

const ModalInfo = styled.div`
    background:#ffff;
    position: absolute; 
    top: 25%;
    left: 40%;
    width: 450px;
    height: 350px;
    border: 1px solid #EBEBEB;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0px 4px 4px #00000010;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    align-items: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const ButtonSave = styled.button` 
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

const Input = styled.input`
    width: 90%;
    height: 30px;
    border: none;
    outline: gray;
    padding-right: 20px;
    border-radius: 5px;
    box-shadow: 0px 3px 10px #00000030;
    padding: 10px;
    margin: 20px 20px;
`;

const ButtonModalClose = styled.button`
    color: #aaa;
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
    font-size: 24px;
    transition: 0.4s;
    border: none;
    background: none;

    &:hover {
        color: black;
    }
`;

const ImageUpdate = styled.img`
    width: 100px;
    height: 100px;
    position: absolute;
    top: -75px;
    left: 38%;
    border-radius: 10px;
    color: #C5C5C5;
`;


const ProfileContainer = styled.div`
    width: 233px;
    height: 170px;
    box-shadow: 0px 20px 30px #00000014;
    text-align: center;
    position: relative;
    margin-top: 40px;
    margin-bottom: 40px;
    background-color: ${props => props.darkmode ? '#292828' : '#ffff'};
    border-radius: 18px;
    transition: 0.5s;
`;

const ImageProfile = styled.img`
    width: 60px;
    height: 60px; 
    position: absolute;
    top: -35px;
    left: 38%;
    border-radius: 10px;
`;

const ProfileTitle = styled.h3`
    color: ${props => props.darkmode ? '#ffff' : '#393939'};
    font-size: 16px;
    font-family: 
    font-family: 'Poppins', sans-serif;
    font-weight: medium;
    padding-top: 40px;
    margin-bottom: 9px;
    transition: color 0.5s;
`;

const ProfileParagraph = styled.p`
    color: #B2B2B2;
    font-size: 12px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 16px;
`;

const ProfileButton = styled.button`
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
    margin-bottom: 30px;

    &:hover {
        background: #799283 0% 0% no-repeat padding-box;
        color: #EBF1EF;
    }
`;