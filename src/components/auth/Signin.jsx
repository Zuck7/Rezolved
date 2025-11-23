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
        <div className="container" style={{ paddingTop: 10 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Signin</h1>
                    <p className="flash"><span>{errorMsg}</span></p>
                    <form onSubmit={handleSubmit} className="form card p-3">
                        <div className="form-group">
                            <label htmlFor="emailTextField">Email</label>
                            <input type="text" className="form-control"
                                id="emailTextField"
                                placeholder="Enter your email"
                                name="email"
                                value={user.email || ''}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="passowordTextField">Password</label>
                            <input type="password" className="form-control"
                                id="passowordTextField"
                                placeholder=""
                                name="password"
                                value={user.password || ''}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <br />
                        &nbsp;
                        <button className="btn btn-primary" type="submit">
                            <i className="fas fa-edit"></i>
                            Submit
                        </button>
                        &nbsp;
                        <Link to="/users/signup" style={{ textDecoration: 'none' }}>
                            <i className="fas fa-user-plus"></i> Sign-up
                        </Link>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default Signin;