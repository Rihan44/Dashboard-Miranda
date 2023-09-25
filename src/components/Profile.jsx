import styles from "styled-components";


export const ProfileCompontent = () => {
    return(
        <ProfileContainer>
            <ImageProfile />
            <ProfileTitle>Angel S Muela</ProfileTitle>
            <ProfileParagraph>asmuela.dev@gmail.com</ProfileParagraph>
            <ProfileButton>Contact us</ProfileButton>
        </ProfileContainer>
    )
}

const ProfileContainer = styles.div`
    width: 233px;
    height: 170px;
    box-shadow: 0px 20px 30px #00000014;
    text-align: center;
    position: relative;
    margin-top: 50px;
    margin-bottom: 62px;
`;

const ImageProfile = styles.img`
    width: 60px;
    height: 60px; 
    background: #C5C5C5;
    position: absolute;
    top: -35px;
    left: 38%;
    border-radius: 10px;
`;

const ProfileTitle = styles.h3`
    color: #393939;
    font-size: 16px;
    font-family: 
    font-family: 'Poppins', sans-serif;
    font-weight: medium;
    padding-top: 40px;
    margin-bottom: 9px;
`;

const ProfileParagraph = styles.p`
    color: #B2B2B2;
    font-size: 12px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 16px;
`;

const ProfileButton = styles.button`
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