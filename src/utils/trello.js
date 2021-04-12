const key = '6d3cbfc77587e09c39ce716ffc8d43f2';
const token = '0dcb80152cd2afa6dcdb96e1d333d613cfb37f22b68cb780199513488a6781f5';

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


//https://api.trello.com/1/members/5fb28148005793058ac2ba8d?key=6d3cbfc77587e09c39ce716ffc8d43f2&token=0dcb80152cd2afa6dcdb96e1d333d613cfb37f22b68cb780199513488a6781f5
