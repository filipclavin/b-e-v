import { useEffect, useState } from 'react';
import Github from "./Github.js";
import { getUsers, createUser, removeUser } from "./config/firebaseconfig"
import { githubProvider, googleProvider } from './config/AuthMethods';

import socialAuth from './Authentication/Auth'


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

/* Onclick handler */
  const handleOnClick = async (provider) => {
    const res = await socialAuth(provider);
    console.log(res)
  }

  return (
    <>
      <input type="text" value={githubUsername} onChange={e => setGithubUsername(e.target.value)} />
      <button onClick={() => fetchRepos(githubUsername)}>fetch repos</button>
      <Github repos={repos} getLanguages={getLanguages} username={username} languages={languages} />
      <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
      <button onClick={() => createUser(username)}>create user</button>
      <button onClick={() => removeUser(username)}>remove user</button>

{/* Social inlog */}
      <div className="socialAuth"> 
        <h1>Log in</h1>
        <button onClick={() => handleOnClick(githubProvider)}>github</button>
        <button onClick={() => handleOnClick(googleProvider)}>google</button>
    
      </div>
    </>
  );
}

export default App;
