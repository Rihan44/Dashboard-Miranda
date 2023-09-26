import styles from "styled-components";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { useState } from "react";

export const LastestReview = ({ dataDashboard }) => {

    const [modalInfo, setModalInfo] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [checkMessage, setCheckMessage] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [arrayId, setArrayId] = useState([]);

    const handleOpen = (data) => {
        setModalInfo(data.email_description);
        setModalOpen(true);
        setCheckMessage(true);

        const updateChecked = ((prevChecked) => {
            return {
                ...prevChecked,
                [data.id]: !prevChecked[data.id]
            };
        });

        setIsChecked(updateChecked);

        /* TODO ESTO */
       /*  let dataID = data.id;
        setArrayId(arrayId.concat(dataID));

        localStorage.setItem('idMessage', data.id); */
        /* GUARDAR QUE EL CHECK SE QUEDE VERDE EN EL LOCAL Y QUE SOLO SE PONGA VERDE EL BOTON DEL MODAL QUE HACES CLICK */
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    return (
        <>
            <Modal $modalOpen={modalOpen}>
                <ModalInfo>
                    <ButtonModalClose onClick={handleCloseModal}>
                        <AiOutlineCloseCircle />
                    </ButtonModalClose>
                    <h4>Email Message</h4>
                    <p>{modalInfo}</p>
                </ModalInfo>
            </Modal>
            <ContainerReview>
                <Title>Latest Review by Customers</Title>
                <CardContainer>
                    {dataDashboard.map((data) => (
                        <Card key={data.id}>
                            <EmailSubject>
                                {data.email_subject}
                            </EmailSubject>
                            <ReviewComent>
                                {data.email_description}
                            </ReviewComent>
                            <InnerCard>
                                <ProfileContainer>
                                    <h4>{data.name}</h4>
                                    <p>{data.email}</p>
                                    <p>{data.phone}</p>
                                </ProfileContainer>
                                <ButtonContainer>
                                    <Button $view={isChecked[data.id] ? checkMessage: false}><AiOutlineCheckCircle /></Button>
                                    <ButtonOpen onClick={() => handleOpen(data)}><AiOutlineFullscreen /></ButtonOpen>
                                </ButtonContainer>
                            </InnerCard>
                        </Card>
                    ))}
                </CardContainer>
            </ContainerReview>
        </>
    );
}

const Modal = styles.div`
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

const ModalInfo = styles.div`
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
    }

    h4 {
        margin: auto;
        width: 40%;
        font-family: 'Poppins', sans-serif;
    }
`;

const ButtonModalClose = styles.button`
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

const ContainerReview = styles.div`
    box-shadow: 0px 4px 4px #00000010;
    border-radius: 20px;
    width: 1475px;
    height: 433px;
    margin-left: 50px;
    margin-top: 40px;
    min-width: 1300px;
    padding: 30px;
`;

const Title = styles.h3`
    color: #393939;
    font-size: 20px;
    font-family: 'Poppins', sans-serif;
    margin-top: 30px;
`;

const CardContainer = styles.div`
    width: 100%;
    display: flex;
    margin-top: 30px;
    justify-content: space-between;
    min-width: 1300px;
`;

const Card = styles.div`
    width: 431px;
    height: 275px;
    border: 1px solid #EBEBEB;
    border-radius: 20px;
    padding: 30px;
`;

const EmailSubject = styles.h4`
    color: #393939;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
`;

const ReviewComent = styles.p`
    color: #4E4E4E;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    margin-bottom: 30px;
`;

const InnerCard = styles.div`
    display:flex;
    img {
        width: 56px;
        height: 56px;
        border-radius: 8px;
        background-color: #C5C5C5;
    }
`;

const ProfileContainer = styles.div` 
    width: 80%;

    h4 {
        color: #262626;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        margin-bottom: 10px;
    }

    p {
        color: #799283;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        margin-bottom: 10px;
    }

`;

const ButtonContainer = styles.div`
    width: 20%;
    align-self: end;
    display: flex;
    justify-content: space-between;
`;

const Button = styles.button`
    border: none;
    background: none;
    font-size: 24px;
    cursor: pointer;
    color: ${props => props.$view === false ? '#E23428' : '#5AD07A'};
`;

const ButtonOpen = styles.button`
    border: none;
    background: none;
    font-size: 24px;
    cursor: pointer;
    color: #575757;
`;