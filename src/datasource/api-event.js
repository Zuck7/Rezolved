// src/datasource/api-event.js

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

// 1. LIST events
export const list = async () => {
    try {
        let response = await fetch(`${apiURL}/api/events/`, {
            method: "GET",
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            console.error('List events error:', response.status);
            return { success: false, message: `Server Error: ${response.status}`, data: [] };
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message, data: [] };
    }
};

// 2. CREATE event
export const create = async (event) => {
    try {
        console.log("API: Creating event with data:", event);
        console.log("API: Request body:", JSON.stringify(event));

        let response = await fetch(`${apiURL}/api/events/`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(event)
        });

        console.log("API: Response status:", response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Create event error:', response.status, errorData);
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

// 3. READ single event
export const read = async (id) => {
    try {
        let response = await fetch(`${apiURL}/api/events/${id}`, {
            method: "GET",
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            console.error('Read event error:', response.status);
            return { success: false, message: `Server Error: ${response.status}` };
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
};

// 4. UPDATE event
export const update = async (event, id) => {
    try {
        let response = await fetch(`${apiURL}/api/events/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(event)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Update event error:', response.status, errorData);
            return { success: false, message: errorData.message || `Server Error: ${response.status}` };
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
};

// 5. REMOVE/DELETE event
export const remove = async (id) => {
    try {
        let response = await fetch(`${apiURL}/api/events/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Delete event error:', response.status, errorData);
            return { success: false, message: errorData.message || `Server Error: ${response.status}` };
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
};

// Legacy exports for backwards compatibility
export const listEvents = list;
export const createEvent = create;
export const readEvent = read;
export const updateEvent = update;
export const removeEvent = remove;