import styled from "styled-components";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import { useLocation } from "react-router-dom";
import { useContext } from "react";

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AsideContext } from "../Context/ToggleAsideContext";

export const Card = ({ data, handleOpen }) => {
    const {asideState} = useContext(AsideContext);

    const location = useLocation();

    return (
        <>
            <SwiperContainer
                modules={[Navigation, A11y]}
                spaceBetween={40}
                slidesPerView={3}
                navigation
            >
                {data.map((dataCard) => (
                    <SwiperSlide key={dataCard.id}>
                        <CardContainer darkmode={asideState.darkMode}>
                            <EmailSubject darkmode={asideState.darkMode}>
                                {dataCard.email_subject}
                            </EmailSubject>
                            <ReviewComent darkmode={asideState.darkMode}>
                                {dataCard.email_description}
                            </ReviewComent>
                            <InnerCard>
                                <ImgProfile src={'https://robohash.org/'+dataCard.name}/>
                                <ProfileContainer darkmode={asideState.darkMode}>
                                    <h4>{dataCard.name}</h4>
                                    <p>{dataCard.email}</p>
                                    <p>{dataCard.phone}</p>
                                </ProfileContainer>
                                <ButtonContainer>
                                    <Button><AiOutlineCheckCircle /></Button>
                                    {location.pathname !== '/contact' && <ButtonOpen onClick={() => handleOpen(dataCard)}><AiOutlineFullscreen /></ButtonOpen>}
                                </ButtonContainer>
                            </InnerCard>
                        </CardContainer>
                    </SwiperSlide>
                ))}
            </SwiperContainer>
        </>
    )
}

const CardContainer = styled.div`
    width: 431px;
    height: 275px;
    border: ${props => props.darkmode ? '1px solid #3D3D3D' : '1px solid #EBEBEB'};
    border-radius: 20px;
    padding: 30px;
    transition: 0.5s;
    box-shadow: 0px 3px 10px #00000030;

    &:hover {
        transform: scale(1.02);
    }
`;

const EmailSubject = styled.h4`
    color: ${props => props.darkmode ? '#FFE' : '#393939'};
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
    transition: 0.5s;
`;

const ReviewComent = styled.p`
    color: ${props => props.darkmode ? '#fff' : '#4E4E4E'};
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    margin-bottom: 30px;
    overflow: hidden;
    height: 70px;
    transition: 0.5s;

    &::before {
        content: "...";
    }
`;

const InnerCard = styled.div`
    display:flex;
    align-items: center;

    img {
        width: 56px;
        height: 56px;
        border-radius: 8px;
    }
`;

const ProfileContainer = styled.div` 
    width: 80%;

    h4 {
        color: ${props => props.darkmode ? '#FFE' : '#262626'};
        transition: 0.5s;
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

const ButtonContainer = styled.div`
    width: 20%;
    align-self: end;
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    border: none;
    background: none;
    font-size: 24px;
    cursor: pointer;
    color: ${props => props.$view === false ? '#E23428' : '#5AD07A'};
`;

const ButtonOpen = styled.button`
    border: none;
    background: none;
    font-size: 24px;
    cursor: pointer;
    color: ${props => props.darkmode ? '#FFE' : '#575757'};
    transition: 0.5s;
`;

const SwiperContainer = styled(Swiper)`
    padding: 10px;
    min-width: 1400px;
    margin-bottom: 0px;

    div.swiper-button-next {
        width: 56px;
        height: 56px;
        background-color:#135846;
        border-radius: 12px;
        transition: 0.5s;
        
        &::after {
            font-size: 22px;
            color: #ffff;
        }

        &:hover {
            background-color:#799283;
        }
    }

    div.swiper-button-prev {
        width: 56px;
        height: 56px;
        background-color:#135846;
        border-radius: 12px;
        transition: 0.5s;
        
        &::after {
            font-size: 22px;
            color: #ffff;
        }

        &:hover {
            background-color:#799283;
        }
    }
`;

const ImgProfile = styled.img`
    width: 56px;
    height: 56px;
    border-radius: 8px;
    margin-right: 20px;
`;