import ReactSwipe from 'react-swipe';
import ChartBox from '../components/ChartBox'
import Activity from "../components/graphs/Activity"
import { GlobalStyle } from '../components/themes/GlobalStyle'
import styled from 'styled-components'
import Languages from "../components/graphs/Languages"
import TrelloTaskList from "../components/TrelloTaskList.js";
import ProgressBar from "../components/ProgressBar.js";
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../components/themes/themes'
import { useDarkTheme } from '../components/themes/toggle/UseDarkTheme'
import ThemeToggle from "../components/themes/toggle/toggleTheme"
import MobileHeader from "../components/MobileHeader.js";

const MainDashboard = styled.div`
  margin-top: 5vh;
  margin-left: 3vh;
  height: 92vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  `

const MobileDashboard = ({ repo }) => {
    const [theme, themeToggler] = useDarkTheme();

    const themeMode = theme === 'light' ? lightTheme : darkTheme;
    let reactSwipeEl;

    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyle />
            <MainDashboard className="App">
                <MobileHeader gridArea="header" members={[""]}>
                    <ThemeToggle theme={theme} toggleTheme={themeToggler} />
                </MobileHeader>
                <ReactSwipe
                    className="carousel"
                    swipeOptions={{ continuous: false }}
                    ref={el => (reactSwipeEl = el)}>

                    <div>
                        <ChartBox>
                            <Activity repo={repo} />
                        </ChartBox>
                    </div>
                    <div>
                        <ChartBox gridArea="languages">
                            <Languages repo={repo} />
                        </ChartBox>
                    </div>
                    <div>
                        <ChartBox>
                            <TrelloTaskList />
                        </ChartBox>
                    </div>
                    <div>
                        <ChartBox>
                            <h1>Sprint progress</h1>
                            <ProgressBar />
                        </ChartBox>
                    </div>
                </ReactSwipe>
            </MainDashboard>
        </ThemeProvider>
    );
};

export default MobileDashboard;