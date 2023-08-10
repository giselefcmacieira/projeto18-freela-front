import { styled } from "styled-components"
import logo from "../assets/logo-transparente-croped.png"
import { Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/urls";

export default function SignUpPage(){

    const [cepSearched, setCepSearched] = useState(false);
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    function search (event){
        event.preventDefault()
        const url = `https://viacep.com.br/ws/${cep}/json/`
        if(cep.length === 8){
            axios.get(url)
            .then(resp => {
                if(resp.data.erro){
                    setCidade('')
                    setUf('')
                    setLogradouro('')
                    setBairro('')
                    alert('CEP não encontrado!')
                }else{
                    setCidade(resp.data.localidade)
                    setUf(resp.data.uf)
                    setLogradouro(resp.data.logradouro)
                    setBairro(resp.data.bairro)
                }
            })
            .catch(err =>{
                alert(err.message)
            })
            setCepSearched(true);
        }else{
            alert('Insira um CEP válido com 8 digitos.')
        }
    }

    function register(event){
        event.preventDefault();
        if(password === confPassword){
            const url = `${BASE_URL}/signup`
            //body: {name , lastname, cpf, phoneNumber, cep, city, uf, logradouro, bairro, email, password}
            const body = {
                name: nome, 
                lastname: sobrenome, 
                cpf: cpf, 
                phoneNumber: telefone, 
                cep: cep, 
                city: cidade, 
                uf: uf, 
                logradouro: logradouro, 
                bairro: bairro, 
                email: email, 
                password: password
            }
            axios.post(url, body)
                .then(resp => {
                    console.log(resp.data)
                })
                .catch(err => {
                    alert(err.response.data)
                })
        }else{
            alert('A senha e confirmação de senha devem ser iguais!')
        }
        
    }

    return(
        <SingUpContainer>
            <img src={logo} />
            <SignUpForm onSubmit={register}>
                <SignUpInput required
                type='text'
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                />
                <SignUpInput required
                type='text'
                placeholder="Sobrenome"
                value={sobrenome}
                onChange={e => setSobrenome(e.target.value)}
                />
                <SignUpInput required
                type='number'
                placeholder="CPF"
                value={cpf}
                onChange={e => setCpf(e.target.value)}
                />
                <SignUpInput required
                type='number'
                placeholder="Telefone"
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
                />

                <CEPContainer>
                <input required
                type='number'
                placeholder="CEP"
                value={cep}
                onChange={e => setCep(e.target.value)}
                />
                <CEPButton onClick={search}>Buscar</CEPButton>
                </CEPContainer>

                {cepSearched ? <>
                    <CEPContainer tipo='cidade'>
                    <input required
                    type='text'
                    placeholder="Cidade"
                    value={cidade}
                    onChange={e => setCidade(e.target.value)}
                    />
                    <input required
                    type='text'
                    placeholder="UF"
                    value={uf}
                    onChange={e => setUf(e.target.value)}
                    />
                    </CEPContainer>
                    <CEPContainer tipo='bairro'>
                    <input required
                    type='text'
                    placeholder="Logradouro"
                    value={logradouro}
                    onChange={e => setLogradouro(e.target.value)}
                    />
                    <input required
                    type='text'
                    placeholder="Bairro"
                    value={bairro}
                    onChange={e => setBairro(e.target.value)}
                    />
                    </CEPContainer>
                    </> : 
                    ''
                }
                
                <SignUpInput required
                type='email'
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <SignUpInput required
                type='password'
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <SignUpInput required
                type='password'
                placeholder="Confirme a senha"
                value={confPassword}
                onChange={e => setConfPassword(e.target.value)}
                />
                <SignUpButton type='submit'>Cadastrar</SignUpButton>
            </SignUpForm>
            <Link to = '/signin'>
                Já tem uma conta? Entre agora!
            </Link>
        </SingUpContainer>
    )
}

const SingUpContainer = styled.section`
    box-sizing: border-box;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 33px;
    padding-right: 33px;
    overflow-y: scroll;
    img{
        width: 80%;
        padding-bottom: 15px;
        padding-top: 60px;
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

const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    border-radius: 5px;
`
const CEPContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    width: 100%;
    border-radius: 5px;
    input:first-child{
        background-color: #e7e6e6;
        font-size: 20px;
        padding-left: 15px;
        width: ${props => {
            if(props.tipo === 'cidade'){
                return '80%'
            }if(props.tipo === 'bairro'){
                return '60%'
            }else{
                return '70%'
            }
        }};
        border-radius: 5px;
        outline: none;
        border: 15px;
        height: 45px;
        :focus {
            border: 2px solid #ffb6b6;
            margin: 0px;
        }
    }
    input:nth-child(2){
        background-color: #e7e6e6;
        font-size: 20px;
        padding-left: 15px;
        width: ${props => {
            if(props.tipo === 'cidade'){
                return '20%'
            }else{
                return '40%'
            }
        }};
        border-radius: 5px;
        outline: none;
        border: 15px;
        height: 45px;
        :focus {
            border: 2px solid #ffb6b6;
            margin: 0px;
        }
    }
`
const CEPButton = styled.button`
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #ffe699;
    font-size: 20px;
    font-weight: 600;
    color: #767171;
    cursor: pointer;
    width: 30%;
    height: 45px;
`
const SignUpInput = styled.input`
    background-color: #e7e6e6;
    font-size: 20px;
    width: 96%;
    border-radius: 5px;
    outline: none;
    border: 15px;
    height: 45px;
    padding-left: 15px;
    :focus {
        border: 2px solid #ffb6b6;
        margin: 0px;
    }
`
const SignUpButton = styled.button`
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #ffe699;
    font-size: 20px;
    font-weight: 600;
    color: #767171;
    cursor: pointer;
    width: 100%;
    height: 40px;
`