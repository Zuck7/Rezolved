import { Link, useLocation } from 'react-router-dom';
import image_logo from "../assets/image_logo.png"
import { isAuthenticated, getUsername, clearJWT } from './auth/auth-helper';

function Layout() {

    const location = useLocation();

    const signoutClick = () => {
        clearJWT();
    }

    return (
        <>
            <h1>My Portfolio</h1>
            <nav className="navbar">
                <img src={image_logo} alt="Logo" className='logo' />
                <Link to="/">
                    <i className="fas fa-home"></i> Home
                </Link>
                <Link to="/about">
                    <i className="fa-solid fa-address-card"></i> About
                </Link>
                <Link to="/projects">
                    <i className="fas fa-project-diagram"></i> Projects
                </Link>
                <Link to="/services">Services</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/inventory/list">
                    <i className="fa-regular fa-rectangle-list"></i>Inventory List
                </Link>
                {!isAuthenticated() &&
                    <Link to="/users/signin">
                        <i className="fa-solid fa-right-to-bracket"></i> Signin
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