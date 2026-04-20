import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import image_logo from "../assets/rezolved.png"
import { isAuthenticated, getEmail, getUserInfo, getToken, clearJWT } from './auth/auth-helper';
import { signout } from '../datasource/api-user';

function Layout() {
    const navigate = useNavigate();
    const [authKey, setAuthKey] = useState(0);

    const signoutClick = async () => {
        const token = getToken();
        await signout(token);
        clearJWT();
        setAuthKey(k => k + 1); // force re-render to clear user info from nav
        navigate('/');
    }

    return (
        <nav className="hd-nav">
            <div className="hd-nav-inner">

                {/* Brand */}
                <Link className="hd-nav-brand" to="/">
                    <img src={image_logo} alt="Rezolved" className="hd-nav-logo" />
                </Link>

                <div className="hd-nav-divider"></div>

                {/* Primary links */}
                <ul className="hd-nav-links">
                    <li><Link className="hd-nav-link" to="/">Home</Link></li>
                    {isAuthenticated() && (
                        <li><Link className="hd-nav-link" to="/tickets">Dashboard</Link></li>
                    )}
                    {isAuthenticated() && (
                        <li><Link className="hd-nav-link" to="/tickets/add">New Ticket</Link></li>
                    )}
                </ul>

                {/* Right side */}
                <div className="hd-nav-right">
                    {!isAuthenticated() ? (
                        <>
                            <Link className="hd-nav-link" to="/users/signin">Sign In</Link>
                            <Link className="hd-nav-cta" to="/users/signup">Get Started</Link>
                        </>
                    ) : (
                        <div className="hd-nav-user">
                            <button className="hd-nav-user-btn" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-user-circle me-2"></i>
                                {getUserInfo()?.firstName ? `${getUserInfo().firstName} ${getUserInfo().lastName}` : getEmail()}
                                <i className="fas fa-chevron-down ms-2" style={{ fontSize: '0.7rem' }}></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end hd-dropdown">
                                <li><Link className="dropdown-item" to="/tickets"><i className="fas fa-ticket-alt me-2"></i>My Tickets</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item text-danger" role="button" onClick={signoutClick}><i className="fas fa-sign-out-alt me-2"></i>Sign Out</a></li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Mobile toggler */}
                <button className="hd-nav-toggler" data-bs-toggle="collapse" data-bs-target="#hdNavMobile">
                    <i className="fas fa-bars"></i>
                </button>
            </div>

            {/* Mobile menu */}
            <div className="collapse" id="hdNavMobile">
                <div className="hd-nav-mobile">
                    <Link className="hd-nav-mobile-link" to="/">Home</Link>
                    {isAuthenticated() && <Link className="hd-nav-mobile-link" to="/tickets">Dashboard</Link>}
                    {isAuthenticated() && <Link className="hd-nav-mobile-link" to="/tickets/add">New Ticket</Link>}
                    {!isAuthenticated() ? (
                        <>
                            <Link className="hd-nav-mobile-link" to="/users/signin">Sign In</Link>
                            <Link className="hd-nav-mobile-link hd-nav-mobile-cta" to="/users/signup">Get Started</Link>
                        </>
                    ) : (
                        <a className="hd-nav-mobile-link text-danger" role="button" onClick={signoutClick}>Sign Out</a>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Layout;