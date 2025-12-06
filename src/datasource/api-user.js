let apiURL = import.meta.env.VITE_APP_APIURL

// api-user.js

const signin = async (user) => {
    try {
        // FIX: Changed '/auth/signin' to '/api/auth/signin'
        let response = await fetch(apiURL + '/api/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        
        // FIX: Check for success before parsing JSON to prevent crashes
        if (!response.ok) {
            return { success: false, message: `Server Error: ${response.status}` };
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

export { signin, create }