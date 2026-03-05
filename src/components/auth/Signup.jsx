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
        <div className="hd-auth-page" style={{ alignItems: 'flex-start', paddingTop: '3rem' }}>
            <div className="hd-auth-card" style={{ maxWidth: 560 }}>
                <h2 className="hd-auth-title">Create an account</h2>
                <p className="hd-auth-sub">Register to access Rezolved</p>
                {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-3">
                        <div className="col-md-6 form-group">
                            <label htmlFor="firstNameTextField">First Name</label>
                            <input type="text" className="form-control"
                                id="firstNameTextField"
                                placeholder="First name"
                                name="firstName"
                                value={user.firstName || ''}
                                onChange={handleChange} />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor="lastNameTextField">Last Name</label>
                            <input type="text" className="form-control"
                                id="lastNameTextField"
                                placeholder="Last name"
                                name="lastName"
                                value={user.lastName || ''}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="emailTextField">Email</label>
                        <input type="text" className="form-control"
                            id="emailTextField"
                            placeholder="Enter your email"
                            name="email"
                            value={user.email || ''}
                            onChange={handleChange} />
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-md-6 form-group">
                            <label htmlFor="passwordTextField">Password</label>
                            <input type="password" className="form-control"
                                id="passwordTextField"
                                placeholder="Password"
                                name="password"
                                value={user.password || ''}
                                onChange={handleChange} />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor="confirmPasswordTextField">Confirm Password</label>
                            <input type="password" className="form-control"
                                id="confirmPasswordTextField"
                                placeholder="Confirm password" />
                        </div>
                    </div>
                    {/* Conditional fields based on user type */}
                    {selectedUserType === 'USER' ? (
                        <div className="form-group mb-3">
                            <label htmlFor="studentIdTextField">Student ID *</label>
                            <input type="text" className="form-control"
                                id="studentIdTextField"
                                placeholder="Enter your student ID"
                                name="studentId"
                                value={user.studentId || ''}
                                onChange={handleChange}
                                required />
                        </div>
                    ) : (
                        <div className="form-group mb-3">
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
                    <div className="form-group mb-3">
                        <label>I am registering as:</label>
                        <div className="row g-2 mt-1">
                            <div className="col-6">
                                <div className="card text-center" style={{ cursor: 'pointer', border: selectedUserType === 'USER' ? '2px solid #1a56db' : '1px solid #e5e7eb', borderRadius: 10 }}
                                    onClick={() => { setSelectedUserType('USER'); setUser(prev => ({...prev, userType: 'USER'})); }}>
                                    <div className="card-body py-3">
                                        <i className="fas fa-user-graduate fa-2x mb-2 text-primary d-block"></i>
                                        <strong style={{ fontSize: '0.88rem' }}>Student</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card text-center" style={{ cursor: 'pointer', border: selectedUserType === 'ADMIN' ? '2px solid #1a56db' : '1px solid #e5e7eb', borderRadius: 10 }}
                                    onClick={() => { setSelectedUserType('ADMIN'); setUser(prev => ({...prev, userType: 'ADMIN'})); }}>
                                    <div className="card-body py-3">
                                        <i className="fas fa-user-tie fa-2x mb-2 text-success d-block"></i>
                                        <strong style={{ fontSize: '0.88rem' }}>Staff / Admin</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary w-100 mt-2" type="submit">
                        <i className="fas fa-user-plus me-2"></i>Create Account
                    </button>
                    <p className="text-center mt-3 mb-0" style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                        Already have an account?{' '}
                        <Link to="/users/signin" className="hd-auth-link">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;