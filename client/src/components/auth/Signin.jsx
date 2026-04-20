import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react"
import { signin } from "../../datasource/api-user.js";
import { authenticate } from './auth-helper.js';

const Signin = () => {
    const { state } = useLocation();
    const { from } = state || { from: { pathname: '/' } };
    let navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState('')
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(formData => ({ ...formData, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        signin(user)
            .then(data => {
                if (data && data.success) {
                    authenticate(data.token, () => {
                        navigate(from, { replace: true });
                    })
                } else {
                    setErrorMsg(data.message);
                }
            })
            .catch(err => {
                setErrorMsg(err.message);
                console.log(err);
            });
    }

    return (
        <div className="hd-auth-page">
            <div className="hd-auth-card">
                <h2 className="hd-auth-title">Welcome back</h2>
                <p className="hd-auth-sub">Sign in to your Rezolved account</p>
                {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="emailTextField">Email</label>
                        <input type="text" className="form-control"
                            id="emailTextField"
                            placeholder="Enter your email"
                            name="email"
                            value={user.email || ''}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="passowordTextField">Password</label>
                        <input type="password" className="form-control"
                            id="passowordTextField"
                            placeholder="Enter your password"
                            name="password"
                            value={user.password || ''}
                            onChange={handleChange}
                            required />
                    </div>
                    <button className="btn btn-primary w-100 mt-2" type="submit">
                        <i className="fas fa-sign-in-alt me-2"></i>Sign In
                    </button>
                    <p className="text-center mt-3 mb-0" style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                        Don't have an account?{' '}
                        <Link to="/users/signup" className="hd-auth-link">Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signin;