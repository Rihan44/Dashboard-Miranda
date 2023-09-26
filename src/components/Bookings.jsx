import styles from "styled-components";

import { BsArrowDownShort } from "react-icons/bs";


export const Bookings = () => {
    return(
        <>
            <Main>
                <BookingContainer>
                    <FilterContainer>
                        <TabsContainer>
                            <ButtonTabs>
                                All Bookings
                            </ButtonTabs>
                            <ButtonTabs>
                                Check In
                            </ButtonTabs>
                            <ButtonTabs>
                                Check Out
                            </ButtonTabs>
                            <ButtonTabs>
                                In Progress
                            </ButtonTabs>
                        </TabsContainer>
                        <Filters>
                            <input type="text" placeholder="Customer Name..."/>
                            <Select>
                                <Option>Order Date</Option>
                                <Option>Guest</Option>
                                <Option>Check In</Option>
                                <Option>Check Out</Option>
                            </Select>
                        </Filters>
                    </FilterContainer>
                </BookingContainer>
            </Main>
        </>
    )
}

const Main = styles.main`
    display: flex;
    flex-direction: column;
`;

const BookingContainer = styles.div`
    margin-top: 50px;
    margin-left: 50px;
    min-width: 1300px;
    display: flex;
    flex-direction: column;
`;

const FilterContainer = styles.div`
    width: 100%;
    display: flex;
    height: 70px;
`;

const TabsContainer = styles.div`
    width: 40%;
    display: flex;
    border-bottom: 1px solid #00000010;
    align-self: center;
`;

const ButtonTabs = styles.button`
    border: none;
    background: none;
    cursor: pointer;
    color: #6E6E6E;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    height: 30px;
    width: 30%;

    &:hover {
        color: #135846;
        border-bottom: 2px solid #135846;
    }
`;

const Filters = styles.div`
    width: 60%;
    display: flex;
    justify-content: flex-end;
    margin-right: 50px;
    align-items: end;

    input {
        width: 427px;
        height: 50px;
        margin-right: 20px;
        outline: #135846;
        border: none;
        background: #135846 0% 0% no-repeat padding-box;
        border-radius: 12px;
        color: #ffffff;
        font-size: 16px;
        font-family: 'Poppins', sans-serif;
        padding-left: 10px;
    }
`;

const Select = styles.select`
    width: 129px; 
    height: 50px;
    border: 1px solid #135846;
    border-radius: 12px;
    color: #135846;
    background: none;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
  /*   appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: url(${BsArrowDownShort});
    background-repeat: no-repeat;
    background-position: right center;
    padding-right: 20px; */
`;

const Option = styles.option`
    background: #ffffff;
`;