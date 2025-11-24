import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { create, signin } from "../../datasource/api-user.js";
import UserModel from "../../datasource/userModel.js";
import { authenticate } from "./auth-helper.js";

const Signup = () => {
    let navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState('')
    const [user, setUser] = useState(new UserModel());

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(formData => ({ ...formData, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (user.password !== document.getElementById('confirmPasswordTextField').value) {
            setErrorMsg("ERROR: Passwords don't match. Please try again.");
        } else {
            create(user)
                .then(data => {
                    if (data && data.success) {
                        signin({ email: user.email, password: user.password })
                            .then(loginData => {
                                if (loginData && loginData.success) {
                                    authenticate(loginData.token, () => {
                                        navigate('/tickets');
                                    });
                                } else {
                                    setErrorMsg(loginData?.message || 'Unable to sign in after registration.');
                                }
                            })
                            .catch(loginErr => {
                                setErrorMsg(loginErr.message);
                                console.log(loginErr);
                            });
                    } else {
                        setErrorMsg(data.message);
                    }
                })
                .catch(err => {
                    setErrorMsg(err.message);
                    console.log(err);
                });
        }

    }

    return (
        <div className="container" style={{ paddingTop: 10 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Register to LeadGlobe</h1>
                    <p className="flash"><span>{errorMsg}</span></p>
                    <form onSubmit={handleSubmit} className="form card p-3">
                        <div className="form-group">
                            <label htmlFor="usernameTextField">Username</label>
                            <input type="text" className="form-control"
                                id="usernameTextField"
                                placeholder="Enter username"
                                name="username"
                                value={user.username || ''}
                                onChange={handleChange}>
                            </input>
                        </div>
                        <br />
                        <br />
                        <div className="form-group">
                            <label htmlFor="emailTextField">Email</label>
                            <input type="text" className="form-control"
                                id="emailTextField"
                                placeholder="Enter a email"
                                name="email"
                                value={user.email || ''}
                                onChange={handleChange}>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="passwordTextField">Password</label>
                            <input type="password" className="form-control"
                                id="passwordTextField"
                                placeholder="Enter a password"
                                name="password"
                                value={user.password || ''}
                                onChange={handleChange}>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="confirmPasswordTextField">Confirm Password</label>
                            <input type="password" className="form-control"
                                id="confirmPasswordTextField"
                                placeholder="Confirm password">
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label><input type="radio" name="user_type" value="user" required/> User</label>
                            &nbsp;&nbsp;&nbsp;
                            <label><input type="radio" name="user_type" value="admin" /> Admin</label>
                        </div>
                        &nbsp;
                        <button className="btn btn-primary" type="submit">
                            <i className="fas fa-edit"></i>
                            Register
                        </button>
                        &nbsp; &nbsp;
                        <Link href="#" to="/users/signin" className="btn btn-warning">
                            <i className="fas fa-undo"></i>
                            Return to Sign-In
                        </Link>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default Signup;