import { remove } from "../../datasource/api-tickets";
import { Link } from "react-router-dom";

const ListTicketItem = ({ ticket, onRemoved }) => {

    const handleRemove = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
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
            <td className="text-center"> {ticket.item || ''} </td>
            <td className="text-center"> {ticket.qty || ''} </td>
            <td className="text-center"> {ticket.status || ''} </td>
            <td>
                Hight: {ticket.size.h || ''}<br />
                Width: {ticket.size.w || ''}<br />
                UOM: {ticket.size.uom || ''}<br />
            </td>
            <td className="text-center">{ticket.tags.toString() || ''}</td>
            <td className="text-center">
                <Link className="btn bg-primary btn-primary btn-sm" to={'/tickets/edit/' + ticket.id}>
                    <i className="fas fa-pencil-alt"></i>
                </Link>
            </td>
            <td className="text-center">
                <button
                    className="btn bg-danger btn-danger btn-sm"
                    onClick={() => handleRemove(ticket.id)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    );

}

export default ListTicketItem;