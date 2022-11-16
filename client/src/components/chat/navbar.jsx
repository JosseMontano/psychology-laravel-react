import React from "react";
import styled from "styled-components";
import { useUserContext } from "../../context/userContext";
import ProfilePic from "../globals/profilePic";

const Navbar = ({ handleChange }) => {
  const { user } = useUserContext();

  return (
    <Container>
      <span className="logo">UNIFRANZ</span>
      <div className="user">
        <ProfilePic
          width="24px"
          height="24px"
          id={user.id}
          perfil={user.perfil}
        />
        {/*  <span className="username">{user.nombre}</span> */}
        {/* <select onChange={(e) => handleChange(e.target.value)}>
          <option value={1}>Chatear</option>
          <option value={2}>Contactos</option>
        </select> */}
      </div>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #2f2d52;
  height: 45px;
  padding: 10px;
  justify-content: space-between;
  color: #ddddf7;

  @media (max-width: 1080px) {
      flex-direction: column;
      height: auto;
    }
  .logo {
    font-weight: bold;

  }

  .username{
    @media (max-width: 1564px) {
      display: none;
    }
  }
  .user {
    display: flex;
    gap: 10px;

    button {
      background-color: #5d5b8d;
      color: #ddddf7;
      font-size: 10px;
      border: none;
      cursor: pointer;
      @media (max-width: 768px) {
        position: absolute;
        bottom: 10px;
      }
    }
  }
`;