import { useLocation } from "react-router"
import { styled } from "styled-components"
import Header from "../components/Header"


export default function ServicePage(){
    const data = useLocation()
    const service = data.state
    console.log(service)
    const price = (service.price/100).toFixed(2).toString().replace('.',',')
    let phone = ''
    if(service.phoneNumber.length === 11) {
        const parte1 = service.phoneNumber.slice(0,2);
        const parte2 = service.phoneNumber.slice(2,7);
        const parte3 = service.phoneNumber.slice(7,11)
        phone = `(${parte1}) ${parte2}-${parte3}`        
    } else {
        const parte1 = service.phoneNumber.slice(0,2);
        const parte2 = service.phoneNumber.slice(2,6);
        const parte3 = service.phoneNumber.slice(6,10)
        phone = `(${parte1}) ${parte2}-${parte3}`
    }
    return(
        <ServicePageContainer>
            <Header needHome = 'true'/>
            <ServiceContainer>
                <img src={service.image}/>
                <h1>{service.serviceName}</h1>
                <h2>{service.description}</h2>
                <InfoContainer>
                    <p><strong>Preço: </strong> R$ {price}</p>
                    <p><strong>Prestador de serviço: </strong> {service.userName} {service.userLastname}</p>
                    <p><strong>Telefone: </strong> {phone}</p>
                    <p><strong>E-mail: </strong> {service.email}</p>
                    <p><strong>Endereço: </strong> {service.logradouro} 
                    < br /> 
                    {service.bairro} 
                    < br />
                    {service.city} - {service.uf}
                    </p>
                </InfoContainer>
                
            </ServiceContainer>
        </ServicePageContainer>
        
    )
}

const ServicePageContainer = styled.section`
    box-sizing: border-box;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.tipo};
    align-items: center;
    padding-left: 33px;
    padding-right: 33px;
    overflow-y: scroll;
    padding-top: 70px;
    padding-bottom: 15px;
    img{
        width: calc(100% - 40px);
        padding-bottom: 10px;
        padding-top: 0px;
    }
    a{
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: black;
        text-decoration: none;
        padding: 18px;
    }
`

const ServiceContainer = styled.div`
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
        text-align: center;
        font-weight: 600;
        font-size: 24px;
        color: #358dcc;
        margin: 10px 20px 15px 20px;
    }
    img{
        width: 80%;
        margin-top: 22px;
        padding: 0px;
        margin-bottom: 10px;
        border-radius: 7px;
    }
    h2{
        text-align: center;
        padding: 0px 27px 15px 27px;
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
    padding-bottom: 10px;
    strong{
        text-align: left;
        font-weight: 700;
        font-size: 18px;
        //padding: 0px 25px 10px 25px;
    }
    p{
        padding: 0px 25px 10px 35px;
        line-height: 22px;
        font-weight: 400;
        font-size: 18px;
        line-height: 25px;
    }
`