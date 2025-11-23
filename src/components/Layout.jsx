import { Link, useLocation } from 'react-router-dom';
import image_logo from "../assets/logo.png"
import { isAuthenticated, getUsername, clearJWT } from './auth/auth-helper';

function Layout() {
    const navigate = useNavigate();
    const jwt = auth.isAuthenticated();
    const user = auth.getUser(); // { id, username }

    const signoutClick = () => {
        auth.clear(() => navigate("/signin"));
    };

    return (
        <>
            <h1>LeadGlobe Help Desk</h1>

            <nav className="navbar">
                <img src={image_logo} alt="Logo" className="logo" />

                {/* PUBLIC LINKS */}
                <Link to="/">
                    <i className="fas fa-home"></i> Home
                </Link>
                {/* <Link to="/about">
                    <i className="fa-solid fa-address-card"></i> About
                </Link>

                <Link to="/projects">
                    <i className="fas fa-project-diagram"></i> Projects
                </Link>

                <Link to="/services">
                    Services
                </Link>

                {/* ONLY SHOW WHEN LOGGED IN */}
                {jwt && (
                    <>
                        {/* TICKETS */}
                        <Link to="/tickets">
                            Tickets
                        </Link>

                        <Link to="/tickets/new">
                            New Ticket
                        </Link>

                        {/* EVENTS */}
                        <Link to="/events">
                            Events
                        </Link>

                        <Link to="/events/new">
                            New Event
                        </Link>
                    </>
                )}

                {/* AUTH LINKS */}
                {!jwt && (
                    <>
                        <Link to="/signin">
                            <i className="fa-solid fa-right-to-bracket"></i> Signin
                        </Link>

                        <Link to="/signup">
                            <i className="fa-solid fa-user-plus"></i> Signup
                        </Link>
                    </>
                )}
                {!isAuthenticated() &&
                    <Link to="/users/signin">
                        <i className="fa-solid fa-right-to-bracket"></i> Register/Login
                    </Link>}
                {isAuthenticated() &&
                    <Link to="/" onClick={signoutClick}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Sign-out ({user?.username})
                    </Link>
                )}
            </nav>

            <br />
            <hr />
        </>
    );
}

export default Layout;
