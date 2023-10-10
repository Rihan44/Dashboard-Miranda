import styled from "styled-components";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import { useLocation } from "react-router-dom";

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";

export const Card = ({ data, handleOpen }) => {

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
                        <CardContainer>
                            <EmailSubject>
                                {dataCard.email_subject}
                            </EmailSubject>
                            <ReviewComent>
                                {dataCard.email_description}
                            </ReviewComent>
                            <InnerCard>
                                <ProfileContainer>
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
    border: 1px solid #EBEBEB;
    border-radius: 20px;
    padding: 30px;
    transition: transform 0.5s;
    box-shadow: 0px 3px 10px #00000030;

    &:hover {
        transform: scale(1.02);
    }
`;

const EmailSubject = styled.h4`
    color: #393939;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
`;

const ReviewComent = styled.p`
    color: #4E4E4E;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    margin-bottom: 30px;
    overflow: hidden;
    height: 70px;

    &::before {
        content: "...";
    }
`;

const InnerCard = styled.div`
    display:flex;
    img {
        width: 56px;
        height: 56px;
        border-radius: 8px;
        background-color: #C5C5C5;
    }
`;

const ProfileContainer = styled.div` 
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
    color: #575757;
`;

const SwiperContainer = styled(Swiper)`
    padding: 10px;
    min-width: 1400px;

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