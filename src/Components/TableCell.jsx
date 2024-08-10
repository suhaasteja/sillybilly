import React, { useState } from "react";

const TableCell = ({ val, handleCellAction, valIndex }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState(val);

  const handleAction = (type) => {
    if (type == "edit") {
      setIsEdit(!isEdit);
    } else if (type == "del") {
      handleCellAction("delHeader", input, valIndex);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleCellAction("editHeader", input, valIndex);
    setIsEdit(false);
  };
  return (
    <span>
      {isEdit ? (
        <form onSubmit={handleFormSubmit}>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button type="submit">submit</button>
        </form>
      ) : (
        val
      )}
      {!isEdit && (
        <>
          <button onClick={() => handleAction("edit")}>edit</button>
          <button onClick={() => handleAction("del")}>del</button>
        </>
      )}
    </span>
  );
};

export default TableCell;
