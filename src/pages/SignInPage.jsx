import { styled } from "styled-components"


export default function SignInPage(){
    return(
        <SingInContainer>
            <p>Pagina de login</p>
        </SingInContainer>
    )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`