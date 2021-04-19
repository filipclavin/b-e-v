import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

body {
    background: ${({theme}) => theme.body};
    color: ${({ theme }) => theme.fontColor};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 100 linear;
    
}
`;