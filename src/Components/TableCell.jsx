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

  const handleEditSubmit = () => {
    if (onEdit && inputValue.trim() !== "") {
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
          {splitAmount !== undefined && <span>{splitAmount.toFixed(3)}</span>}
        </label>
      )}

      {isEdit ? (
        isEditing ? (
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleEditSubmit}
              autoFocus
              style={{ marginRight: "5px" }}
            />
            <button onClick={handleEditSubmit}>Save</button>
          </div>
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            style={{ cursor: "pointer" }}
          >
            {content}
          </span>
        )
      ) : (
        <span>{content}</span>
      )}

      {isDel && onDelete && (
        <button onClick={onDelete} style={{ margin: "5px" }}>
          Delete
        </button>
      )}
    </div>
  );
};

export default TableCell;
