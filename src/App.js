import { useEffect, useState } from 'react';
import Github from "./Github.js";
import { getUsers, createUser, removeUser } from "./Firebase"

function App() {

  const [repos, setRepos] = useState([])
  const [githubUsername, setGithubUsername] = useState('')
  const [languages, setLanguages] = useState()

  const [username, setUsername] = useState('')
  useEffect(() => {
    getUsers()
  }, [])

  const fetchRepos = (githubUsername) => {
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
      .then(response => {
        return response.json()
      })
      .then(json => {
        setLanguages(json)
      })
  }

  useEffect(() => {
    console.log(languages);
  }, [languages])

  return (
    <>
      <input type="text" value={githubUsername} onChange={e => setGithubUsername(e.target.value)} />
      <button onClick={() => fetchRepos(githubUsername)}>fetch repos</button>
      <Github repos={repos} getLanguages={getLanguages} username={username} languages={languages} />
      <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
      <button onClick={() => createUser(username)}>create user</button>
      <button onClick={() => removeUser(username)}>remove user</button>
    </>
  );
}

export default App;
