import { Link, useLocation, useNavigate } from 'react-router-dom';
import image_logo from "../assets/logo.png"
import { isAuthenticated, getUsername, clearJWT } from './auth/auth-helper';

function Layout() {

    const location = useLocation();
    const navigate = useNavigate();

    const signoutClick = () => {
        clearJWT();
        navigate('/');
    }

    return (
        <>
            <nav className="navbar">
                <img src={image_logo} alt="Logo" className='logo' />
                <Link to="/">
                    <i className="fas fa-home"></i> Home
                </Link>
                {isAuthenticated() && (
                    <>
                        <Link to="/tickets">
                            Tickets
                        </Link>
                        <Link to="/tickets/new">
                            New Ticket
                        </Link>
                        <Link to="/events">
                            Events
                        </Link>
                        <Link to="/events/new">
                            New Event
                        </Link>
                    </>
                )}
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