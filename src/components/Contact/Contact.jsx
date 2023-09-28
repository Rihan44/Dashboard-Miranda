import styled from "styled-components"
import { MainContainer } from "../Reusables/MainContainer"

import { contactMessega } from "../../data/contactMessage";

import { BiArchiveIn } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiArchiveOut } from "react-icons/bi";

import { Card } from "../Dashboard/Card";
import { useEffect, useState } from "react";
import { Table } from "../Reusables/Table";

export const Contact = () => {
    const [modalInfo, setModalInfo] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [isActiveButton, setIsActiveButton] = useState(false);
    const [tabsSelect, setTabsSelect] = useState('');
    let [contactData, setContactData] = useState([]);

    let options = {year: 'numeric', month: 'long', day: 'numeric' };

    const allContacts = isActiveButton === 'allContacts';
    const archived = isActiveButton === 'archived';

    const handleOpen = (data) => {
        setModalInfo(data.email_description);
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }


    const handleTab = (value, activeButton) => {
        setTabsSelect(value);
        setIsActiveButton(activeButton);
    }

    useEffect(() => {

        let dataArray = [...contactMessega];

        switch (tabsSelect) {
            case 'all_contacts':
                contactData = dataArray;
                break;
            case 'archived':
                contactData = dataArray;
                dataArray = contactData.filter(data => data.isArchived);
                break;
            default:
                contactData = dataArray;
        }

        setContactData(dataArray);

    }, [tabsSelect, setContactData])


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
            property: 'email_subject', label: 'Emil Subject && Comment', display: ({ email_subject, email_description }) => (
                <EmaiLContactContainer>
                    <p>{email_subject}</p>
                    <DescriptionContainer>{email_description}</DescriptionContainer>
                </EmaiLContactContainer>
            )
        },
        {
            property: 'isArchived', label: 'Status', display: ({ isArchived }) => (
                /* TODO HACER EL ONCLIK PARA BORRAR */
                <div>
                    <IsAcrhivedParagraph $isArchive={isArchived}>{isArchived ? 'Archived' : 'Publish'}</IsAcrhivedParagraph>
                    {/* TODO CAMBIAR EL COLOR DEL BOTON */}
                    {isArchived ? <OptionsButton><BiArchiveIn /></OptionsButton> : <OptionsButton><BiArchiveOut /></OptionsButton>}
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
                    <Card handleOpen={handleOpen} data={contactMessega}></Card>
                </CardsContainer>
                <FilterContainer>
                    <TabsContainer>
                        <ButtonTabs $actived={allContacts} onClick={() => handleTab('all_contacts', 'allContacts')}>
                            All Contacts
                        </ButtonTabs>
                        <ButtonTabs $actived={archived} onClick={() => handleTab('archived', 'archived')}>
                            Archived
                        </ButtonTabs>
                    </TabsContainer>
                </FilterContainer>
                <Table cols={cols} data={contactMessega}/>
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
    display: flex;
    width: 1400px;
    justify-content: space-around;
    margin-bottom: 86.5px;
`;

const FilterContainer = styled.div`
    width: 100%;
    display: flex;
    height: 70px;
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

const OptionsButton = styled(Buttons)`
    font-size: 30px;
    color:#393939;

    svg { 
        color: ${props => props.$isArchive ? '#E23428' : '#5AD07A'}
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

const IsAcrhivedParagraph = styled.div`
    margin-right: 20px;
    color: ${props => props.$isArchive ? '#E23428' : '#5AD07A'}
`;