import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InventoryModel from "../../datasource/inventoryModel";
import { update, read } from "../../datasource/api-inventory";
import InventoryForm from "./InventoryForm";

const EditInventory = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(new InventoryModel());
    const [errorMsg, setErrorMsg] = useState('')

    // When the component loads.
    useEffect(() => {
        read(id).then(data => {
            if (data) {
                setProduct(new InventoryModel(
                    data.id,
                    data.item,
                    data.qty,
                    data.tags,
                    data.status,
                    data.size.h,
                    data.size.w,
                    data.size.uom
                ));
            } else {
                setErrorMsg(data.message);
            }

        }).catch(err => {
            setErrorMsg(err.message);
            console.log(err);
        });
    }, [id, navigate]);

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

        update(submitProduct, id)
            .then(data => {
                if (data && data.success) {
                    alert(data.message);
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
                    <h1>Edit Inventory Item</h1>
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

export default EditInventory;