import { styled } from "styled-components"
import Header from "../components/Header";
import Logo from "../assets/logo-transparente-croped.png"
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/urls";
import axios from "axios";
import { useNavigate } from "react-router";


export default function HomePage(){
    const [services, setServices] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        const url = `${BASE_URL}/service`;
        axios.get(url)
            .then(resp => {
                setServices(resp.data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }, [])

    function seeMore(service){
        //console.log(service)
        navigate(`/service/${service.serviceId}`, {state: service})
    }

    return(
        <HomeContainer tipo={services ? 'flex-start' : 'center'}>
            <Header />
            {services ? 
            services.map(service => (
                <ServicesContainer key={service.serviceId}>
                    <img src={service.image} />
                    <h1>{service.serviceName}</h1>
                    <p>{service.description.split(' ').length > 10 ?  `${service.description.split(' ').slice(0, 10).join(' ')}...` : service.description}​</p>
                    <button onClick={() => seeMore(service)}>MAIS</button>
                </ServicesContainer>
                )
            )
            : 
            <p>Não tem nenhum serviço disponível no momento​</p>}
        </HomeContainer>
    )
}

const HomeContainer = styled.section`
    box-sizing: border-box;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.tipo};
    align-items: center;
    text-align: center;
    padding-left: 33px;
    padding-right: 33px;
    overflow-y: scroll;
    padding-top: 70px;
    padding-bottom: 15px;
    a{
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: black;
        text-decoration: none;
        padding: 18px;
    }
`

const ServicesContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 15px;
    //margin-bottom: 10px;
    border-radius: 20px;
    h1 {
        font-weight: 600;
        font-size: 24px;
        color: #358dcc;
        margin: 0px 20px 15px 20px;
    }
    img{
        width: 80%;
        margin-top: 22px;
        padding: 0px;
        margin-bottom: 10px;
        border-radius: 7px;
    }
    p{
        text-align: center;
        padding: 0px 25px 10px 25px;
        line-height: 22px;
        font-weight: 400;
        font-size: 18px;
    }
    button{
        outline: none;
        border: none;
        border-radius: 20px;
        background-color: #ffe699;
        font-size: 20px;
        font-weight: 600;
        color: black;
        cursor: pointer;
        width: 30%;
        height: 45px;
        margin-bottom: 15px;
        margin-top: 10px;
    }
`