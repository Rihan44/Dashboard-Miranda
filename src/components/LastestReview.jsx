import styles from "styled-components";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";


export const LastestReview = (props) => {
    return(
        <>
            <ContainerReview>
                <Title>Latest Review by Customers</Title>
                <CardContainer>
                    <Card>
                        <ReviewComent>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                        </ReviewComent>
                        <InnerCard>
                            <img />
                            <ProfileContainer>
                                <h4>Kusnaidi Anderson</h4>
                                <p>4m ago</p>
                            </ProfileContainer>
                            <ButtonContainer>
                                <Button $red><AiOutlineCheckCircle/></Button>
                                <Button><AiOutlineCloseCircle/></Button>
                            </ButtonContainer>
                        </InnerCard>
                    </Card>
                </CardContainer>
            </ContainerReview>
        </>
    );
}

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
`;

const Card = styles.div`
    width: 431px;
    height: 275px;
    border: 1px solid #EBEBEB;
    border-radius: 20px;
    padding: 30px;
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

const ReviewComent = styles.p`
    color: #4E4E4E;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    margin-bottom: 52px;
`;

const ButtonContainer = styles.div`
    width: 20%;
    align-self: end;
    display: flex;
    justify-content: space-between;
`;

const ProfileContainer = styles.div` 
    width: 80%;
    margin-left: 21px;

    h4 {
        color: #262626;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
    }

    p {
        color: #799283;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
    }

`;

const Button = styles.button`
    border: none;
    background: none;
    font-size: 24px;
    cursor: pointer;
    color: ${props => props.$red ? '#E23428' : '#5AD07A'};
`;