import { TRELLO_KEY, TRELLO_TOKEN } from '../constants'

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

export const getBoardLists = async (boardId) => {
    let data = null;
    await fetch(`https://api.trello.com/1/boards/${boardId}/lists?key=${key}&token=${token}`, {
        method: 'GET'
    })
        .then(response => {
            return response.text();
        })
        .then(text => data = text)
        .catch(err => console.error(err));

    if (data) {
        return data;
    }
}

export const getSelectedList = async (listId) => {
    let data = [];

    await fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${key}&token=${token}`, {
        method: 'GET'
    })
        .then(response => {
            return response.text();
        })
        .then(text => {
            data.push(text)
        })
        .catch(err => console.error(err));

    if (data) {
        return data;
    }
}


export const getMemberFromId = async (memberId) => {
    let data = null;
    await fetch(`https://api.trello.com/1/members/${memberId}?key=${key}&token=${token}`, {
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
        .then(text => data = JSON.parse(text).username)
        .catch(err => console.error(err));
    return data
}

export const getTrelloCards = async (emojiToken) => {
    const data = await getBoardLists("P6EjDUbm").then((res) => {
        const lists = [];
        JSON.parse(res).forEach(list => {

            if (list.name.charAt(0) == emojiToken) {
                lists.push(list.id)
            }
        })
        return lists
    })

    const cards = []
    for (const item of data) {
        await getSelectedList(item).then((res) => {
            cards.push(JSON.parse(res));
        })
    }

    const merged = [].concat.apply([], cards);

    const trelloCards = []
    merged.forEach(card => {
        trelloCards.push(card.name);
    })

    return trelloCards
}

export const letsDoTheProgressbarWoo = async (remainingSymbol, completedSymbol) => {
    const data = await getBoardLists("P6EjDUbm").then((res) => {

        const lists = []
        const remaining = [];
        const completed = [];
        JSON.parse(res).forEach(list => {
            if (list.name.split(" ")[0] == remainingSymbol) {
                remaining.push(list.id)
            }
            if (list.name.split(" ")[0] == completedSymbol) {
                completed.push((list.id))
            }
        })
        lists.push(remaining);
        lists.push(completed)
        return lists
    })


    const cards = new Map();
    cards.set('remainingCards', 0)
    cards.set('completedCards', 0)

    for (const item of data[0]) {
        await getSelectedList(item).then((res) => {
            cards.set('remainingCards', cards.get('remainingCards') + JSON.parse(res).length)
        })
    }
    for (const item of data[1]) {
        await getSelectedList(item).then((res) => {
            cards.set('completedCards', cards.get('completedCards') + JSON.parse(res).length)
        })
    }

    return cards
}
