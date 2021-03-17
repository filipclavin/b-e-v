import { githubLogIn } from "./Firebase";

const LogIn = () => {
    return (
        <>
            <button onClick={githubLogIn}>Log in with github</button>
        </>
    )
}

export default LogIn;