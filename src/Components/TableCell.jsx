import React, { useState } from "react";

const TableCell = ({
  val,
  handleCellAction,
  rowIndex,
  valIndex,
  from,
  delAction,
  editAction,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState(val);

  const handleAction = (type) => {
    if (type == "edit") {
      setIsEdit(!isEdit);
    } else if (type == "del") {
      handleCellAction("del", from, input, valIndex);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleCellAction("edit", from, input, valIndex, rowIndex);
    setIsEdit(false);
  };
  return (
    <span>
      {isEdit ? (
        <form onSubmit={handleFormSubmit}>
          <input onChange={(e) => setInput(e.target.value)} value={input} />
          <button type="submit">submit</button>
        </form>
      ) : (
        val
      )}
      {!isEdit && (
        <>
          {editAction && (
            <button onClick={() => handleAction("edit")}>edit</button>
          )}
          {delAction && (
            <button onClick={() => handleAction("del")}>del</button>
          )}
        </>
      )}
    </span>
  );
};

export default TableCell;
