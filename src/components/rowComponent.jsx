import React from 'react';

const RowComponent = ({ item }) => {
  return (
    <div className="row">
      <img src={item.imagePath} alt="Row content" />
      <div className="text-content">
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </div>
  );
};

export default RowComponent;
