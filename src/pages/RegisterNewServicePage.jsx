import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import Header from "../components/Header";
import { UserContext } from "../contexts/UserContext";


export default function RegisterNewServicePage(){
    const [serviceName, setServiceName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_URL;

    function registerNewService(event){
        event.preventDefault()
        let treatedPrice = '';
        if(isNaN(price.replace(',','.'))){
            alert('Preencha um valor válido para o preço!')
            return 
        }
        if(price.includes(',')){
            treatedPrice = (Number(price.replace(',','.'))*100).toFixed(0)
        }else{
            treatedPrice = (Number(price)*100).toFixed(0)
        }
        //body: {name: , description: , image: , price: }
        const url = `${BASE_URL}/service`
        const body = {
            name: serviceName,
            description: description,
            image: image,
            price: treatedPrice
        }
        const config = {headers: {'Authorization': `Bearer ${user.token}`}};
        axios.post(url, body, config)
            .then(resp => {
                console.log(resp.data)
                navigate('/service/me')
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    return(
        <AddServicePageContainer>
            <Header needHome = 'true'/>
            <RegisterServiceForm>
                <RegisterServiceInput required
                type='text'
                placeholder="Nome do serviço"
                value={serviceName}
                onChange={e => setServiceName(e.target.value)}/>
                <RegisterServiceInput required
                type='text'
                placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}/>
                <RegisterServiceInput required
                type='text'
                placeholder="Preço"
                value={price}
                onChange={e => setPrice(e.target.value)}/>
                <RegisterServiceInput required
                type='text'
                placeholder="Imagem"
                value={image}
                onChange={e => setImage(e.target.value)}/>
                <RegisterServiceButton onClick={() => registerNewService(event)}>Cadastrar</RegisterServiceButton>
            </RegisterServiceForm>
        </AddServicePageContainer>
    )
}

const AddServicePageContainer = styled.section`
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

const RegisterServiceForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    border-radius: 5px;
    margin-top: 20px;
`

const RegisterServiceInput = styled.input`
    background-color: #e7e6e6;
    font-size: 20px;
    width: 100%;
    border-radius: 5px;
    outline: none;
    border: 15px;
    height: 55px;
    padding-left: 15px;
    :focus {
        border: 2px solid #ffb6b6;
        margin: 0px;
    }
`

const RegisterServiceButton = styled.button`
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #ffe699;
    font-size: 20px;
    font-weight: 600;
    color: #767171;
    cursor: pointer;
    width: 104%;
    height: 40px;
    margin-top: 10px;
`