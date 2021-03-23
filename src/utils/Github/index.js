import {GITHUB_ACCESS_TOKEN} from "../../constants.js";

export const fetchRepos = async (githubUsername) => {
    let data = await fetch(`https://api.github.com/users/${githubUsername}/repos`).then(response => {
        return response.json()
    })
    return await data
}

export const getLanguages = (githubUsername, repo) => {
    const hello = fetch(`https://api.github.com/repos/${githubUsername}/${repo}/languages`)
        .then(res => {
            return res.json()
        })
        .then(json => {
            setLanguages(json)
        })
}

export const getCollaborators = (githubUsername, repo) => {
    fetch(`https://api.github.com/repos/${githubUsername}/${repo}/collaborators`, {
        method: "GET",
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "authorization": `token ${GITHUB_ACCESS_TOKEN}`
        }
    }).then(res => {
        return res.json()
    }).then(json => {
        setCollaborators(json)
        console.log(collaborators);
    })
};


const Github = (props) => {

    const handleOnClick = (repoName) => {
        props.getLanguages(props.githubUsername, repoName)
        props.getCollaborators(props.githubUsername, repoName)
    }

    return (
        <>
            <ul>
                {
                    props.repos.map(repo => {
                        return (
                            <li onClick={() => handleOnClick(repo.name)}>{repo.name}</li>
                        )
                    })


                }
            </ul>

            {
                props.languages ? Object.entries(props.languages).map((t, k) => <p key={k}>{t}</p>) : null
            }

            <ul>
                {
                    props.collaborators.map(collaborator => {
                        return (
                            <li>{collaborator.login}</li>
                        )
                    })


                }
            </ul>
        </>
    )
}

export default Github
