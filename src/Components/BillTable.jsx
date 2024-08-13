import React from "react";
import TableCell from "./TableCell";

const BillTable = ({
  tableContent,
  members,
  splitData,
  setSplitData,
  setTableContent,
  onEditMember,
  onDeleteMember,
  onToggleMember,
  totalSplits,
}) => {
  const handleToggleSplit = (rowIndex, memberIndex, isChecked) => {
    setSplitData((prevSplitData) => {
      const updatedSplitData = [...prevSplitData];
      const rowSplits = [...updatedSplitData[rowIndex]];
  
      if (rowSplits[memberIndex]) {  // Ensure the memberIndex exists
        rowSplits[memberIndex].isChecked = isChecked;
  
        const itemPrice = parseFloat(tableContent[rowIndex][1]);
        const checkedCount = rowSplits.filter((split) => split.isChecked).length;
        const splitAmount = checkedCount > 0 ? itemPrice / checkedCount : 0;
  
        rowSplits.forEach((split) => {
          split.splitAmount = split.isChecked ? splitAmount : 0;
        });
  
        updatedSplitData[rowIndex] = rowSplits;
      }
  
      return updatedSplitData;
    });
  };
  

  const handleSelectAll = (rowIndex, isChecked) => {
    setSplitData((prevSplitData) => {
      const updatedSplitData = [...prevSplitData];
  
      const rowSplits = updatedSplitData[rowIndex].map((split, memberIndex) => ({
        ...split,
        isChecked: isChecked,
        splitAmount: isChecked ? parseFloat(tableContent[rowIndex][1]) / members.length : 0,
      }));
  
      updatedSplitData[rowIndex] = rowSplits;
  
      return updatedSplitData;
    });
  };
  

  const handleEdit = (rowIndex, colIndex, newValue) => {
    const updatedContent = [...tableContent];
    updatedContent[rowIndex][colIndex] = newValue;
    setTableContent(updatedContent);

    if (colIndex === 1) { // If the edited column is the price column
      const newPrice = parseFloat(newValue);
      setSplitData((prevSplitData) => {
        const updatedSplitData = [...prevSplitData];
        const rowSplits = [...updatedSplitData[rowIndex]];
        const checkedCount = rowSplits.filter((split) => split.isChecked).length;
        const splitAmount = checkedCount > 0 ? newPrice / checkedCount : 0;

        rowSplits.forEach((split) => {
          split.splitAmount = split.isChecked ? splitAmount : 0;
        });

        updatedSplitData[rowIndex] = rowSplits;
        return updatedSplitData;
      });
    }
  };

  const handleDelete = (rowIndex) => {
    const updatedContent = tableContent.filter((_, index) => index !== rowIndex);
    setTableContent(updatedContent);

    const updatedSplitData = splitData.filter((_, index) => index !== rowIndex);
    setSplitData(updatedSplitData);

    // Recalculate splits for remaining rows
    setSplitData((prevSplitData) => {
      return prevSplitData.map((rowSplits, rowIndex) => {
        const itemPrice = parseFloat(updatedContent[rowIndex][1]);
        const checkedCount = rowSplits.filter((split) => split.isChecked).length;
        const splitAmount = checkedCount > 0 ? itemPrice / checkedCount : 0;

        return rowSplits.map((split) => ({
          ...split,
          splitAmount: split.isChecked ? splitAmount : 0,
        }));
      });
    });
  };

  const handleDeleteMember = (memberIndex) => {
    onDeleteMember(memberIndex);
  
    // Recalculate splits for all rows after member deletion
    setSplitData((prevSplitData) => {
      return prevSplitData.map((rowSplits, rowIndex) => {
        const updatedRowSplits = rowSplits.filter((_, index) => index !== memberIndex);
        const itemPrice = parseFloat(tableContent[rowIndex][1]); 
        const checkedCount = updatedRowSplits.filter((split) => split.isChecked).length;
        const splitAmount = checkedCount > 0 ? itemPrice / checkedCount : 0;
  
        return updatedRowSplits.map((split) => ({
          ...split,
          splitAmount: split.isChecked ? splitAmount : 0,
        }));
      });
    });
  };

  const handleToggleMemberForAllSplits = (memberIndex, isChecked) => {
    onToggleMember(memberIndex, isChecked);
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
            const allSelected = splitData.every((rowSplits) => rowSplits[memberIndex]?.isChecked);
            return (
              <th key={memberIndex}>
                <TableCell
                  content={member}
                  isEdit={true}
                  onEdit={(newValue) => onEditMember(memberIndex, newValue)}
                  isDel={true}
                  onDelete={() => handleDeleteMember(memberIndex)}
                  isCheckbox={true}
                  isChecked={allSelected || false}
                  onToggleSplit={(isChecked) => handleToggleMemberForAllSplits(memberIndex, isChecked)}
                />
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableContent.map((row, rowIndex) => {
          const [itemName, itemPrice] = row;
          const allSelected = splitData[rowIndex]?.every((split) => split?.isChecked);
          return (
            <tr key={rowIndex}>
              <td>
                <TableCell
                  content={"Delete"}
                  isDel={true}
                  onDelete={() => handleDelete(rowIndex)}  // Handle row deletion
                />
              </td>
              <td>
                <TableCell
                  isCheckbox={true}
                  isChecked={allSelected || false}
                  onToggleSplit={(isChecked) => handleSelectAll(rowIndex, isChecked)}  // Handle select all
                />
              </td>
              <td>
                <TableCell content={rowIndex + 1} />
              </td>
              <td>
                <TableCell
                  content={itemName}
                  isEdit={true}
                  onEdit={(newValue) => handleEdit(rowIndex, 0, newValue)}
                />
              </td>
              <td>
                <TableCell
                  content={itemPrice}
                  isEdit={true}
                  onEdit={(newValue) => handleEdit(rowIndex, 1, newValue)}
                />
              </td>
              {members.map((_, memberIndex) => (
                <td key={memberIndex}>
                  <TableCell
                    isCheckbox={true}
                    isChecked={splitData[rowIndex]?.[memberIndex]?.isChecked || false}
                    splitAmount={splitData[rowIndex]?.[memberIndex]?.splitAmount || 0}
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
            <td colSpan="5" style={{ fontWeight: "bold" }}>
              Total Splits
            </td>
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
