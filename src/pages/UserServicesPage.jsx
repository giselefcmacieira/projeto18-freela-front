import { useContext, useEffect, useState } from "react"
import { styled } from "styled-components";
import Header from "../components/Header";
import { UserContext } from "../contexts/UserContext"
import { BASE_URL } from "../constants/urls";
import axios from "axios";
import UserService from "../components/UserService";
import { useNavigate } from "react-router";


export default function UserServicesPage () {
    const {user, setUser} = useContext(UserContext);
    const [userServices, setUserServices] = useState(null)
    const [availabilityChanged, setAvailabilityChanged] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const url = `${BASE_URL}/service/me`;
        const config = {headers: {'Authorization': `Bearer ${user.token}`}};
        axios.get(url, config)
            .then(resp => {
                setUserServices(resp.data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }, [availabilityChanged])

    return(
        <UserServicePageContainer tipo={userServices ? 'flex-start' : 'center'}>
            <Header needHome = 'true'/> 
            <AddService onClick = {() => navigate("/addservice")}>Cadastrar novo serviço</AddService>
            {userServices ? 
            userServices.map(service => (
                <UserService 
                    key = {service.serviceId} 
                    service={service} 
                    availabilityChanged={availabilityChanged} 
                    setAvailabilityChanged={setAvailabilityChanged}
                />
            ))
            : 
            <p>Você ainda não tem nenhum serviço cadastrado​</p>}
        </UserServicePageContainer>
    )
}

const UserServicePageContainer = styled.section`
    box-sizing: border-box;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.tipo};
    align-items: center;
    padding-left: 33px;
    padding-right: 33px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-top: 70px;
    padding-bottom: 15px;
`
const AddService = styled.button`
    outline: none;
    border: none;
    border-radius: 8px;
    background-color: #ffe699;
    font-size: 20px;
    font-weight: 600;
    color: #767171;
    cursor: pointer;
    width: calc(100% + 30px);
    height: 45px;
    margin-bottom: 0px;
    margin-top: 15px;
`