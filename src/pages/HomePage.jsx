import { styled } from "styled-components"
import Header from "../components/Header";
import Logo from "../assets/logo-transparente-croped.png"


export default function HomePage(){
    const user = JSON.parse(localStorage.getItem("user"));
    return(
        <HomeContainer>
            <Header />
            <ServicesContainer>
                <img src={Logo} />
                <h1>Soluções em nuvem</h1>
                <p>Soluções para armazenamento e compartilhamento de informações em nuvem​</p>
                <button>MAIS</button>
            </ServicesContainer>
            <ServicesContainer>
                <img src={Logo} />
                <h1>Soluções em nuvem</h1>
                <p>Soluções para armazenamento e compartilhamento de informações em nuvem​</p>
                <button>MAIS</button>
            </ServicesContainer>
            <ServicesContainer>
                <img src={Logo} />
                <h1>Soluções em nuvem</h1>
                <p>Soluções para armazenamento e compartilhamento de informações em nuvem​</p>
                <button>MAIS</button>
            </ServicesContainer>
        </HomeContainer>
    )
}

const HomeContainer = styled.section`
    box-sizing: border-box;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-left: 33px;
    padding-right: 33px;
    overflow-y: scroll;
    padding-top: 70px;
    padding-bottom: 15px;
    img{
        width: 80%;
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
        margin-bottom: 15px;
    }
    img{
        width: 80%;
        margin-top: 15px;
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