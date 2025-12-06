import { remove, deleteTicket, restoreTicket } from "../../datasource/api-tickets";
import { Link } from "react-router-dom";
import { isAdmin } from "../auth/auth-helper";

const ListTicketItem = ({ ticket, onRemoved, currentUser }) => {

    const handleRemove = (id) => {
        if (window.confirm('Are you sure you want to cancel this ticket?')) {
            remove(id)
                .then(data => {
                    if (data && data.success) {
                        alert('Ticket cancelled successfully');
                        if (typeof onRemoved === 'function') onRemoved(id);
                    } else {
                        alert(data?.message || 'Failed to cancel ticket');
                    }
                })
                .catch(err => {
                    alert(err.message);
                    console.log(err);
                });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to permanently delete this ticket? This action cannot be undone!')) {
            deleteTicket(id)
                .then(data => {
                    if (data && data.success) {
                        alert('Ticket deleted permanently');
                        if (typeof onRemoved === 'function') onRemoved(id);
                    } else {
                        alert(data?.message || 'Failed to delete ticket');
                    }
                })
                .catch(err => {
                    alert(err.message);
                    console.log(err);
                });
        }
    };

    const handleRestore = (id) => {
        if (window.confirm('Are you sure you want to restore this ticket?')) {
            restoreTicket(id)
                .then(data => {
                    if (data && data.success) {
                        alert('Ticket restored successfully');
                        if (typeof onRemoved === 'function') onRemoved(id);
                    } else {
                        alert(data?.message || 'Failed to restore ticket');
                    }
                })
                .catch(err => {
                    alert(err.message);
                    console.log(err);
                });
        }
    };

    const isClosed = ticket.status === 'CLOSED' || ticket.status === 'CANCELLED';
    const userIsAdmin = isAdmin();

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            'NEW': 'primary',
            'IN_PROGRESS': 'warning',
            'DISPATCHED': 'info',
            'CLOSED': 'success',
            'CANCELLED': 'secondary'
        };
        return `bg-${statusColors[status] || 'secondary'}`;
    };

    const getPriorityBadge = (priority) => {
        const priorityColors = {
            'CRITICAL': 'danger',
            'HIGH': 'warning',
            'MEDIUM': 'info',
            'LOW': 'secondary'
        };
        return `bg-${priorityColors[priority?.toUpperCase()] || 'secondary'}`;
    };

    return (
        <tr className={isClosed ? 'table-light text-muted' : ''} style={{ cursor: 'pointer' }}>
            <td className="text-center">
                <strong>{ticket.ticketNumber || ticket.ticketId || `TKT-${ticket._id?.slice(-6) || ticket.id?.slice(-6) || 'UNKNOWN'}`}</strong>
            </td>
            <td className="text-center">
                <div>
                    <strong>{ticket.customerName || ticket.name || 'N/A'}</strong>
                    {ticket.customerEmail && (
                        <div className="small text-muted">{ticket.customerEmail}</div>
                    )}
                </div>
            </td>
            <td className="text-left">
                <div className="text-truncate" style={{ maxWidth: '200px' }} title={ticket.description || ticket.desc || ''}>
                    {ticket.description || ticket.desc || 'No description'}
                </div>
            </td>
            <td className="text-center">
                <span className={`badge ${getPriorityBadge(ticket.priority)}`}>
                    {ticket.priority?.toUpperCase() || 'LOW'}
                </span>
            </td>
            <td className="text-center">
                <span className={`badge ${getStatusBadge(ticket.status)}`}>
                    {ticket.status || 'NEW'}
                </span>
            </td>
            <td className="text-center">
                <div className="small">
                    {formatDate(ticket.createdAt || ticket.created)}
                </div>
                {ticket.assignedTo && (
                    <div className="small text-muted">Assigned: {ticket.assignedTo}</div>
                )}
            </td>
            <td className="text-center">
                <div className="btn-group btn-group-sm" role="group">
                    <Link
                        className="btn btn-outline-primary btn-sm"
                        to={'/tickets/edit/' + (ticket._id || ticket.id)}
                        title="View/Edit Ticket"
                    >
                        <i className="fas fa-eye"></i>
                    </Link>
                    {userIsAdmin && !isClosed && (
                        <Link
                            className="btn btn-outline-warning btn-sm"
                            to={'/tickets/manage/' + (ticket._id || ticket.id)}
                            title="Manage Ticket"
                        >
                            <i className="fas fa-cogs"></i>
                        </Link>
                    )}
                    {!isClosed && (
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemove(ticket._id || ticket.id)}
                            title="Cancel Ticket"
                        >
                            <i className="fas fa-ban"></i>
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );

}

export default ListTicketItem;