import { githubLogIn } from "../utils/Firebase";

const Landing = () => {
    return (
        <>
            <button onClick={githubLogIn}>Log in with github</button>
        </>
    )
}

export default Landing;