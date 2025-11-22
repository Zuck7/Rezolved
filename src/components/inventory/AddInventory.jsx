import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InventoryModel from "../../datasource/inventoryModel";
import { create } from "../../datasource/api-inventory";
import InventoryForm from "./InventoryForm";

const AddInventory = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState(new InventoryModel());
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(formData => ({ ...formData, [name]: value }));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting product: ", product);

        const submitProduct = {
            id: product.id,
            item: product.item,
            qty: product.qty,
            tags: product.tags.toString(),
            status: product.status,
            size: {
                h: product.size_h,
                w: product.size_w,
                uom: product.size_uom
            }
        };

        create(submitProduct)
            .then(data => {
                if (data && data.id) {
                    alert(`Item added with the id ${data.id}`);
                    navigate("/inventory/list");
                } else {
                    setErrorMsg(data.message);
                }
            })
            .catch(err => {
                setErrorMsg(err.message);
                console.log(err);
            });
    }


    return (
        <div className="container" style={{ paddingTop: 10 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Add Inventory Item</h1>
                    <p className="flash"><span>{errorMsg}</span></p>
                    <InventoryForm
                        product={product}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddInventory;