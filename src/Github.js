import { useState } from "react"

const Github = (props) => {

    return (
        <>
            <ul>
                {
                    props.repos.map(repo => {
                        return (
                            <li onClick={e => props.getLanguages(props.username, repo.name)}>{repo.name}</li>
                        )
                    })



                }
            </ul>

            {
                props.languages ? Object.entries(props.languages).map((t, k) => <p key={k}>{t}</p>) : null
            }
        </>
    )
}

export default Github