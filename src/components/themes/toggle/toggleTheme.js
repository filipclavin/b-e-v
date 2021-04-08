import React from 'react'
import { func, string } from 'prop-types';
import styled from "styled-components"
import { DarkTheme } from '@styled-icons/fluentui-system-filled/DarkTheme'

const DarkMode = styled(DarkTheme)`
outline: none;
`

const Button = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.btnColor};
  border-radius: 50%;
  border:none;
  cursor: pointer;
  padding: 0.3rem;
  position: relative;
  z-index: 50;
  outline: none;
`;

const ThemeToggle = ({theme,  toggleTheme }) => {
    return (
      <>
      <Button onClick={toggleTheme}>
      {theme === "light" ?
      <DarkMode width="26" height="26" viewBox="0 0 26 26" style={{ fill: "#000" }}></DarkMode>
      :<DarkMode width="26" height="26" viewBox="0 0 26 26" style={{ fill: "#fafafa" }}></DarkMode>
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