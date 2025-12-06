import { remove } from "../../datasource/api-event";
import { Link } from "react-router-dom";

const ListItemEvent = ({ event, onRemoved }) => {

    const handleRemove = (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            remove(id)
                .then(data => {
                    if (data && data.success) {
                        alert('Event deleted successfully');
                        if (typeof onRemoved === 'function') onRemoved(id);
                    } else {
                        alert(data?.message || 'Failed to delete event');
                    }
                })
                .catch(err => {
                    alert(err?.message || 'An error occurred');
                    console.error('Delete error:', err);
                });
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <tr>
            <td className="text-center"> {event.title || event.name || ''} </td>
            <td className="text-center"> {formatDate(event.eventDate || event.date)} </td>
            <td className="text-center">
                <span className={`badge bg-${
                    event.priority === 'Critical' ? 'danger' :
                    event.priority === 'High' ? 'warning' :
                    event.priority === 'Medium' ? 'info' : 'secondary'
                }`}>
                    {event.priority || 'Low'}
                </span>
            </td>
            <td className="text-center">{event.location || ''}</td>
            <td className="text-center">{event.description || ''}</td>
            <td className="text-center">
                <Link className="btn bg-primary btn-primary btn-sm" to={'/events/edit/' + (event._id || event.id)}>
                    <i className="fas fa-pencil-alt"></i> Edit
                </Link>
            </td>
            <td className="text-center">
                <button
                    className="btn bg-danger btn-danger btn-sm"
                    onClick={() => handleRemove(event._id || event.id)}>
                    <i className="fas fa-trash-alt"></i> Delete
                </button>
            </td>
        </tr>
    );

}

export default ListItemEvent;