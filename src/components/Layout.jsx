import { Link, useLocation } from 'react-router-dom';
import image_logo from "../assets/logo.png"
import { isAuthenticated, getUsername, clearJWT } from './auth/auth-helper';

function Layout() {

    const location = useLocation();

    const signoutClick = () => {
        clearJWT();
    }

    return (
        <>
            <h1>LeadGlobe Ticket Management</h1>
            <nav className="navbar">
                <img src={image_logo} alt="Logo" className='logo' />
                <Link to="/">
                    <i className="fas fa-home"></i> Home
                </Link>
                {isAuthenticated() &&
                <Link to="/ticket/list">
                    <i className="fa-regular fa-rectangle-list"></i>Ticket List
                </Link>}
                {!isAuthenticated() &&
                    <Link to="/users/signin">
                        <i className="fa-solid fa-right-to-bracket"></i> Register/Login
                    </Link>}
                {isAuthenticated() &&
                    <Link to="/" onClick={signoutClick}>
                        <i className="fa-solid fa-right-from-bracket"></i> Sign-out ({getUsername()})
                    </Link>}
            </nav>
            <br />
            <hr />
        </>
    );
}

export default Layout;