let apiURL = import.meta.env.VITE_APP_APIURL

// api-user.js

const parseJsonSafe = async (response) => {
    try {
        return await response.json();
    } catch (err) {
        return null;
    }
}

const signin = async (user) => {
    try {
        let response = await fetch(apiURL + '/api/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if (!response.ok) {
            const errorData = await parseJsonSafe(response);
            return {
                success: false,
                message: errorData?.message || `Server Error: ${response.status}`
            };
        }

        return await response.json()
    } catch (err) {
        console.log(err)
        return { success: false, message: "Network error" }
    }
}

// ... keep create function ...

const create = async (user) => {
    try {
        let response = await fetch(apiURL + '/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        
        // Check if response is successful (status 200-299)
        if (response.ok) {
            const data = await response.json()
            return { success: true, ...data }
        } else {
            const errorData = await response.json().catch(() => ({}))
            return { success: false, message: errorData.message || `Server Error: ${response.status}` }
        }
    } catch (err) {
        console.log(err)
        return { success: false, message: err.message || 'Network error' }
    }
}

const signout = async (token) => {
    try {
        await fetch(apiURL + '/api/auth/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
    } catch (err) {
        console.log('Signout API error:', err)
    }
}

export { signin, create, signout }