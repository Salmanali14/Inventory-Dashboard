import React from 'react';

const InventoryCard = ({ imageUrl, boxName, quantityLeft }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-2 w-[100%] sm:w-64">
      <img src={imageUrl} alt={boxName} className="w-full h-40 object-cover rounded-t-lg" />
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{boxName}</h3>
        <p className="text-gray-600">Quantity Left: <span className="text-red-500 font-bold">{quantityLeft}</span></p>
      </div>
    </div>
  );
};

export default InventoryCard;
