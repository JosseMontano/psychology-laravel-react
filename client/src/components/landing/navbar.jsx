import React, { useState } from 'react';
import { ButtonContainer, DisplayButton, LoginLink, Nav, OptionLink, OptionList, PageTitle, RegisterLink, TitleLink } from '../../styles/pages/landing';
import Logo from '../../assets/logo/logo.png'

const Navbar = () => {
  const [displayOptions, setDisplayOptions] = useState(false);

  return (
    <Nav>
      <ButtonContainer>
        <TitleLink to="/">
          <PageTitle><img src={Logo}/>Psicotest</PageTitle>
        </TitleLink>
        <DisplayButton onClick={() => setDisplayOptions(!displayOptions)}>
          {
            displayOptions ? 
            <i className="fa-solid fa-xmark"></i> : 
            <i className="fa-solid fa-bars"></i>
          }
        </DisplayButton>
      </ButtonContainer>
      <OptionList open={displayOptions}>
        <li>
          <OptionLink to="/">Inicio</OptionLink>
        </li>
        <li>
          <LoginLink to="/login">Inicia sesión</LoginLink>
        </li>
        <li>
          <RegisterLink to="/register">Registrarse</RegisterLink>
        </li>
      </OptionList>
    </Nav>
  )
}

export default Navbar;