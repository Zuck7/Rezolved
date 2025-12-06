import { Link, useLocation } from 'react-router-dom';
import image_logo from "../assets/logo.png"
import { isAuthenticated, getEmail, getUserInfo, clearJWT } from './auth/auth-helper';

function Layout() {

    const location = useLocation();

    const signoutClick = () => {
        clearJWT();
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img src={image_logo} alt="Logo" className='logo me-2' height="40" />
                        <span>Help Desk System</span>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    <i className="fas fa-home"></i> Home
                                </Link>
                            </li>
                            {isAuthenticated() && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/tickets">
                                        <i className="fas fa-ticket-alt"></i> Dashboard
                                    </Link>
                                </li>
                            )}
                            {isAuthenticated() && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/tickets/add">
                                        <i className="fas fa-plus"></i> New Ticket
                                    </Link>
                                </li>
                            )}
                        </ul>

                        <ul className="navbar-nav">
                            {!isAuthenticated() ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/users/signin">
                                            <i className="fas fa-sign-in-alt"></i> Sign In
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/users/signup">
                                            <i className="fas fa-user-plus"></i> Register
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                        <i className="fas fa-user"></i> {getUserInfo()?.firstName ? `${getUserInfo().firstName} ${getUserInfo().lastName}` : getEmail()}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/tickets"><i className="fas fa-ticket-alt"></i> My Tickets</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className="dropdown-item" to="/" onClick={signoutClick}><i className="fas fa-sign-out-alt"></i> Sign Out</Link></li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Layout;