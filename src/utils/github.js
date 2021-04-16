import { GITHUB_ACCESS_TOKEN } from "../constants"


export const getUser = async (username) => {
    const userData = []

    await fetch(`https://api.github.com/users/${username}/`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`
        }
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            userData.push(data)
        })

    return userData;
}

export const getRepos = async (username) => {
    const repos = []

    await fetch(`https://api.github.com/users/${username}/repos`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`
        }
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            json.map(repo => {
                repos.push(repo)
            })
        })

    return repos;
}

export const getLanguageData = async (repo) => {
    return await fetch(`${repo}/languages`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`
        }
    })
        .then(async res => {
            return res.json()
        })
}

export const getRepoCommits = async (repoURL) => {

    const simpleCommitData = [];

    await fetch(`${repoURL}/commits?per_page=100`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`
        }
    })
        .then(res => {
            return res.json()
        }).then(json => {
            json.map(commit => {
                simpleCommitData.push({ name: commit.commit.author.name, login: commit.author.login, date: commit.commit.committer.date })
            })
        })

    return simpleCommitData;
}

export const getRepoCollaborators = async (repoURL) => {

    const simpleCollaborators = []

    await fetch(`${repoURL}/collaborators`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`
        }
    })
        .then(res => {
            return res.json()
        })
        .then(json => {
            json.forEach(coll => {
                simpleCollaborators.push(coll.login)
            })
        })

    return simpleCollaborators

}
