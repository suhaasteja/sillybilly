import React, { useState } from "react";

const ItemForm = ({ addItem }) => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim() && itemPrice.trim()) {
      addItem(itemName.trim(), parseFloat(itemPrice).toFixed(3));
      setItemName("");
      setItemPrice("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Enter item name"
        required
      />
      <input
        type="number"
        value={itemPrice}
        onChange={(e) => setItemPrice(e.target.value)}
        placeholder="Enter item price"
        step="0.01"
        min="0"
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
