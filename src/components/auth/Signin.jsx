import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react"
import { signin } from "../../datasource/api-user.js";
import { authenticate } from './auth-helper.js';
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(data => {
                if (data) {
                    const userFB = data.user;
                    console.log(userFB);
                    authenticate(userFB.accessToken, userFB.displayName, () => {
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

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                authenticate(user.accessToken, user.displayName, () => {
                    navigate(from, { replace: true });
                });
            })
            .catch((error) => {
                setErrorMsg(error.message);
                console.log(error);
            });
    };

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
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="btn btn-danger"
                        >
                            <i className="fab fa-google"></i> Sign in with Google
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