import styles from "styled-components";

import { LuAlignLeft } from "react-icons/lu";
import { LuHeart } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { LuBell } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";
import { FiSearch } from "react-icons/fi";


export const Header = ({ title}) => {

    return (
        <HeaderTag>
            <NavIcons>
                <ContainerTitle>
                    <LuAlignLeft style={{ fontSize: "22px", cursor: "pointer" }} id=""/>
                    <Title>{title}</Title>
                </ContainerTitle>
                <ContainerIcons>
                    <ContainerInput>
                        <Input type="text"/>
                        <FiSearch style={{ color: "#6E6E6E" }} />
                    </ContainerInput>
                    <LuHeart style={iconClass} />
                    <HiOutlineMail style={iconClass} />
                    <LuBell style={iconClass} />
                    <MdOutlineMessage style={iconClass} />
                    <ImageProfile />
                    <div>
                        ES
                    </div>
                </ContainerIcons>
            </NavIcons>
        </HeaderTag>
    );
}

const iconClass = {
    color: "#135846",
    fontSize: "24px"
}

const HeaderTag = styles.header`
    display: flex;
    height: 120px;
`;

const NavIcons = styles.nav`
    height: 120px;
    box-shadow: 0px 3px 10px #00000005;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const ContainerTitle = styles.div`
    display: flex; 
    width: 20%;
    justify-content: space-around;
    margin-left: 30px;
    align-items: center;
`;

const ContainerIcons = styles.div`
    display: flex; 
    margin-left: 150px;
    width: 80%;
    justify-content: space-around;
    align-items: center;
`;

const Title = styles.h1`
    font-size: 28px;
    color: #262626;
    font-family: 'Poppins', sans-serif;
    font-weight: semibold;
    margin-left: 30px;
`;

const Input = styles.input`
    width: 90%;
    height: 100%;
    border: none;
    outline: gray;
    background: #FCFCFC;
    padding-right: 20px;
    direction: rtl;
`;

const ContainerInput = styles.div`
    background: #FCFCFC;
    width: 350px;
    height: 57px;
    display: flex; 
    align-items: center;
`;

const ImageProfile = styles.div`
    width: 60px;
    height: 60px; 
    background: #C5C5C5;
    /* marginRight: "60px"; */
`;




