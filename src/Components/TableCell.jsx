import React, { useState } from "react";

const TableCell = ({
  content,               
  isDel = false,       
  isCheckbox = false,  
  isEdit = false,      
  onToggleSplit,       
  splitAmount,         
  isChecked,           
  onDelete,            
  onEdit,              
}) => {
  const [isEditing, setIsEditing] = useState(false); 
  const [inputValue, setInputValue] = useState(content);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (onEdit) {
      onEdit(inputValue);
    }
    setIsEditing(false);
  };

  return (
    <div>
      {isCheckbox && (
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onToggleSplit && onToggleSplit(e.target.checked)}
            style={{ marginRight: "5px" }}
          />
          {splitAmount !== undefined && <span>{splitAmount.toFixed(2)}</span>}
        </label>
      )}

      {isDel && onDelete && (
        <button onClick={onDelete} style={{ marginRight: "5px" }}>
          Delete
        </button>
      )}

      {isEdit ? (
        isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleEditSubmit}
              autoFocus
              style={{ marginRight: "5px" }}
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <span onDoubleClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
            {content}
          </span>
        )
      ) : (
        <span>{content}</span>
      )}
    </div>
  );
};

export default TableCell;
