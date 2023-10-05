import styled from "styled-components";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { MainContainer } from "../Reusables/MainContainer"
import { Table } from "../Reusables/Table";

import { BsTrash } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers, getUser } from "../../features/usersSlice";
import { SpinnerLoader } from "../Reusables/SpinnerLoader";

export const UsersList = () => {
    const [isActiveButton, setIsActiveButton] = useState('allEmployee');
    const [dataUsers, setDataUsers] = useState([]);
    const [searchData, setSearchData] = useState('');

    const usersData = useSelector((state) => state.users.data);
    const status = useSelector((state) => state.users.status);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let options = { year: 'numeric', month: 'long', day: 'numeric' };

    const allEmployee = isActiveButton === 'allEmployee';
    const activeEmployee = isActiveButton === 'activeEmployee';
    const inactiveEmployee = isActiveButton === 'inactiveEmployee';

    const handleTab = (activeButton) => {
        setIsActiveButton(activeButton);
    }

    const handleSearch = (e) => {
        setSearchData(e.target.value.toLowerCase());
    }

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    }

    const handleEdit = (id) => {
        dispatch(getUser(id));
        navigate(`/users/update-user/${id}`);
    }

    useEffect(() => {

        let dataArray = [...usersData];

        if(status === 'fulfilled'){
            setDataUsers(dataArray);
        }

        if (searchData !== '') {
            dataArray = dataArray.filter(data => data.name.toLowerCase().includes(searchData));
        }
        
        switch (isActiveButton) {
            case 'allEmployee':
                dataArray.sort((a, b) => {
                    const dateA = new Date(a.hire_date);
                    const dateB = new Date(b.hire_date);
                    return dateA - dateB;
                });
                break;
            case 'activeEmployee':
                dataArray = dataArray.filter(data => !data.status);
                break;
            case 'inactiveEmployee':
                dataArray = dataArray.filter(data => data.status);
                break;
            default:
                dataArray.sort((a, b) => {
                    const dateA = new Date(a.hire_date);
                    const dateB = new Date(b.hire_date);
                    return dateA - dateB;
                });
        }

        setDataUsers(dataArray);

    }, [isActiveButton, setDataUsers, searchData, status, usersData])

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const cols = [
        {
            property: 'photo', label: 'Name', display: ({ photo, name, id, email, hire_date }) => (
                <NameContainer>
                    <img src='' alt="img" />
                    <NameInner>
                        <h4>{name}</h4>
                        <p>{email}</p>
                        <p style={{color: '#799283', fontSize: '16px'}}>{id}</p>
                        <p>Joined on {
                            new Date(hire_date.split("-")[0], hire_date.split("-")[1] - 1,
                                hire_date.split("-")[2]).toLocaleDateString('en-EN', options)
                        }</p>
                    </NameInner>
                </NameContainer>
            )
        },
        {
            property: 'employee_position', label: 'Employee position', display: ({ employee_position, job_description }) => (
                <EmployeeContainer>
                    <h4>{employee_position}</h4>
                    <p>{job_description}</p>
                </EmployeeContainer>
            )
        },
        {
            property: 'phone_number', label: 'Contact', display: ({ phone_number }) => (
                <PhoneContainer>
                    <Call to={`tel:${phone_number}`}>
                        <BsFillTelephoneFill />
                        <p>{phone_number}</p>
                    </Call>
                </PhoneContainer>
            )
        },
        {
            property: 'status', label: 'Status', display: ({ status, id }) => (
                <StatusContainer is_active={status.toString()}>
                    <p>{status ? 'Inactive' : 'Active'}</p>
                    <OptionsButton>
                        <BsTrash onClick={() => handleDelete(id)} />
                        <AiFillEdit onClick={() => handleEdit(id)} />
                    </OptionsButton>
                </StatusContainer>
            )
        }
    ]

    return (
        <>
            <MainContainer>
                <UsersListContainer>
                    <FilterContainer>
                        <TabsContainer>
                            <ButtonTabs $actived={allEmployee} onClick={() => handleTab('allEmployee')}>
                                All Employee
                            </ButtonTabs>
                            <ButtonTabs $actived={activeEmployee} onClick={() => handleTab('activeEmployee')}>
                                Active Employee
                            </ButtonTabs>
                            <ButtonTabs $actived={inactiveEmployee} onClick={() => handleTab('inactiveEmployee')}>
                                Inactive Employee
                            </ButtonTabs>
                        </TabsContainer>
                        <Filters>
                            <input type="text" placeholder="Employee name..." onChange={handleSearch} />
                            <ButtonAddEmployee onClick={() => navigate('/users/add-user')}>
                                + New Employee
                            </ButtonAddEmployee>
                        </Filters>
                    </FilterContainer>            
                    {status === 'fulfilled'
                        ? <Table cols={cols} data={dataUsers} totalCols={5} />
                        : status === 'rejected' ? alert('Algo falló')
                            : <SpinnerLoader></SpinnerLoader>
                    }
                </UsersListContainer>
            </MainContainer>
        </>
    )
}

const UsersListContainer = styled.div`
    margin: 50px;
    width: 100%;
`;

const FilterContainer = styled.div`
    width: 100%;
    display: flex;
    height: 70px;
    min-width: 1500px;
`;

const TabsContainer = styled.div`
    width: 40%;
    display: flex;
    border-bottom: 1px solid #00000010;
    align-self: center;
    justify-content: space-between;
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

const Filters = styled.div`
    width: 50%;
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

const ButtonAddEmployee = styled(Buttons)`
    background: #135846;
    color: #FFFFFF;
    width: 213px;
    height: 49px;
    border-radius: 12px;
    margin-right: 20px;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    transition: 0.3s;
    box-shadow: 0px 3px 10px #00000030;
    cursor: pointer;

    &:hover {
        background: #799283;
    }
`;

const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    img {
        width: 88px;
        height: 88px;
        background: #C5C5C5;
        border-radius: 10px;
    }
`;

const NameInner = styled.div` 
    display: flex;
    flex-direction: column;
    font-family: 'Poppins', sans-serif;

    h4 {
        color: #212121;
        font-size: 16px; 
    }

    p {
        color: #393939;
        font-size: 13px;
        margin: 2px;
    }
`;

const EmployeeContainer = styled.div`
    display: flex; 
    flex-direction: column;
    font-family: 'Poppins', sans-serif;

    h4 {
        color: #212121;
        font-size: 16px; 
        margin-bottom: 20px;
    }

    p {
        color: #393939;
        font-size: 16px;
    }
`;

const PhoneContainer = styled.div`

`;

const Call = styled(NavLink)`
    display: flex;
    text-decoration: none;
    width: 90%;
    justify-content: space-around;
    font-size: 20px;
    color: #212121;
    letter-spacing: 2px;
    align-items: center;
    transition: 0.5s;

    &:hover {
        transform: scale(1.1, 1.1);
        font-weight: bold;
    }
`;

const StatusContainer = styled.div`
    p {
        color: ${props => props.is_active === 'true' ? '#E23428' : '#5AD07A'};
    }
`;

const OptionsButton = styled(Buttons)`
    font-size: 30px;
    color:#393939;
    display: flex;
    margin-left: 20px;

    svg:nth-child(1) {
        color: #E23428;
        margin-left: 10px;
        transition: 0.5s;
        font-size: 1.05em;

        &:hover {
            transform: scale(1.1, 1.1);
        }
    }

    svg:nth-child(2) {
        color: #5AD07A;
        margin-left: 10px;
        transition: 0.5s;

        &:hover {
            transform: scale(1.1, 1.1);
        }
    }
`;