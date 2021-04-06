import React from 'react'
import { func, string } from 'prop-types';
import styled from "styled-components"
import { Light } from '@styled-icons/material-twotone/Light'
import { Darkreader } from '@styled-icons/simple-icons/Darkreader'

const LightTheme = styled(Light)`
outline:none;
`
const DarkTheme = styled(Darkreader)`
outline: none;
`

const Button = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.btnColor};
  border-radius: 50%;
  border:none;
  cursor: pointer;
  padding: 0.3rem;
  position: fixed;
  top: 0;
  right: 1vw;
  z-index: 50;
  outline: none;
`;

const ThemeToggle = ({theme,  toggleTheme }) => {
    return (
      <>
      <Button onClick={toggleTheme}>
      {theme === "light" ?
      <DarkTheme width="26" height="26" viewBox="0 0 26 26" style={{ fill: "#000" }}></DarkTheme>
      :<LightTheme width="26" height="26" viewBox="0 0 26 26" style={{ fill: "#fafafa" }}></LightTheme>
    } 
    </Button>

    
    </>
    );
};
ThemeToggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}
export default ThemeToggle;