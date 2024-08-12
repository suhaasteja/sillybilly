import React from "react";
import TableCell from "./TableCell";

const BillTable = ({ tableContent, members, splitData, setSplitData, onEdit, onDelete, onEditMember, onDeleteMember, onToggleMember, totalSplits }) => {
  const handleToggleSplit = (rowIndex, memberIndex, isChecked) => {
    setSplitData((prevSplitData) => {
      const updatedSplitData = [...prevSplitData];
      const rowSplits = [...updatedSplitData[rowIndex]];

      rowSplits[memberIndex].isChecked = isChecked;

      const itemPrice = parseFloat(tableContent[rowIndex][1]);
      const checkedCount = rowSplits.filter((split) => split.isChecked).length;
      const splitAmount = checkedCount > 0 ? itemPrice / checkedCount : 0;

      rowSplits.forEach((split) => {
        split.splitAmount = split.isChecked ? splitAmount : 0;
      });

      updatedSplitData[rowIndex] = rowSplits;
      return updatedSplitData;
    });
  };

  const handleSelectAll = (rowIndex, isChecked) => {
    setSplitData((prevSplitData) => {
      const updatedSplitData = [...prevSplitData];
      const rowSplits = updatedSplitData[rowIndex].map(() => ({
        isChecked: isChecked,
        splitAmount: isChecked ? parseFloat(tableContent[rowIndex][1]) / members.length : 0,
      }));

      updatedSplitData[rowIndex] = rowSplits;
      return updatedSplitData;
    });
  };

  return (
    <table border="1" cellPadding="5" cellSpacing="0">
      <thead>
        <tr>
          <th>Action</th>
          <th>Select</th>
          <th>Index</th>
          <th>Item</th>
          <th>Price</th>
          {members.map((member, memberIndex) => {
            const allSelected = splitData.every((rowSplits) => rowSplits[memberIndex].isChecked);
            return (
              <th key={memberIndex}>
                <TableCell
                  content={member}
                  isEdit={true} 
                  onEdit={(newValue) => onEditMember(memberIndex, newValue)}
                  isDel={true} 
                  onDelete={() => onDeleteMember(memberIndex)}
                  isCheckbox={true} 
                  isChecked={allSelected}
                  onToggleSplit={(isChecked) => onToggleMember(memberIndex, isChecked)}
                />
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableContent.map((row, rowIndex) => {
          const [itemName, itemPrice] = row;
          const allSelected = splitData[rowIndex]?.every((split) => split.isChecked);
          return (
            <tr key={rowIndex}>
              <td>
                <TableCell
                  content={"Delete"}
                  isDel={true}
                  onDelete={() => onDelete(rowIndex)}
                />
              </td>
              <td>
                <TableCell
                  isCheckbox={true}
                  isChecked={allSelected}
                  onToggleSplit={(isChecked) => handleSelectAll(rowIndex, isChecked)}
                />
              </td>
              <td>
                <TableCell content={rowIndex + 1} />
              </td>
              <td>
                <TableCell content={itemName} />
              </td>
              <td>
                <TableCell content={itemPrice} />
              </td>
              {members.map((_, memberIndex) => (
                <td key={memberIndex}>
                  <TableCell
                    isCheckbox={true}
                    isChecked={splitData[rowIndex][memberIndex].isChecked}
                    splitAmount={splitData[rowIndex][memberIndex].splitAmount}
                    onToggleSplit={(isChecked) =>
                      handleToggleSplit(rowIndex, memberIndex, isChecked)
                    }
                  />
                </td>
              ))}
            </tr>
          );
        })}
        {totalSplits && (
          <tr>
            <td colSpan="5" style={{ fontWeight: "bold" }}>Total Splits</td>
            {totalSplits.map((total, index) => (
              <td key={index} style={{ fontWeight: "bold" }}>
                <TableCell content={total.toFixed(2)} />
              </td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BillTable;
