import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import logo from "../assets/logo-transparente-croped.png"
import { BASE_URL } from "../constants/urls";
import { UserContext } from "../contexts/UserContext"


export default function SignInPage(){
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {user, setUser} = useContext(UserContext)


    function signIn(event){
        event.preventDefault();
        //body: {email, password}
        const url = `${BASE_URL}/signin`
        const body = {
            email,
            password
        }
        axios.post(url, body)
            .then(resp => {
                localStorage.setItem("user", JSON.stringify(resp.data));
                setUser(resp.data)
                navigate('/');
            })
            .catch(err => {
                alert(err.response.data)
            })
    }

    return(
        <SingInContainer>
            <img src={logo} />
            <SignInForm onSubmit={signIn}>
                <SignInInput required
                type='email'
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}/>
                <SignInInput required
                type='password'
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}/>
                <SignInButton type='submit'>Entrar</SignInButton>
            </SignInForm>
            <Link to= '/signup'>
                Primeira vez? Cadastre-se!
            </Link>
        </SingInContainer>
    )
}

const SingInContainer = styled.section`
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
        padding-bottom: 55px;
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

const SignInForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    border-radius: 5px;
`

const SignInInput = styled.input`
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

const SignInButton = styled.button`
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