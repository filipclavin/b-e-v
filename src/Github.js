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