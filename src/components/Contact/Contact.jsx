import styled from "styled-components"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { archiveMessage, deleteMessage, getAllMessages, unArchiveMessage } from "../../features/contactSlice";

import { BiArchiveIn } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiArchiveOut } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";


import { Card } from "../Dashboard/Card";
import { Table } from "../Reusables/Table";
import { MainContainer } from "../Reusables/MainContainer"
import { SpinnerLoader } from "../Reusables/SpinnerLoader";


export const Contact = () => {
    const [modalInfo, setModalInfo] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [isActiveButton, setIsActiveButton] = useState('allContacts');
    const [contactData, setContactData] = useState([]);

    const dataContact = useSelector((state) => state.contact.data);
    const status = useSelector((state) => state.contact.status);

    let options = {year: 'numeric', month: 'long', day: 'numeric' };

    const allContacts = isActiveButton === 'allContacts';
    const archived = isActiveButton === 'archived';

    const dispatch = useDispatch();

    const handleOpen = (data) => {
        setModalInfo(data.email_description);
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleTab = (activeButton) => {
        setIsActiveButton(activeButton);
    }

    const handleDelete = (id) => {
        dispatch(deleteMessage(id));
    }

    const handleArchive = (id) => {
        dispatch(archiveMessage(id));
    }

    const handleUnArchive = (id) => {
        dispatch(unArchiveMessage(id));
    }

    useEffect(() => {

        let dataArray = [...dataContact];

        if(status === 'fulfilled') {
            setContactData(dataArray);
        }

        switch (isActiveButton) {
            case 'allContacts':
                dataArray.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateA - dateB;
                });
                break;
            case 'archived':
                dataArray = dataArray.filter(data => data.isArchived);
                break;
            default:
                dataArray.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateA - dateB;
                });
        }

        setContactData(dataArray);


    }, [isActiveButton, setContactData, dataContact, status]);

    useEffect(()=> {
        dispatch(getAllMessages());
    },[dispatch]);


    const cols = [
        {
            property: 'date', label: 'Date', display: ({ date, dateTime, id }) => (
                <DateContactContainer>
                    <p>{
                        new Date(date.split("-")[0], date.split("-")[1]-1, 
                        date.split("-")[2]).toLocaleDateString('en-EN', options)
                    }</p>
                    <p>{dateTime}</p>
                    <p>#{id}</p>
                </DateContactContainer>
            )
        },
        {
            property: 'name', label: 'Customer', display: ({ name, email, phone }) => (
                <CustomerContactContainer>
                    <p>{name}</p>
                    <p>{email}</p>
                    <p>{phone}</p>
                </CustomerContactContainer>
            )
        },
        {
            property: 'email_subject', label: 'Email Subject && Comment', display: ({ email_subject, email_description }) => (
                <EmaiLContactContainer>
                    <p>{email_subject}</p>
                    {/* HACER UN BOTÓN PARA QUE SE VEA LA DESCRIPCION EN UN MODAL */}
                    <DescriptionContainer>{email_description}</DescriptionContainer>
                </EmaiLContactContainer>
            )
        },
        {
            property: 'isArchived', label: 'Status', display: ({ isArchived, id }) => (
                /* TODO HACER EL ONCLIK PARA ARCHIVAR */
                <div>
                    <IsAcrhivedParagraph $isArchive={isArchived}>{isArchived ? 'Archived' : 'Publish'}</IsAcrhivedParagraph>
                    {isArchived 
                    ? 
                        <OptionsButton style={{color: '#5AD07A'}}>
                            <BiArchiveIn onClick={() => handleUnArchive(id)}/>
                            <BsTrash style={{color: '#E23428'}} onClick={() => handleDelete(id)} />
                        </OptionsButton> 
                    :   <OptionsButton style={{color: '#E23428'}}>
                            <BiArchiveOut onClick={() => handleArchive(id)}/>
                            <BsTrash style={{color: '#E23428'}} onClick={() => handleDelete(id)} />
                        </OptionsButton>}
                </div>
            )
    }
]

    return (
        <MainContainer>
            <Modal $modalOpen={modalOpen}>
                <ModalInfo>
                    <ButtonModalClose onClick={handleCloseModal}>
                        <AiOutlineCloseCircle />
                    </ButtonModalClose>
                    <h4>Email Message</h4>
                    <p>{modalInfo}</p>
                </ModalInfo>
            </Modal>
            <ContactContainer>
                <CardsContainer>  
                    {status === 'fulfilled'
                        ? <Card handleOpen={handleOpen} data={contactData}></Card>
                        : status === 'rejected' ? alert('Algo falló')
                            : <SpinnerLoader></SpinnerLoader>
                    }
                </CardsContainer>
                <FilterContainer>
                    <TabsContainer>
                        <ButtonTabs $actived={allContacts} onClick={() => handleTab('allContacts')}>
                            All Contacts
                        </ButtonTabs>
                        <ButtonTabs $actived={archived} onClick={() => handleTab('archived')}>
                            Archived
                        </ButtonTabs>
                    </TabsContainer>
                </FilterContainer>
                {status === 'fulfilled'
                        ? <Table cols={cols} data={contactData} totalCols={5}/>
                        : status === 'rejected' ? alert('Algo falló')
                            : <SpinnerLoader></SpinnerLoader>
                    }
            </ContactContainer>
        </MainContainer>
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

    p {
        width: 90%;
        margin: auto;
        margin-top: 30px;
        color: #4E4E4E;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        margin-bottom: 30px;
        max-height: 300px;
        overflow: auto;
    }

    h4 {
        margin: auto;
        width: 40%;
        font-family: 'Poppins', sans-serif;
    }
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

const ContactContainer = styled.div`
    margin: 50px;
`;

const CardsContainer = styled.div`
    ${'' /* display: flex;
    width: 1400px; */}
    margin-bottom: 86.5px;
`;

const FilterContainer = styled.div`
    width: 1400px;
    display: flex;
    height: 70px;
    max-width: 1400px;
`;

const TabsContainer = styled.div`
    width: 30%;
    display: flex;
    border-bottom: 1px solid #00000010;
    align-self: center;
    justify-content: space-around;
`;


const Buttons = styled.button`
    border: none;
    background: none;
    cursor: pointer;
`;

const ButtonTabs = styled(Buttons)`
    color: ${props => props.$actived ? "#135846" : "#6E6E6E"};
    border-bottom: ${props => props.$actived ? "2px solid #135846" : "none"};
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    height: 30px;
    width: 30%;

    &:hover {
        color: #135846;
        border-bottom: 2px solid #135846;
    }

`;

const IsAcrhivedParagraph = styled.div`
    margin-right: 20px;
    color: ${props => props.$isArchive ? '#E23428' : '#5AD07A'}
`;

const OptionsButton = styled(Buttons)`
    font-size: 30px;
    color:#393939;
    display: flex;
    margin-right: 20px;

    svg { 
        margin-left: 10px;
        transition: 0.5s;

        &:hover {
            transform: scale(1.1, 1.1);
        }
    }
`;

const DateContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 20px;

    p {
        margin-bottom: 10px;
    }

    p:nth-child(3) {
        color: #799283;
    }
`;

const CustomerContactContainer = styled.div`
    display: flex;
    flex-direction: column;

    p {
        margin-bottom: 10px;
    }
`;

const EmaiLContactContainer = styled.div` 
    display: flex;
    flex-direction: column;

    p:nth-child(1) {
        margin-bottom: 10px;
        color: #135846;
        font-size: 20px;
    }
`;

const DescriptionContainer = styled.p` 
    height: 150px;
    width: 200px;
    overflow: scroll;
    box-shadow: 0px 4px 4px #00000010;
    padding: 10px;
`;
