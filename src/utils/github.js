import { GITHUB_ACCESS_TOKEN } from "../constants"

export const getRepos = async (username) => {
    const repos = []

    await fetch(`https://api.github.com/users/${username}/repos`)
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

export const getLanguageData = async (username, repo) => {
    return await fetch(`https://api.github.com/repos/${username}/${repo}/languages`)
        .then(res => {
            return res.json()
        })
        .then(json => {
            const data = {
                labels: Object.keys(json),
                datasets: [{
                    label: '# of Votes',
                    data: Object.values(json),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
            return data
        })
}

export const getRepoCommits = async (repoURL) => {

    const simpleCommitData = [];

    await fetch(`${repoURL}/commits`)
        .then(res => {
            return res.json()
        }).then(json => {
            json.map(commit => {
                console.log(commit)
                simpleCommitData.push({ name: commit.author.login, date: commit.commit.committer.date })
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
