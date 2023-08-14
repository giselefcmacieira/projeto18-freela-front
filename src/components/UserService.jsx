import { styled } from "styled-components";
import { BsCircle } from "react-icons/bs"
import {BsCheckCircle} from "react-icons/bs"
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { FaTrash } from "react-icons/fa"


export default function UserService(props){
    const {service, availabilityChanged, setAvailabilityChanged, serviceDeleted, setServiceDeleted} = props;

    const {user, setUser} = useContext(UserContext);

    const BASE_URL = import.meta.env.VITE_API_URL
    //console.log(service.serviceId)

    function changeAvailability(event){
        const url = `${BASE_URL}/service/availability/${service.serviceId}`;
        const config = {headers: {'Authorization': `Bearer ${user.token}`}};
        axios.put(url, {}, config)
            .then(resp => {
                const aux = !availabilityChanged
                setAvailabilityChanged(aux)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    function deleteService(event){
        event.stopPropagation();
        const url = `${BASE_URL}/service/${service.serviceId}`;
        const config = {headers: {'Authorization': `Bearer ${user.token}`}};
        const confirmation = confirm(`Deseja excluir permanentemente o serviço ${service.serviceName}?`)
        if(confirmation){
            axios.delete(url, config)
            .then(resp => {
                console.log(resp.data)
                const aux = !serviceDeleted
                setServiceDeleted(aux)
            })
            .catch(err => {
                console.log(err.message.data)
            })
        }
    }
    return(
        <UserServiceContainer>
            <img src={service.image}/>
            <InfoContainer>
                <h1>{service.serviceName}</h1>
                <p><strong>Preço:</strong> R$ {(service.price/100).toFixed(2).toString().replace('.',',')}</p>
                <Availability available={service.available ? 'green' : 'red'}>{service.available ? 'Disponível' : 'Indisponível'}</Availability>
            </InfoContainer>
            <CheckContainer color={service.available ? 'green' : '#767171'} onClick={changeAvailability}>
                <TrashContainer>
                    <FaTrash onClick={deleteService}></FaTrash>
                </TrashContainer>
                {service.available ? <BsCheckCircle style={Style}></BsCheckCircle> : <BsCircle style={Style}></BsCircle>}
            </CheckContainer>
        </UserServiceContainer>
    )
}


const UserServiceContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-top: 15px;
    padding: 15px;
    //margin-bottom: 10px;
    border-radius: 20px;
    img{
        width: 35%;
        //margin-top: 22px;
        padding: 0px;
        //margin-bottom: 10px;
        border-radius: 7px;
    }
    p{
        padding: 0px 25px 10px 25px;
        line-height: 22px;
        font-weight: 400;
        font-size: 18px;
    }
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;

    h1 {
        font-weight: 600;
        font-size: 16px;
        color: #358dcc;
        margin: 0px 20px 5px 20px;
        line-height: 22px;
    }
    strong{
        text-align: left;
        font-weight: 700;
        font-size: 16px;
        //padding: 0px 25px 10px 25px;
    }
    p{
        padding: 0px 20px 5px 20px;
        //line-height: 22px;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
    }
`

const Availability = styled.p`
    padding: 0px 20px 0px 20px;
    //line-height: 22px;
    font-weight: 700;
    font-size: 16px;
    line-height: 25px;
    color: ${props => props.available};
`

const CheckContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: 600;
    color: ${props => props.color};
    cursor: pointer;
    margin-bottom: 15px;
    margin-top: 10px;
    height: 100%;
    position: relative;
`
const TrashContainer = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 16px;
    color: #ed9200;
`
const Style = {
    marginTop: "28px"
}