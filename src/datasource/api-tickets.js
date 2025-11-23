let apiURL = import.meta.env.VITE_APP_APIURL
import { getToken } from "../components/auth/auth-helper"

const list = async () => {
    try {
        let response = await fetch(apiURL + '/api/ticket/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const remove = async (id) => {
    try {
        let response = await fetch(apiURL + '/api/ticket/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ getToken()
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const create = async (ticket) => {
    try {
        let response = await fetch(apiURL + '/api/ticket/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ getToken()
            },
            body: JSON.stringify(ticket)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const read = async (id) => {
    try {
        let response = await fetch(apiURL + '/api/ticket/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async (ticket, id) => {
    try {
        let response = await fetch(apiURL + '/api/ticket/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ getToken()
            },
            body: JSON.stringify(ticket)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { list, remove, create, read, update }