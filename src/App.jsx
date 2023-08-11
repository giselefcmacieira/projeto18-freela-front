import { styled } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import UserProvider from "./contexts/UserContext";
import ServicePage from "./pages/ServicePage";

export default function App() {

  return (
    <PagesContainer>
      <BrowserRouter>
      <UserProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element = {<SignUpPage />}/>
            <Route path="/signin" element = {<SignInPage />}/>
            <Route path='/service/:id' element ={<ServicePage />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #ffd966;
  width: 100vw;
  //max-height: 100vh;
  //padding: 25px;
`
