// src/datasource/api-tickets.js

let apiURL = import.meta.env.VITE_APP_APIURL;

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;
    return {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` })
    };
};

// 1. LIST tickets
export const list = async (showClosed = false) => {
    try {
        let response = await fetch(
            `${apiURL}/api/tickets?showClosed=${showClosed ? "true" : "false"}`,
            {
                method: "GET",
                headers: getAuthHeaders()
            }
        );

        if (!response.ok) {
            console.error('List tickets error:', response.status);
            return { success: false, message: `Server Error: ${response.status}`, data: [] };
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message, data: [] };
    }
};

// 2. CREATE ticket
export const create = async (ticket) => {
    try {
        console.log("API: Creating ticket with data:", ticket);
        console.log("API: Request body:", JSON.stringify(ticket));

        let response = await fetch(`${apiURL}/api/tickets`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(ticket)
        });

        console.log("API: Response status:", response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Create ticket error:', response.status, errorData);
            return { success: false, message: errorData.message || `Server Error: ${response.status}` };
        }

        const data = await response.json();
        console.log("API: Success response:", data);
        return data;
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
};

// 3. READ single ticket
export const read = async (id) => {
    try {
        let response = await fetch(`${apiURL}/api/tickets/${id}`, {
            method: "GET",
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            console.error('Read ticket error:', response.status);
            return { success: false, message: `Server Error: ${response.status}` };
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
};

// 4. UPDATE ticket
export const update = async (ticket, id) => {
    try {
        let response = await fetch(`${apiURL}/api/tickets/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(ticket)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Update ticket error:', response.status, errorData);
            return { success: false, message: errorData.message || `Server Error: ${response.status}` };
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
};

// 5. REMOVE/CANCEL ticket (uses cancel endpoint since backend doesn't have hard delete)
export const remove = async (id) => {
    try {
        let response = await fetch(`${apiURL}/api/tickets/${id}/cancel`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({ userEmail: "User" })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Cancel ticket error:', response.status, errorData);
            return { success: false, message: errorData.message || `Server Error: ${response.status}` };
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
};

// 6. DELETE ticket permanently
export const deleteTicket = async (id) => {
    try {
        let response = await fetch(`${apiURL}/api/tickets/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Delete ticket error:', response.status, errorData);
            return { success: false, message: errorData.message || `Server Error: ${response.status}` };
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
};

// 7. RESTORE ticket (Admin only)
export const restoreTicket = async (id) => {
    try {
        let response = await fetch(`${apiURL}/api/tickets/${id}/restore`, {
            method: "PUT",
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Restore ticket error:', response.status, errorData);
            return { success: false, message: errorData.message || `Server Error: ${response.status}` };
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
};
