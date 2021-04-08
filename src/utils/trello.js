import {TRELLO_KEY, TRELLO_TOKEN } from '../constants'

const key = TRELLO_KEY;
const token = TRELLO_TOKEN;

export const getTrelloBoard = (boardId) => {

    fetch(`https://api.trello.com/1/boards/${boardId}/memberships?key=${key}&token=${token}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        })
        .then(text => console.log(text))
        .catch(err => console.error(err));
}

export const postNewCard = (list, text, user) => {
    fetch(`https://api.trello.com/1/cards?key=${key}&token=${token}&idList=${list}&name=${text}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            console.log(
                `Response: ${response.status}`
            );
            return response.text();
        })
        .then(text => console.log(text))
        .catch(err => console.error(err));
}

export const getBoardLists = (boardId) => {
    fetch(`https://api.trello.com/1/boards/${boardId}/lists?key=${key}&token=${token}`, {
        method: 'GET'
    })
        .then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        })
        .then(text => console.log(text))
        .catch(err => console.error(err));
}

export const getSelectedList = (listId) => {
    fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${key}&token=${token}`, {
        method: 'GET'
    })
        .then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        })
        .then(text => console.log(text))
        .catch(err => console.error(err));
}


const memberId = '5fb28148005793058ac2ba8d' //robbans id
export const getMemberFromId = (memberId) => {
    fetch(`https://api.trello.com/1/members/${memberId}?key=${key}&token=${token}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        })
        .then(text => console.log(text))
        .catch(err => console.error(err));
}
