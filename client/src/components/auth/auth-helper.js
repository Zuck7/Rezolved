import { jwtDecode } from "jwt-decode";
import UserModel from "../../datasource/userModel";

const authenticate = (token, cb) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem('token', token);

    let decoded = jwtDecode(token);
    sessionStorage.setItem('email', decoded.email)
    sessionStorage.setItem('role', decoded.role || decoded.userType || 'USER')
    sessionStorage.setItem('userInfo', JSON.stringify(decoded));
  }
  cb();
}


const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const token = sessionStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const user = new UserModel(decoded);
    return { user, token };
  } catch (err) {
    console.error('Invalid token:', err);
    clearJWT();
    return false;
  }
}



const getToken = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return sessionStorage.getItem('token');
}

const getEmail = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return sessionStorage.getItem('email');
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
  return role === 'admin' || role === 'ADMIN';
}

const clearJWT = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userInfo');
  }
}

export { authenticate, isAuthenticated, getToken, getEmail, getUserInfo, isAdmin, clearJWT }