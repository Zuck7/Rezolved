import { remove } from "../../datasource/api-event";
import { Link } from "react-router-dom";

const ListItemEvent = ({ event, onRemoved }) => {

    const handleRemove = (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            remove(id)
                .then(data => {
                    if (data && data.success) {
                        if (typeof onRemoved === 'function') onRemoved(id);
                    }
                })
                .catch(err => {
                    alert(err.message);
                    console.log(err);
                });
        }
    };

    return (
        <tr >
            <td className="text-center"> {event.name || ''} </td>
            <td className="text-center"> {event.date || ''} </td>
            <td className="text-center"> {event.time || ''} </td>
            <td className="text-center">{event.location || ''}</td>
            <td className="text-center">{event.description || ''}</td>
            <td className="text-center">
                <Link className="btn bg-primary btn-primary btn-sm" to={'/events/edit/' + event.id}>
                    <i className="fas fa-pencil-alt"></i>
                </Link>
            </td>
            <td className="text-center">
                <button
                    className="btn bg-danger btn-danger btn-sm"
                    onClick={() => handleRemove(event.id)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    );

}

export default ListItemEvent;