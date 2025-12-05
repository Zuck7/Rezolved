let apiURL = import.meta.env.VITE_APP_APIURL
import { getToken } from "../components/auth/auth-helper"

const listEvents = async () => {
    try {
        let response = await fetch(apiURL + '/api/events/', {
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

const removeEvent = async (id) => {
    try {
        let response = await fetch(apiURL + '/api/events/' + id, {
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

const createEvent = async (event) => {
    try {
        let response = await fetch(apiURL + '/api/events/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ getToken()
            },
            body: JSON.stringify(event)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const readEvent = async (id) => {
    try {
        let response = await fetch(apiURL + '/api/events/' + id, {
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

const updateEvent = async (event, id) => {
    try {
        let response = await fetch(apiURL + '/api/events/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ getToken()
            },
            body: JSON.stringify(event)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { listEvents, removeEvent, createEvent, readEvent, updateEvent }