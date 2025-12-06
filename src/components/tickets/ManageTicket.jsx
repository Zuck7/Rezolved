import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { read, updateStatus } from '../../datasource/api-tickets';
import { isAuthenticated } from '../auth/auth-helper';
import { TicketIteration } from '../../datasource/TicketModel';

const ManageTicket = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [comment, setComment] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [resolution, setResolution] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const auth = isAuthenticated();
        if (auth) {
            setCurrentUser(auth.user);
            if (!auth.user?.isAdmin?.()) {
                setError('Access denied. Admin privileges required.');
                return;
            }
        }
        loadTicket();
    }, [id]);

    const loadTicket = () => {
        read(id)
            .then(data => {
                if (data && data.success) {
                    setTicket(data.ticket);
                    setNewStatus(data.ticket.status || 'NEW');
                    setResolution(data.ticket.resolution || '');
                } else {
                    setError(data?.message || 'Failed to load ticket');
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    const handleStatusUpdate = async (e) => {
        e.preventDefault();

        if (!comment.trim() && newStatus !== ticket.status) {
            setError('Please add a comment when changing ticket status');
            return;
        }

        if (newStatus === 'CLOSED' && !resolution.trim()) {
            setError('Resolution is required before closing a ticket');
            return;
        }

        setSubmitting(true);
        setError('');

        const iteration = new TicketIteration({
            userEmail: currentUser?.email,
            comment: comment.trim(),
            statusChange: newStatus !== ticket.status ? {
                from: ticket.status,
                to: newStatus
            } : null,
            fieldChanges: resolution !== ticket.resolution ? {
                resolution: { from: ticket.resolution, to: resolution }
            } : {}
        });

        const updateData = {
            status: newStatus,
            resolution: resolution,
            iterations: [...(ticket.iterations || []), iteration],
            updatedAt: new Date(),
            assignedTo: currentUser?.email
        };

        if (newStatus === 'CLOSED') {
            updateData.closedAt = new Date();
        }

        try {
            const statusData = {
                status: newStatus,
                comment: comment.trim(),
                userEmail: currentUser?.email,
                resolution: resolution
            };
            const response = await updateStatus(id, statusData);
            if (response && response.success) {
                alert('Ticket updated successfully');
                loadTicket();
                setComment('');
            } else {
                setError(response?.message || 'Failed to update ticket');
            }
        } catch (err) {
            setError(err.message);
        }

        setSubmitting(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            'NEW': 'primary',
            'IN_PROGRESS': 'warning',
            'DISPATCHED': 'info',
            'CLOSED': 'success',
            'CANCELLED': 'secondary'
        };
        return `badge bg-${statusColors[status] || 'secondary'}`;
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading ticket details...</p>
                </div>
            </div>
        );
    }

    if (error && !ticket) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/tickets')}>
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const canModify = ticket?.status !== 'CLOSED' && ticket?.status !== 'CANCELLED';

    return (
        <div className="container mt-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>Manage Ticket: {ticket?.ticketNumber || `TKT-${ticket?._id?.slice(-6)}`}</h2>
                    <p className="text-muted">Admin ticket management interface</p>
                </div>
                <button className="btn btn-outline-secondary" onClick={() => navigate('/tickets')}>
                    <i className="fas fa-arrow-left"></i> Back to Dashboard
                </button>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className="row">
                {/* Ticket Information */}
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Ticket Information</h5>
                            <span className={getStatusBadge(ticket?.status)}>{ticket?.status || 'NEW'}</span>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Customer:</strong> {ticket?.customerName}</p>
                                    <p><strong>Email:</strong> {ticket?.customerEmail}</p>
                                    <p><strong>Priority:</strong>
                                        <span className={`badge bg-${
                                            ticket?.priority === 'CRITICAL' ? 'danger' :
                                            ticket?.priority === 'HIGH' ? 'warning' :
                                            ticket?.priority === 'MEDIUM' ? 'info' : 'secondary'
                                        } ms-2`}>
                                            {ticket?.priority || 'LOW'}
                                        </span>
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Created:</strong> {formatDate(ticket?.createdAt)}</p>
                                    <p><strong>Last Updated:</strong> {formatDate(ticket?.updatedAt)}</p>
                                    <p><strong>Assigned To:</strong> {ticket?.assignedTo || 'Unassigned'}</p>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <h6>Description:</h6>
                                <p className="bg-light p-3 rounded">{ticket?.description}</p>
                            </div>
                            {ticket?.resolution && (
                                <div>
                                    <h6>Resolution:</h6>
                                    <p className="bg-success bg-opacity-10 p-3 rounded border border-success">
                                        {ticket.resolution}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ticket History */}
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Ticket History & Audit Trail</h5>
                        </div>
                        <div className="card-body">
                            {ticket?.iterations && ticket.iterations.length > 0 ? (
                                <div className="timeline">
                                    {ticket.iterations.map((iteration, index) => (
                                        <div key={index} className="timeline-item mb-3 border-start border-3 border-primary ps-3">
                                            <div className="d-flex justify-content-between">
                                                <strong>{iteration.userEmail}</strong>
                                                <small className="text-muted">{formatDate(iteration.timestamp)}</small>
                                            </div>
                                            {iteration.statusChange && (
                                                <div className="mt-1">
                                                    <span className="badge bg-info me-2">Status Changed</span>
                                                    <span className={getStatusBadge(iteration.statusChange.from)}>{iteration.statusChange.from}</span>
                                                    <i className="fas fa-arrow-right mx-2"></i>
                                                    <span className={getStatusBadge(iteration.statusChange.to)}>{iteration.statusChange.to}</span>
                                                </div>
                                            )}
                                            {iteration.comment && (
                                                <p className="mt-2 mb-0 bg-light p-2 rounded">{iteration.comment}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted">No history available for this ticket.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Panel */}
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Update Ticket</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleStatusUpdate}>
                                <div className="form-group mb-3">
                                    <label htmlFor="statusSelect">Status</label>
                                    <select
                                        id="statusSelect"
                                        className="form-control"
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        disabled={!canModify}
                                    >
                                        <option value="NEW">New</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="DISPATCHED">Dispatched</option>
                                        <option value="CLOSED">Closed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </div>

                                {(newStatus === 'CLOSED' || ticket?.status === 'CLOSED') && (
                                    <div className="form-group mb-3">
                                        <label htmlFor="resolutionTextArea">Resolution *</label>
                                        <textarea
                                            id="resolutionTextArea"
                                            className="form-control"
                                            value={resolution}
                                            onChange={(e) => setResolution(e.target.value)}
                                            placeholder="Describe how the issue was resolved..."
                                            rows="3"
                                            disabled={ticket?.status === 'CLOSED'}
                                            required={newStatus === 'CLOSED'}
                                        />
                                    </div>
                                )}

                                <div className="form-group mb-3">
                                    <label htmlFor="commentTextArea">Comment *</label>
                                    <textarea
                                        id="commentTextArea"
                                        className="form-control"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Add a comment about this update..."
                                        rows="3"
                                        disabled={!canModify}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={!canModify || submitting}
                                >
                                    {submitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-save"></i> Update Ticket
                                        </>
                                    )}
                                </button>

                                {!canModify && (
                                    <div className="alert alert-warning mt-3">
                                        <i className="fas fa-lock"></i> This ticket is {ticket?.status?.toLowerCase()} and cannot be modified.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card mt-3">
                        <div className="card-header">
                            <h6 className="mb-0">Quick Actions</h6>
                        </div>
                        <div className="card-body">
                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-outline-warning btn-sm"
                                    onClick={() => {
                                        setNewStatus('IN_PROGRESS');
                                        setComment('Ticket has been assigned and work is in progress.');
                                    }}
                                    disabled={!canModify}
                                >
                                    <i className="fas fa-play"></i> Start Working
                                </button>
                                <button
                                    className="btn btn-outline-info btn-sm"
                                    onClick={() => {
                                        setNewStatus('DISPATCHED');
                                        setComment('Ticket has been dispatched to the appropriate team.');
                                    }}
                                    disabled={!canModify}
                                >
                                    <i className="fas fa-paper-plane"></i> Dispatch
                                </button>
                                <button
                                    className="btn btn-outline-success btn-sm"
                                    onClick={() => {
                                        setNewStatus('CLOSED');
                                        setComment('Issue has been resolved and ticket is being closed.');
                                    }}
                                    disabled={!canModify}
                                >
                                    <i className="fas fa-check"></i> Close Ticket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageTicket;