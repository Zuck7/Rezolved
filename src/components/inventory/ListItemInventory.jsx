import { remove } from "../../datasource/api-inventory";
import { Link } from "react-router-dom";

const ListItemInventory = ({ product, onRemoved }) => {

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
            <td className="text-center"> {product.item || ''} </td>
            <td className="text-center"> {product.qty || ''} </td>
            <td className="text-center"> {product.status || ''} </td>
            <td>
                Hight: {product.size.h || ''}<br />
                Width: {product.size.w || ''}<br />
                UOM: {product.size.uom || ''}<br />
            </td>
            <td className="text-center">{product.tags.toString() || ''}</td>
            <td className="text-center">
                <Link className="btn bg-primary btn-primary btn-sm" to={'/inventory/edit/' + product.id}>
                    <i className="fas fa-pencil-alt"></i>
                </Link>
            </td>
            <td className="text-center">
                <button
                    className="btn bg-danger btn-danger btn-sm"
                    onClick={() => handleRemove(product.id)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    );

}

export default ListItemInventory;