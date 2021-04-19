/* import ChartBox from "../components/ChartBox.js"; */
import Header from "../components/Header.js";
import Activity from "../components/graphs/Activity"
import Languages from "../components/graphs/Languages"
import { getBoardLists } from "../utils/trello.js";




import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../components/themes/themes'
import { useDarkTheme } from '../components/themes//toggle/UseDarkTheme'
import { GlobalStyle } from '../components/themes/GlobalStyle'
import ThemeToggle from "../components/themes/toggle/toggleTheme"
import TrelloTaskList from "../components/TrelloTaskList.js";
import ProgressBar from "../components/ProgressBar.js";
import ChartBox from '../components/ChartBox'


const MainDashboard = styled.div`
  margin-top: 8vh;
  height: 92vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

   /*  @media (max-width: 1200px) {
        max-width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;        
        align-items: center;
        margin: 0 2rem;
      } */
`;


const Dashboard = ({ repo }) => {

  const [theme, themeToggler] = useDarkTheme();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (

    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <MainDashboard className="App">
        <Header gridArea="header" members={[""]}>
        <ThemeToggle theme={theme} toggleTheme={themeToggler} />
        </Header>
        
        

         <ChartBox> 
          <Activity repo={repo} />
         </ChartBox> 


        <ChartBox gridArea="languages">
          <Languages repo={repo} />
        </ChartBox>

        <ChartBox>
        <TrelloTaskList />
        </ChartBox>

        <ChartBox>
          <h1>Sprint progress</h1>
        <ProgressBar />
        </ChartBox>
      </MainDashboard>
    </ThemeProvider>

  );
};

export default Dashboard;
