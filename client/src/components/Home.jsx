import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isAuthenticated } from './auth/auth-helper';

function Home(){
    useLocation(); // subscribe to route changes so we re-render after logout navigation
    const auth = isAuthenticated();
    const currentUser = auth ? auth.user : null;
    const isLoggedIn = !!auth;

    return(
        <div className="hd-page">

            {/* Hero */}
            <section className="hd-hero">
                <div className="hd-hero-inner">
                    <div className="hd-hero-badge">IT Support Portal</div>
                    <h1 className="hd-hero-title">Rezolved</h1>
                    <p className="hd-hero-sub">Fast, simple ticket management for college IT support.</p>
                    {!isLoggedIn ? (
                        <div className="hd-hero-actions">
                            <Link to="/users/signin" className="hd-btn hd-btn-primary">
                                <i className="fas fa-sign-in-alt me-2"></i>Sign In
                            </Link>
                            <Link to="/users/signup" className="hd-btn hd-btn-outline">
                                <i className="fas fa-user-plus me-2"></i>Register
                            </Link>
                        </div>
                    ) : (
                        <div className="hd-hero-actions">
                            <Link to="/tickets" className="hd-btn hd-btn-primary">
                                <i className="fas fa-ticket-alt me-2"></i>My Tickets
                            </Link>
                            <Link to="/tickets/add" className="hd-btn hd-btn-outline">
                                <i className="fas fa-plus me-2"></i>New Ticket
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Main Content */}
            <div className="hd-content">

                {isLoggedIn && currentUser ? (
                    <>
                        {/* Welcome */}
                        <div className="hd-welcome">
                            <div>
                                <h2 className="hd-welcome-title">
                                    Welcome back, {currentUser.getFullName?.() || currentUser.email}
                                </h2>
                                <p className="hd-welcome-sub">
                                    {currentUser.isAdmin?.()
                                        ? 'Admin Dashboard — manage and track all support tickets.'
                                        : 'Student Portal — view and manage your support requests.'}
                                    {currentUser.userType === 'USER' && currentUser.studentId && (
                                        <span className="hd-meta"><i className="fas fa-id-card me-1"></i>ID: {currentUser.studentId}</span>
                                    )}
                                    {currentUser.userType === 'ADMIN' && (
                                        <span className="hd-meta"><i className="fas fa-building me-1"></i>{currentUser.department}</span>
                                    )}
                                </p>
                            </div>
                            <span className={`hd-role-badge ${currentUser.isAdmin?.() ? 'hd-role-admin' : 'hd-role-user'}`}>
                                <i className={`fas ${currentUser.isAdmin?.() ? 'fa-user-tie' : 'fa-user-graduate'} me-1`}></i>
                                {currentUser.isAdmin?.() ? 'Staff' : 'Student'}
                            </span>
                        </div>

                        {/* Action Cards */}
                        <div className="hd-cards">
                            <div className="hd-card">
                                <div className="hd-card-icon hd-icon-blue">
                                    <i className="fas fa-list-ul"></i>
                                </div>
                                <h5 className="hd-card-title">View Tickets</h5>
                                <p className="hd-card-text">
                                    {currentUser.isAdmin?.()
                                        ? 'Review and manage all support tickets.'
                                        : 'Track the status of your open requests.'}
                                </p>
                                <Link to="/tickets" className="hd-btn hd-btn-primary hd-btn-sm">Open</Link>
                            </div>

                            <div className="hd-card">
                                <div className="hd-card-icon hd-icon-green">
                                    <i className="fas fa-plus"></i>
                                </div>
                                <h5 className="hd-card-title">Submit Ticket</h5>
                                <p className="hd-card-text">Report a new issue or request technical assistance.</p>
                                <Link to="/tickets/add" className="hd-btn hd-btn-success hd-btn-sm">Create</Link>
                            </div>

                            <div className="hd-card hd-card-disabled">
                                <div className="hd-card-icon hd-icon-gray">
                                    <i className="fas fa-cog"></i>
                                </div>
                                <h5 className="hd-card-title">Settings</h5>
                                <p className="hd-card-text">Manage your profile and account preferences.</p>
                                <span className="hd-badge-soon">Coming Soon</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Feature Overview */}
                        <div className="hd-section-label">What we handle</div>
                        <div className="hd-cards">
                            <div className="hd-card">
                                <div className="hd-card-icon hd-icon-blue">
                                    <i className="fas fa-laptop"></i>
                                </div>
                                <h5 className="hd-card-title">Computer Issues</h5>
                                <p className="hd-card-text">Hardware failures, software installs, and performance problems.</p>
                            </div>
                            <div className="hd-card">
                                <div className="hd-card-icon hd-icon-teal">
                                    <i className="fas fa-wifi"></i>
                                </div>
                                <h5 className="hd-card-title">Network & Connectivity</h5>
                                <p className="hd-card-text">Wi-Fi issues, internet access, and VPN problems.</p>
                            </div>
                            <div className="hd-card">
                                <div className="hd-card-icon hd-icon-green">
                                    <i className="fas fa-shield-alt"></i>
                                </div>
                                <h5 className="hd-card-title">Account & Security</h5>
                                <p className="hd-card-text">Password resets, account access, and security concerns.</p>
                            </div>
                        </div>

                        {/* How it Works */}
                        <div className="hd-section-label" style={{ marginTop: '3rem' }}>How it works</div>
                        <div className="hd-steps">
                            {[['Register', 'Create an account with your college email.', 'fa-user-plus'],
                              ['Submit', 'Describe your issue clearly.', 'fa-paper-plane'],
                              ['Track', 'Monitor your ticket in real-time.', 'fa-chart-line'],
                              ['Resolved', 'Our team fixes your issue promptly.', 'fa-check-circle']
                            ].map(([title, desc, icon], i) => (
                                <div className="hd-step" key={i}>
                                    <div className="hd-step-num">{i + 1}</div>
                                    <i className={`fas ${icon} hd-step-icon`}></i>
                                    <h6 className="hd-step-title">{title}</h6>
                                    <p className="hd-step-desc">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;