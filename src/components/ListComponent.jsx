import RowComponent from "./rowComponent";

function ListComponent( {items} ){
    return(
        <div>
            {items.map((itemList, index) => (
                <RowComponent key={index} item={itemList}/>
            ))}
        </div>
    );
}

export default ListComponent;