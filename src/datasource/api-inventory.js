// src/datasource/api-inventory.js

let apiURL = import.meta.env.VITE_APP_APIURL;

// 1. LIST tickets
export const listTickets = async (showClosed = false) => {
    try {
        let response = await fetch(
            `${apiURL}/api/tickets?showClosed=${showClosed ? "true" : "false"}`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        );
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

// 2. CREATE ticket
export const createTicket = async (ticket) => {
    try {
        let response = await fetch(`${apiURL}/api/tickets`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

// 3. READ single ticket
export const readTicket = async (id) => {
    try {
        let response = await fetch(`${apiURL}/api/tickets/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

// 4. UPDATE ticket (priority + description only)
export const updateTicket = async (id, updates) => {
    try {
        let response = await fetch(`${apiURL}/api/tickets/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updates)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

// 5. CANCEL ticket
export const cancelTicket = async (id, username) => {
    try {
        let response = await fetch(`${apiURL}/api/tickets/${id}/cancel`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username })
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
