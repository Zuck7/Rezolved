import { jwtDecode } from "jwt-decode";

const authenticate = (token, cb) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem('token', token);

    let decoded = jwtDecode(token);
    sessionStorage.setItem('username', decoded.username)
    sessionStorage.setItem('role', decoded.role || 'user')
  }
  cb();
}

const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return !!sessionStorage.getItem('token');
}

const getToken = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return sessionStorage.getItem('token');
}

const getUsername = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return sessionStorage.getItem('username');
}

const getUserInfo = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const token = sessionStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
}

const isAdmin = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const role = sessionStorage.getItem('role');
  return role === 'admin';
}

const clearJWT = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
  }
}

export { authenticate, isAuthenticated, getToken, getUsername, getUserInfo, isAdmin, clearJWT }