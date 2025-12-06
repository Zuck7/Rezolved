import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { create } from "../../datasource/api-user.js";
import UserModel from "../../datasource/userModel.js";

const Signup = () => {
    let navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState('')
    const [user, setUser] = useState(new UserModel());
    const [selectedUserType, setSelectedUserType] = useState('USER');

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'userType') {
            setSelectedUserType(value);
        }
        setUser(formData => ({ ...formData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (user.password !== document.getElementById('confirmPasswordTextField').value) {
            setErrorMsg("ERROR: Passwords don't match. Please try again.");
        } else {
            let userPayload = {
                email: user.email,
                password: user.password,
                userType: user.userType || 'USER',
                firstName: user.firstName || '',
                lastName: user.lastName || ''
            };

            // Add different fields based on user type
            if (user.userType === 'USER') {
                userPayload.studentId = user.studentId || '';
            } else if (user.userType === 'ADMIN') {
                userPayload.department = user.department || '';
            }

            create(userPayload)
                .then(data => {
                    console.log('API Response:', data); // Debug log
                    if (data && data.success) {
                        // Show success notification
                        alert('User created successfully!');
                        // Redirect to signin page
                        navigate('/users/signin');
                    } else {
                        setErrorMsg(data?.message || 'Failed to create user');
                    }
                })
                .catch(err => {
                    setErrorMsg(err.message);
                    console.log('Error:', err);
                });
        }

    }

    return (
        <div className="container" style={{ paddingTop: 10 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Register to Help Desk System</h1>
                    <p className="flash"><span>{errorMsg}</span></p>
                    <form onSubmit={handleSubmit} className="form card p-3">
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
                            <label htmlFor="firstNameTextField">First Name</label>
                            <input type="text" className="form-control"
                                id="firstNameTextField"
                                placeholder="Enter first name"
                                name="firstName"
                                value={user.firstName || ''}
                                onChange={handleChange}>
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
                        {/* Conditional fields based on user type */}
                        {selectedUserType === 'USER' ? (
                            <div className="form-group">
                                <label htmlFor="studentIdTextField">Student ID *</label>
                                <input type="text" className="form-control"
                                    id="studentIdTextField"
                                    placeholder="Enter your student ID"
                                    name="studentId"
                                    value={user.studentId || ''}
                                    onChange={handleChange}
                                    required>
                                </input>
                            </div>
                        ) : (
                            <div className="form-group">
                                <label htmlFor="departmentTextField">Department *</label>
                                <select className="form-control"
                                    id="departmentTextField"
                                    name="department"
                                    value={user.department || ''}
                                    onChange={handleChange}
                                    required>
                                    <option value="">Select Department</option>
                                    <option value="IT">Information Technology</option>
                                    <option value="HR">Human Resources</option>
                                    <option value="ADMIN">Administration</option>
                                    <option value="ACADEMICS">Academic Affairs</option>
                                    <option value="FACILITIES">Facilities Management</option>
                                    <option value="FINANCE">Finance</option>
                                    <option value="LIBRARY">Library Services</option>
                                    <option value="STUDENT_SERVICES">Student Services</option>
                                </select>
                            </div>
                        )}
                        <br />
                        <div className="form-group">
                            <label>I am registering as:</label><br />
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <div className="card" style={{ cursor: 'pointer', border: selectedUserType === 'USER' ? '2px solid #007bff' : '1px solid #dee2e6' }}>
                                        <div className="card-body text-center" onClick={() => { setSelectedUserType('USER'); setUser(prev => ({...prev, userType: 'USER'})); }}>
                                            <input type="radio" name="userType" value="USER" onChange={handleChange} checked={selectedUserType === 'USER'} required />
                                            <i className="fas fa-user-graduate fa-2x d-block mt-2 mb-2 text-primary"></i>
                                            <h5>Student</h5>
                                            <p className="small text-muted">Submit tickets for academic and technical support</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card" style={{ cursor: 'pointer', border: selectedUserType === 'ADMIN' ? '2px solid #007bff' : '1px solid #dee2e6' }}>
                                        <div className="card-body text-center" onClick={() => { setSelectedUserType('ADMIN'); setUser(prev => ({...prev, userType: 'ADMIN'})); }}>
                                            <input type="radio" name="userType" value="ADMIN" onChange={handleChange} checked={selectedUserType === 'ADMIN'} />
                                            <i className="fas fa-user-tie fa-2x d-block mt-2 mb-2 text-success"></i>
                                            <h5>Staff/Admin</h5>
                                            <p className="small text-muted">Manage tickets and provide support</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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