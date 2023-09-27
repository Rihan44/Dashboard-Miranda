import styled from "styled-components";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";


export const ProfileCompontent = () => {

    const user = localStorage.getItem('user');
    const email = localStorage.getItem('email');
    const imagenProfileSrc = localStorage.getItem('imgProfile');

    const [modalOpen, setModalOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState('');
    const [userUpdate, setUserUpdate] = useState('');
    const [userEmail, setEmailUpdate] = useState('');


    const handleOpen = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleFile = (e) => {
        const fileImage = URL.createObjectURL(e.target.files[0]);
        setImgSrc(fileImage);
        localStorage.setItem('imgProfile',fileImage);
    }

    const handleUser = (e) => {
        const newUser = e.target.value;
        setUserUpdate(newUser === '' ? user : newUser);
        localStorage.setItem('user', newUser);
    }

    const handleEmail = (e) => {
        const newEmail = e.target.value;
        setEmailUpdate(newEmail=== '' ? email : newEmail);
        localStorage.setItem('email', newEmail);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setModalOpen(false);
    }

    return(
        <ProfileContainer>
            <Modal $modalOpen={modalOpen}>
                <ModalInfo>
                    <ButtonModalClose onClick={handleCloseModal}>
                        <AiOutlineCloseCircle />
                    </ButtonModalClose>
                    <ImageUpdate src={imgSrc} alt="imgProfile"/>
                    <form onSubmit={handleSubmit} action="../../form-result.php" method="post" encType="multipart/form-data" target="_blank">
                        <Input type="file" name="img" multiple onChange={handleFile}/>
                        <Input type="text" placeholder={user} onChange={handleUser}/>
                        <Input type="text" placeholder={email} onChange={handleEmail}/>
                        <ButtonSave type="submit">Save</ButtonSave>
                    </form>
                </ModalInfo>
            </Modal>
            <ImageProfile src={imagenProfileSrc}/>
            <ProfileTitle>{user}</ProfileTitle>
            <ProfileParagraph>{email}</ProfileParagraph>
            <ProfileButton onClick={handleOpen}>Edit</ProfileButton>
        </ProfileContainer>
    )
}


const Modal = styled.div`
    display: ${props => props.$modalOpen === true ? 'block' : 'none'};
    position: fixed; 
    z-index: 1; 
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
    background: #C5C5C5;
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
    margin-top: 50px;
    margin-bottom: 62px;
`;

const ImageProfile = styled.img`
    width: 60px;
    height: 60px; 
    background: #C5C5C5;
    position: absolute;
    top: -35px;
    left: 38%;
    border-radius: 10px;
`;

const ProfileTitle = styled.h3`
    color: #393939;
    font-size: 16px;
    font-family: 
    font-family: 'Poppins', sans-serif;
    font-weight: medium;
    padding-top: 40px;
    margin-bottom: 9px;
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