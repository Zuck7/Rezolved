import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from './auth/auth-helper';

function Home(){
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = isAuthenticated();
        if (auth) {
            setCurrentUser(auth.user);
            setIsLoggedIn(true);
        }
    }, []);

    return(
        <div className="container mt-5">
            {/* Hero Section */}
            <div className="jumbotron bg-primary bg-gradient text-white p-5 rounded mb-5">
                <div className="row">
                    <div className="col-md-8">
                        <h1 className="display-4">Help Desk System</h1>
                        <p className="lead">
                            College IT Support & Issue Management Platform
                        </p>
                        <p>
                            Submit tickets for computer issues, software problems, network connectivity,
                            and other technical support needs. Our team is here to help!
                        </p>
                        {!isLoggedIn ? (
                            <div className="mt-4">
                                <Link to="/users/signin" className="btn btn-light btn-lg me-3">
                                    <i className="fas fa-sign-in-alt"></i> Sign In
                                </Link>
                                <Link to="/users/signup" className="btn btn-outline-light btn-lg">
                                    <i className="fas fa-user-plus"></i> Register
                                </Link>
                            </div>
                        ) : (
                            <div className="mt-4">
                                <Link to="/tickets" className="btn btn-light btn-lg me-3">
                                    <i className="fas fa-ticket-alt"></i> My Tickets
                                </Link>
                                <Link to="/tickets/add" className="btn btn-outline-light btn-lg">
                                    <i className="fas fa-plus"></i> Submit New Ticket
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 text-center">
                        <i className="fas fa-headset fa-5x mb-3"></i>
                        <h3>24/7 Support</h3>
                        <p>We're here to help with all your technical needs</p>
                    </div>
                </div>
            </div>

            {isLoggedIn && currentUser ? (
                // Dashboard for logged-in users
                <div>
                    <div className="row mb-4">
                        <div className="col-12">
                            <h2>Welcome back, {currentUser.getFullName?.() || currentUser.displayName || currentUser.username}!</h2>
                            <div className="row">
                                <div className="col-md-8">
                                    <p className="text-muted mb-1">
                                        {currentUser.isAdmin?.() ?
                                            "Admin Dashboard - Manage and track all support tickets" :
                                            "Student Portal - View your tickets and submit new requests"
                                        }
                                    </p>
                                    {currentUser.userType === 'USER' && currentUser.studentId && (
                                        <p className="text-muted small">
                                            <i className="fas fa-id-card"></i> Student ID: {currentUser.studentId}
                                        </p>
                                    )}
                                    {currentUser.userType === 'ADMIN' && (
                                        <p className="text-muted small">
                                            <i className="fas fa-building"></i> {currentUser.department} Department
                                            {currentUser.position && ` • ${currentUser.position}`}
                                            {currentUser.employeeId && ` • ID: ${currentUser.employeeId}`}
                                        </p>
                                    )}
                                </div>
                                <div className="col-md-4 text-end">
                                    <span className={`badge ${currentUser.isAdmin?.() ? 'bg-success' : 'bg-primary'} fs-6`}>
                                        <i className={`fas ${currentUser.isAdmin?.() ? 'fa-user-tie' : 'fa-user-graduate'}`}></i>
                                        {currentUser.isAdmin?.() ? ' Staff Member' : ' Student'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="card text-center h-100">
                                <div className="card-body">
                                    <i className="fas fa-ticket-alt fa-3x text-primary mb-3"></i>
                                    <h5 className="card-title">View Tickets</h5>
                                    <p className="card-text">
                                        {currentUser.isAdmin?.() ?
                                            "View and manage all support tickets in the system" :
                                            "Check the status of your submitted tickets"
                                        }
                                    </p>
                                    <Link to="/tickets" className="btn btn-primary">
                                        <i className="fas fa-list"></i> View Tickets
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center h-100">
                                <div className="card-body">
                                    <i className="fas fa-plus-circle fa-3x text-success mb-3"></i>
                                    <h5 className="card-title">Submit Ticket</h5>
                                    <p className="card-text">
                                        Report new issues or request technical assistance from our support team
                                    </p>
                                    <Link to="/tickets/add" className="btn btn-success">
                                        <i className="fas fa-plus"></i> Create Ticket
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center h-100">
                                <div className="card-body">
                                    <i className="fas fa-user fa-3x text-warning mb-3"></i>
                                    <h5 className="card-title">Profile</h5>
                                    <p className="card-text">
                                        Update your profile information and account settings
                                    </p>
                                    <button className="btn btn-warning" disabled>
                                        <i className="fas fa-cog"></i> Settings (Coming Soon)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Public information for non-logged-in users
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card text-center mb-4">
                                <div className="card-body">
                                    <i className="fas fa-laptop fa-3x text-primary mb-3"></i>
                                    <h5 className="card-title">Computer Issues</h5>
                                    <p className="card-text">
                                        Hardware problems, software installation, performance issues
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center mb-4">
                                <div className="card-body">
                                    <i className="fas fa-wifi fa-3x text-info mb-3"></i>
                                    <h5 className="card-title">Network Connectivity</h5>
                                    <p className="card-text">
                                        Wi-Fi issues, internet connection problems, access troubles
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center mb-4">
                                <div className="card-body">
                                    <i className="fas fa-shield-alt fa-3x text-success mb-3"></i>
                                    <h5 className="card-title">Account & Security</h5>
                                    <p className="card-text">
                                        Password resets, account access, security concerns
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <h3>How It Works</h3>
                        <div className="row mt-4">
                            <div className="col-md-3">
                                <div className="step-item">
                                    <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">1</div>
                                    <h5>Register</h5>
                                    <p>Create an account with your college email</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="step-item">
                                    <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">2</div>
                                    <h5>Submit Ticket</h5>
                                    <p>Describe your issue in detail</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="step-item">
                                    <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">3</div>
                                    <h5>Track Progress</h5>
                                    <p>Monitor your ticket status in real-time</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="step-item">
                                    <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">4</div>
                                    <h5>Get Resolved</h5>
                                    <p>Our team will fix your issue promptly</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .step-number {
                    width: 50px;
                    height: 50px;
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                .jumbotron {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }
                .card:hover {
                    transform: translateY(-5px);
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
}

export default Home;