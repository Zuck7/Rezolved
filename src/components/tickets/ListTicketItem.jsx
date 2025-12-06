import { remove, deleteTicket, restoreTicket } from "../../datasource/api-tickets";
import { Link } from "react-router-dom";
import { isAdmin } from "../auth/auth-helper";

const ListTicketItem = ({ ticket, onRemoved }) => {

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

    const isCancelled = ticket.status === 'CANCELLED' || ticket.status === 'CLOSED';
    const userIsAdmin = isAdmin();

    return (
        <tr className={isCancelled ? 'table-secondary' : ''}>
            <td className="text-center">
                {ticket.customerName || ticket.name || ''}
                {isCancelled && <span className="badge bg-secondary ms-2">{ticket.status}</span>}
            </td>
            <td className="text-center">
                <span className={`badge bg-${ticket.priority === 'Critical' ? 'danger' :
                        ticket.priority === 'High' ? 'warning' :
                            ticket.priority === 'Medium' ? 'info' : 'secondary'
                    }`}>
                    {ticket.priority || 'N/A'}
                </span>
            </td>
            <td className="text-center">{ticket.description || ticket.desc || ''}</td>
            <td className="text-center">
                {!isCancelled ? (
                    <Link className="btn bg-primary btn-primary btn-sm" to={'/tickets/edit/' + (ticket._id || ticket.id)}>
                        <i className="fas fa-pencil-alt"></i> Edit
                    </Link>
                ) : (
                    <button className="btn btn-secondary btn-sm" disabled>
                        <i className="fas fa-lock"></i> Locked
                    </button>
                )}
            </td>
            <td className="text-center">
                {!isCancelled ? (
                    <button
                        className="btn bg-warning btn-warning btn-sm"
                        onClick={() => handleRemove(ticket._id || ticket.id)}>
                        <i className="fas fa-times-circle"></i> Cancel
                    </button>
                ) : (
                    <div className="btn-group btn-group-sm" role="group">
                        {userIsAdmin && (
                            <button
                                className="btn bg-success btn-success"
                                onClick={() => handleRestore(ticket._id || ticket.id)}>
                                <i className="fas fa-undo"></i> Restore
                            </button>
                        )}
                        <button
                            className="btn bg-danger btn-danger"
                            onClick={() => handleDelete(ticket._id || ticket.id)}>
                            <i className="fas fa-trash-alt"></i> Delete
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );

}

export default ListTicketItem;