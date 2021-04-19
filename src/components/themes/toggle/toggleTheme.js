import React from 'react'
import { func, string } from 'prop-types';
import styled from "styled-components"
import { DarkTheme } from '@styled-icons/fluentui-system-filled/DarkTheme'

const DarkMode = styled(DarkTheme)`
outline: none;
`

const Button = styled.button`
  position: relative;
  background: transparent;
  border-radius: 50%;
  border:none;
  cursor: pointer;
  position: relative;
  z-index: 30;
  outline: none;
`;

const ThemeToggle = ({theme, toggleTheme }) => {
    return (
      <>
      <Button onClick={toggleTheme}>
        {theme === "light" ?
        <DarkMode width="36" height="36"  style={{ fill: "#333333" }}></DarkMode>
        :<DarkMode width="36" height="36"  style={{ fill: "#f2f2f2" }}></DarkMode>
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