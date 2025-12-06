import React from "react";
import { useNavigate } from 'react-router-dom';

const TicketForm = ({ ticket = {}, handleChange, handleSubmit, disabled = false, currentUser = null }) => {
    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit} className="form card p-3">
            <input type="hidden" name="id" value={ticket.id || ""} />

            {/* Ticket Information */}
            <div className="card mb-3">
                <div className="card-header">
                    <h5 className="mb-0">Customer Information</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="customerNameTextField">Customer Name *</label>
                                <input
                                    id="customerNameTextField"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter customer name"
                                    value={ticket.name || ""}
                                    onChange={handleChange}
                                    disabled={Boolean(disabled)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="customerEmailTextField">Customer Email *</label>
                                <input
                                    id="customerEmailTextField"
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter customer email"
                                    value={ticket.email || ""}
                                    onChange={handleChange}
                                    disabled={Boolean(disabled)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Issue Details */}
            <div className="card mb-3">
                <div className="card-header">
                    <h5 className="mb-0">Issue Details</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="prioritySelect">Priority *</label>
                                <select
                                    id="prioritySelect"
                                    name="priority"
                                    className="form-control"
                                    value={ticket.priority || ""}
                                    onChange={handleChange}
                                    disabled={!!disabled}
                                    required
                                >
                                    <option value="">Select Priority Level</option>
                                    <option value="LOW">🟢 Low - General inquiry or minor issue</option>
                                    <option value="MEDIUM">🟡 Medium - Issue affects some functionality</option>
                                    <option value="HIGH">🟠 High - Issue significantly impacts work</option>
                                    <option value="CRITICAL">🔴 Critical - System down or blocking</option>
                                </select>
                                <small className="form-text text-muted">
                                    Choose the priority level that best describes the urgency of your issue.
                                </small>
                            </div>
                        </div>
                        <div className="col-md-6">
                            {ticket.ticketNumber && (
                                <div className="form-group">
                                    <label>Ticket Number</label>
                                    <input
                                        className="form-control"
                                        value={ticket.ticketNumber}
                                        disabled={true}
                                        readOnly
                                        style={{ backgroundColor: '#f8f9fa' }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="descriptionTextArea">Issue Description *</label>
                                <textarea
                                    id="descriptionTextArea"
                                    name="desc"
                                    className="form-control"
                                    placeholder="Please describe your issue in detail. Include:
• What you were trying to do
• What happened instead
• Any error messages you saw
• Steps to reproduce the issue"
                                    value={ticket.desc || ""}
                                    onChange={handleChange}
                                    disabled={!!(disabled && ticket.status === 'CLOSED')}
                                    rows="6"
                                    required
                                />
                                <small className="form-text text-muted">
                                    Provide as much detail as possible to help us resolve your issue quickly.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => navigate('/tickets')}
                >
                    <i className="fas fa-arrow-left"></i> Back to Dashboard
                </button>
                <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                    disabled={!!disabled}
                >
                    <i className="fas fa-paper-plane"></i> Submit Ticket
                </button>
            </div>
        </form>
    );
};

export default TicketForm;