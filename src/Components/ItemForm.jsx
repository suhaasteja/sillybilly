import React, { useState } from 'react'

const ItemForm = ({setItems}) => {
    const [input, setInput] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setItems(prev => [...prev, 
            {
                index: prev.length,
                name: input,
                price: 0
            }
        ]);
        setInput("");
    }
  return (
    <form onSubmit={handleFormSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='add new item' />
        <button type='submit'>add item</button>
    </form>
  )
}

export default ItemForm