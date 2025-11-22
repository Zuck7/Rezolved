class InventoryModel {
    constructor(id, item, qty, tags, status, size_h, size_w, size_uom){
        this.id = id;
        this.item = item;
        this.qty = qty;
        this.tags = tags;
        this.status = status
        this.size_h = size_h;
        this.size_w = size_w;
        this.size_uom = size_uom;
    }
}

export default InventoryModel;