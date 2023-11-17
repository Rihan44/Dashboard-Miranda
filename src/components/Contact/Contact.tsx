import styled from "styled-components";
import Swal from 'sweetalert2';

import error_image from '../../assets/error_image3.png';

import { useMemo, useEffect, useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { archiveMessage, deleteMessage, getAllMessages, unArchiveMessage } from "../../features/slices/contact/contactThunk";
import { format } from "date-fns";

import { BiArchiveIn } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiArchiveOut } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

import { Card } from "../Dashboard/Card";
import { MainContainer } from "../Reusables/MainContainer"
import { SpinnerLoader } from "../Reusables/SpinnerLoader";
import { Tabla } from "../Reusables/Tabla";
import { DeleteSpinner } from "../Reusables/DeleteSpinner";
import { ContactInterface } from "../../interfaces/contactInterface";

export const Contact = () => {
    const [modalInfo, setModalInfo] = useState({
        emailSubject: '',
        emailUser: '',
        emailInfo: ''
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [isActiveButton, setIsActiveButton] = useState('allContacts');

    const dataContact = useAppSelector((state) => state.contact.data);
    const status = useAppSelector((state) => state.contact.status);
    const statusArchive = useAppSelector((state) => state.contact.statusArchive);
    
    const [tableRef] = useAutoAnimate();
    const dispatch = useAppDispatch();

    const allContacts = isActiveButton === 'allContacts';
    const archived = isActiveButton === 'archived';

    const handleOpenModal = (data: string, subject: string, email: string) => {
        setModalInfo({emailInfo: data, emailSubject: subject, emailUser: email});
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleTab = (activeButton: string) => {
        setIsActiveButton(activeButton);
    }

    const handleDelete = async(id: string | undefined) => {
        const ToastDelete = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        const { value: accept } = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#135846',
            cancelButtonColor: '#E23428',
            confirmButtonText: 'Yes, delete it!'
        })

        if(id !== undefined && accept) {
            dispatch(deleteMessage(id));
            setTimeout(() => {
                ToastDelete.fire({
                    icon: 'success',
                    title: 'Deleted message successfully!'
                  })
            }, 850)
        }
    }

    const handleArchive = (id: string | number | undefined) => {
        const ToastArchive = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        const dataMessage = {
            id: id,
            archive: true
        }

        if(id !== undefined) {
            dispatch(archiveMessage(dataMessage));
            ToastArchive.fire({
                icon: 'success',
                title: 'Archived successfully!'
            })
        }
    }

    const handleUnArchive = (id: string | number | undefined) => {
        const ToastUnArchive = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        const dataMessage = {
            id: id,
            archive: false
        }


        if(id !== undefined) {
            dispatch(unArchiveMessage(dataMessage));
            ToastUnArchive.fire({
                icon: 'success',
                title: 'Unarchive successfully!'
            })
        }
    }

    const contactData: ContactInterface[] = useMemo(() => {

        let dataArray: ContactInterface[] = [...dataContact];

        switch (isActiveButton) {
            case 'allContacts':
                dataArray.sort((a, b) => {
                    const dateA = new Date(a.dateTime);
                    const dateB = new Date(b.dateTime);
                    return dateA.getTime() - dateB.getTime();;
                });
                break;
            case 'archived':
                dataArray = dataArray.filter(data => data.isArchived);
                break;
            default:
                dataArray.sort((a, b) => {
                    const dateA = new Date(a.dateTime);
                    const dateB = new Date(b.dateTime);
                    return dateA.getTime() - dateB.getTime();;
                });
        }

        return dataArray;

    }, [isActiveButton, dataContact, status]);

    useEffect(()=> {
        dispatch(getAllMessages());
    },[dispatch]);


    const cols = [
        {
            property: 'date', label: 'Date', display: ({dateTime, _id }: ContactInterface) => (
                <DateContactContainer>
                    <p>{format(new Date(dateTime), "do/MM/yyyy")}</p>
                    <p>at {format(new Date(dateTime), "HH:mm")}</p>
                    <p style={{fontSize: '14px'}}>#{_id}</p>
                </DateContactContainer>
            )
        },
        {
            property: 'name', label: 'Customer', display: ({ name, email, phone }: ContactInterface) => (
                <CustomerContactContainer>
                    <p>{name}</p>
                    <p>{email}</p>
                    <p>{phone}</p>
                </CustomerContactContainer>
            )
        },
        {
            property: 'email_subject', label: 'Email Subject && Comment', display: ({ email_subject, email_description, email }: ContactInterface) => (
                <EmaiLContactContainer>
                    <ViewNotesButton onClick={() => handleOpenModal(email_description, email_subject.toUpperCase(), email)}>View Notes</ViewNotesButton>
                </EmaiLContactContainer>
            )
        },
        {
            property: 'isArchived', label: 'Status', display: ({ isArchived, _id }: ContactInterface) => (
                <div>
                    <IsAcrhivedParagraph isArchive={isArchived}>{isArchived ? 'Archived' : 'Publish'}</IsAcrhivedParagraph>
                    {isArchived 
                    ? 
                        <OptionsButton style={{color: '#5AD07A'}}>
                            <BiArchiveIn onClick={() => handleUnArchive(_id)}/>
                            <BsTrash style={{color: '#E23428'}} onClick={() => handleDelete(_id)} />
                        </OptionsButton> 
                    :   <OptionsButton style={{color: '#E23428'}}>
                            <BiArchiveOut onClick={() => handleArchive(_id)}/>
                            <BsTrash style={{color: '#E23428'}} onClick={() => handleDelete(_id)} />
                        </OptionsButton>}
                </div>
            )
    }
]

    return (
        <MainContainer>
            <Modal modalopen={modalOpen}>
                <ModalInfo>
                    <ButtonModalClose onClick={handleCloseModal}>
                        <AiOutlineCloseCircle />
                    </ButtonModalClose>
                    <h4>{modalInfo.emailSubject}</h4>
                    <p>{modalInfo.emailUser}</p>
                    <p>{modalInfo.emailInfo}</p>
                </ModalInfo>
            </Modal>
            <ContactContainer>
                {statusArchive === 'pending' && <DeleteSpinner/>}
                <CardsContainer ref={tableRef}>  
                    {status === 'fulfilled'
                        ? <Card handleOpen={handleOpenModal} data={contactData}></Card>
                        : status === 'rejected' ? alert('Algo falló')
                            : <SpinnerLoader></SpinnerLoader>
                    }
                </CardsContainer>
                <FilterContainer>
                    <TabsContainer>
                        <ButtonTabs actived={allContacts} onClick={() => handleTab('allContacts')}>
                            All Contacts
                        </ButtonTabs>
                        <ButtonTabs actived={archived} onClick={() => handleTab('archived')}>
                            Archived
                        </ButtonTabs>
                    </TabsContainer>
                </FilterContainer>
                {status === 'fulfilled'
                        ? <Tabla cols={cols} data={contactData} totalCols={4} totalHeaders={4}/>
                        : status === 'rejected' ? <ImageRejected src={error_image}/>
                            : <SpinnerLoader></SpinnerLoader>
                    }
            </ContactContainer>
        </MainContainer>
    )
}

const Modal = styled.div<{modalopen: boolean}>`
    display: ${props => props.modalopen === true ? 'block' : 'none'};
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
    box-shadow: 0px 4px 4px #00000010;
    word-wrap: break-word;
    overflow: scroll;

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
        text-align: center;
    }

    p:first-of-type {
        color: #799283; 
        font-size: 14px;
    }

    h4 {
        margin: auto;
        margin-top: 30px;
        width: 60%;
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        color: #135846;
        text-align: center;
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

const ContactContainer = styled.div<{children: any}>`
    margin: 50px;
    margin-left: 80px;
`;

const CardsContainer = styled.div<{ref: any, children: any}>`
    margin-bottom: 50px;
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

const ButtonTabs = styled(Buttons)<{actived: boolean}>`
    color: ${props => props.actived ? "#135846" : "#6E6E6E"};
    border-bottom: ${props => props.actived ? "2px solid #135846" : "none"};
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    height: 30px;
    width: 30%;

    &:hover {
        color: #135846;
        border-bottom: 2px solid #135846;
    }

`;

const IsAcrhivedParagraph = styled.div<{isArchive: boolean}>`
    margin-right: 20px;
    color: ${props => props.isArchive ? '#E23428' : '#5AD07A'}
`;

const OptionsButton = styled(Buttons)`
    font-size: 30px;
    color:#393939;
    display: flex;
    margin-right: 20px;
    margin-top: 20px;

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
    align-items: center;

    p {
        margin-bottom: 10px;
    }
`;

const EmaiLContactContainer = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;


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
`;

const RotatingsContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 53%;
`;

const ViewNotesButton = styled(Buttons)`
    color: #212121;
    font-size: 16px;
    background: #EEF9F2;
    padding: 15px;
    border-radius: 12px;
    font-weight: 500;
    align-self: center;
    justify-center: center;
    width: 160px;
    transition: 0.3s;

    &:hover {
        background: #135846;
        color: #EEF9F2;
    }
`;

const ImageRejected = styled.img`
    width:  600px;
    border-radius: 10px;
    margin-top: 140px;
    margin-left: 350px;
`;
