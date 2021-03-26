import { useEffect, useState } from "react"
import { Router, Switch } from "react-router"
import { getRepos } from "../utils/github"
import { getLanguageData } from "../utils/github"
import Dashboard from "./Dashboard"
import { githubLogOut } from "../utils/firebase"

const Overview = () => {

    /* const [repos, setRepos] = useState(getRepos('filipclavin')
        .then(response => {
            return response
        }));

    const [dashboard, setDashboard] = useState()

    const getData = repo => {
        setDashboard(<Dashboard languages={repo.languages} />)
    }

    return (
        dashboard
            ? dashboard
            : repos.map(repo => {
                return (
                    <h1 onClick={getData(repo)}>{repo.name}</h1>
                )
            })

    ) */

    return (
        <button onClick={githubLogOut}>Log out</button>
    )



}

export default Overview