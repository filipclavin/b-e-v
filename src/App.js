import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Github from "./Github.js";

function App() {

  const [repos, setRepos] = useState([])
  const [username, setUsername] = useState('')
  const [languages, setLanguages] = useState()

  const fetchRepos = (username) => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => {
        return response.json()
      })
      .then(json => {
        json.map(repo => {
          setRepos(repos => [...repos, repo])
        })
      })
  }

  const getLanguages = (username, repo) => {
    fetch(`https://api.github.com/repos/${username}/${repo}/languages`)
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <button onClick={() => fetchRepos(username)}>fetch repos</button>
        <Github repos={repos} getLanguages={getLanguages} username={username} languages={languages} />
      </header>
    </div>
  );
}

export default App;
