import React from 'react';
import styled from 'styled-components';
import { IoMdMenu } from 'react-icons/io';
import { IoClose } from "react-icons/io5";

const NavbarContainer = styled.div`
    background-color: blue;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    color: white;
    font-weight: bold;
    font-size: 24px;
`;

const MenuButton = styled.button`
    color: white;
    background: none;
    border: none;
    cursor: pointer;
`;

const NavBar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
        <NavbarContainer>
            <MenuButton onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <IoClose /> : <IoMdMenu />}
            </MenuButton>
            <Title>MiniTwitter</Title>
            {isOpen && (
                <div>
                    <MenuButton>Inicio</MenuButton>
                    <MenuButton>Explorar</MenuButton>
                    <MenuButton>Perfil</MenuButton>
                </div>
            )}
            <MenuButton>Iniciar Sesión</MenuButton>
        </NavbarContainer>
    );
};

export default NavBar;
