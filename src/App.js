import { useEffect, useState } from 'react';
import Github from "./Github.js";
import { getUsers, createUser, removeUser } from "./Firebase"

function App() {

  const [repos, setRepos] = useState([])
  const [githubUsername, setGithubUsername] = useState('')
  const [languages, setLanguages] = useState()
  const [collaborators, setCollaborators] = useState([])

  const [username, setUsername] = useState('')
  useEffect(() => {
    getUsers()
  }, [])

  const fetchRepos = (githubUsername) => {
    setRepos([])
    setLanguages()
    fetch(`https://api.github.com/users/${githubUsername}/repos`)
      .then(response => {
        return response.json()
      })
      .then(json => {
        json.map(repo => {
          setRepos(repos => [...repos, repo])
        })
      })
  }

  const getLanguages = (githubUsername, repo) => {
    fetch(`https://api.github.com/repos/${githubUsername}/${repo}/languages`)
      .then(res => {
        return res.json()
      })
      .then(json => {
        setLanguages(json)
      })
  }

  const getCollaborators = (githubUsername, repo) => {
    fetch(`https://api.github.com/repos/${githubUsername}/${repo}/collaborators`, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        "authorization": "token 57c063f3de3f3d6b1c6d4835444c8e39db391a45"
      }
    }).then(res => {
      return res.json()
    }).then(json => {
      setCollaborators(json)
    })
  }

  useEffect(() => {
    console.log(languages);
  }, [languages])

  return (
    <>
      <input type="text" value={githubUsername} onChange={e => setGithubUsername(e.target.value)} />
      <button onClick={() => fetchRepos(githubUsername)}>fetch repos</button>
      <Github repos={repos} getLanguages={getLanguages} getCollaborators={getCollaborators} githubUsername={githubUsername} languages={languages} collaborators={collaborators} />
      <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
      <button onClick={() => createUser(username)}>create user</button>
      <button onClick={() => removeUser(username)}>remove user</button>
    </>
  );
}

export default App;
