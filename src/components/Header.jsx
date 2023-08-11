import { styled } from "styled-components";
import { IoExitOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5"
import { IoEnterOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { GoHome } from "react-icons/go"

export default function Header(props){
    const navigate = useNavigate();
    const [out, setOut] = useState(false);
    const {user, setUser} = useContext(UserContext)
    const {needHome} = props
    //console.log(user)
    //const user = JSON.parse(localStorage.getItem("user")) //{name, token}

    function exit(event){
        event.preventDefault();
        const confirmation = confirm('Você deseja fazer logout da sua conta?')
        if(confirmation){
            localStorage.removeItem("user");
            setUser(null);
            const outt = !out;
            setOut(outt);
        }
    }

    return(
        <Topo>
            <p>{user ? `Olá, ${user.name}!` : `Olá!`}</p>
            <div>
                {needHome ? 
                    <GoHome style={settingsStyle} onClick={() => navigate('/')}/>
                    :
                    ''
                }
                <IoSettingsOutline onClick={() => navigate('/service/me')} style={settingsStyle}/>
                {user ? 
                    <IoExitOutline onClick={exit} style={exitStyle}/> 
                    : 
                    <IoEnterOutline onClick={() => navigate('/signin')} style={exitStyle}/>
                }
            </div>
        </Topo>
    )

}

const Topo = styled.div`
    box-sizing: border-box;
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 18px 8px 18px;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: #49a6d4;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 4;
    div{
        display: flex;
    }
    p{
    line-height: 49px;
    color: black;
    font-weight: 600;
    font-size: 24px;
    }
    img{
        width: 51px;
        height: 51px;
        border-radius: 100px;
    }
`

const exitStyle = {
    fontSize: "25px",
    fontWeight: 'bold',
    //color: 'black',
    fill: 'black',
    marginLeft: "5px"
}

const settingsStyle = {
    fontSize: "25px",
    fontWeight: 'bold',
    //color: 'black',
    fill: 'black',
    marginLeft: "5px",
    marginRight: "5px"
}