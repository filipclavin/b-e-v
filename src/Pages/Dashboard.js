/* import ChartBox from "../components/ChartBox.js"; */

import Activity from "../components/graphs/Activity"
import Languages from "../components/graphs/Languages"

import styled from 'styled-components'
import { GlobalStyle } from '../components/themes/GlobalStyle'
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



  return (

    <>
      <GlobalStyle />
      <MainDashboard className="App">

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
    </>

  );
};

export default Dashboard;
