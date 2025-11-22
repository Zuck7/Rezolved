import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { create } from "../../datasource/api-user.js";
import UserModel from "../../datasource/userModel.js";
import { auth } from "../../firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Signup = () => {
    let navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState('')
    const [user, setUser] = useState(new UserModel());

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(formData => ({ ...formData, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (user.password !== document.getElementById('confirmPasswordTextField').value) {
            setErrorMsg("ERROR: Passwords don't match. Please try again.");
        } else {
            // Create the user with Firebase Authentication
            const userCredentials = await createUserWithEmailAndPassword(auth, user.email, user.password);
            const userFB = userCredentials.user;
            console.log(userFB);

            const result = await updateProfile(userFB, {
                displayName: user.firstName+' '+ user.lastName
            });
            console.log(result);

            const submitUser = user;
            submitUser.uid = userFB.uid;
            submitUser.displayName = user.firstName+' '+ user.lastName;
            
            create(submitUser)
                .then(data => {
                    if (data && data.success) {
                        alert(data.message);
                        navigate('/users/signin');
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
                    <h1>Add a new user</h1>
                    <p className="flash"><span>{errorMsg}</span></p>
                    <form onSubmit={handleSubmit} className="form card p-3">
                        <div className="form-group">
                            <label htmlFor="firstNameTextField">First Name</label>
                            <input type="text" className="form-control"
                                id="firstNameTextField"
                                placeholder="Enter first name"
                                name="firstName"
                                value={user.firstName || ''}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="lastNameTextField">Last Name</label>
                            <input type="text" className="form-control"
                                id="lastNameTextField"
                                placeholder="Enter last name"
                                name="lastName"
                                value={user.lastName || ''}
                                onChange={handleChange}>
                            </input>
                        </div>
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
                        &nbsp;
                        <button className="btn btn-primary" type="submit">
                            <i className="fas fa-edit"></i>
                            Submit
                        </button>
                        &nbsp; &nbsp;
                        <Link href="#" to="/users/signin" className="btn btn-warning">
                            <i className="fas fa-undo"></i>
                            Cancel
                        </Link>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default Signup;