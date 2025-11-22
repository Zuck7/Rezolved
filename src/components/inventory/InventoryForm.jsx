import React from "react";
import { useNavigate } from 'react-router-dom';

const InventoryForm = ({ product = {}, handleChange, handleSubmit }) => {
    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit} className="form card p-3">
            <input type="hidden" name="id" value={product.id || ""} />

            <div className="form-group">
                <label htmlFor="itemTextField">Item Name</label>
                <input
                    id="itemTextField"
                    name="item"
                    className="form-control"
                    placeholder="Enter the Item Name"
                    value={product.item || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="QtyTextField">Quantity</label>
                <input
                    id="QtyTextField"
                    name="qty"
                    type="number"
                    className="form-control"
                    placeholder="00"
                    value={product.qty ?? 0}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="statusTextField">Status</label>
                <input
                    id="statusTextField"
                    name="status"
                    className="form-control"
                    placeholder="Enter a status"
                    value={product.status || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="card">
                <div className="card-header">Size</div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="hightTextField">Height</label>
                        <input
                            id="hightTextField"
                            name="size_h"
                            type="number"
                            step="0.01"
                            className="form-control"
                            placeholder="0.00"
                            value={product.size_h ?? ""}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="widthTextField">Width</label>
                        <input
                            id="widthTextField"
                            name="size_w"
                            type="number"
                            step="0.01"
                            className="form-control"
                            placeholder="0.00"
                            value={product.size_w ?? ""}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="uomTextField">UOM</label>
                        <input
                            id="uomTextField"
                            name="size_uom"
                            className="form-control"
                            placeholder="cm"
                            value={product.size_uom || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="tagTextArea">
                    Tags <span className="text-muted">[use , to separate tags]</span>
                </label>
                <textarea
                    id="tagTextArea"
                    name="tags"
                    className="form-control"
                    placeholder="Enter the tags of the item"
                    value={product.tags || ""}
                    onChange={handleChange}
                    required
                />
            </div>
            &nbsp;
            <button className="btn btn-primary" type="submit">
                <i className="fas fa-edit"></i> Submit
            </button>
            &nbsp;
            <button className="btn btn-warning" type="button" onClick={() => navigate(-1)} >
                <i className="fas fa-undo"></i>
                Cancel
            </button>
        </form>
    );
};

export default InventoryForm;