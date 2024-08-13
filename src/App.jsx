import React, { useState, useEffect } from "react";
import "./App.css";
import BillTable from "./Components/BillTable";
import MemberForm from "./Components/MemberForm";
import ItemForm from "./Components/ItemForm";

function App() {
  const [tableContent, setTableContent] = useState([
    ["Item 1", "10.00", 0, 0],
    ["Item 2", "20.00", 0, 0],
  ]);

  const [members, setMembers] = useState(["sigma", "skibidi"]);
  const [splitData, setSplitData] = useState(
    tableContent.map(() =>
      members.map(() => ({ isChecked: false, splitAmount: 0 }))
    )
  );

  const [totalSplits, setTotalSplits] = useState(null); 

  const addMember = (newMemberName) => {
    if (!newMemberName.trim()) return;
    setMembers((prevMembers) => [...prevMembers, newMemberName]);

    setSplitData((prevSplitData) =>
      prevSplitData.map((rowSplits) => [
        ...rowSplits,
        { isChecked: false, splitAmount: 0 },
      ])
    );
  };

  const addItem = (itemName, itemPrice) => {
    if (!itemName.trim() || !itemPrice.trim()) return;

    const newRow = [itemName, itemPrice];
    setTableContent((prevTableContent) => [...prevTableContent, newRow]);

    setSplitData((prevSplitData) => [
      ...prevSplitData,
      members.map(() => ({ isChecked: false, splitAmount: 0 })),
    ]);
  };

  const editMember = (index, newName) => {
    setMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      updatedMembers[index] = newName;
      return updatedMembers;
    });
  };

  const deleteMember = (index) => {
    setMembers((prevMembers) => prevMembers.filter((_, i) => i !== index));
  
    setSplitData((prevSplitData) =>
      prevSplitData.map((rowSplits) => {
        // Remove the member's split data from the current row
        const updatedRowSplits = rowSplits.filter((_, i) => i !== index);
  
        // Recalculate the splitAmount for the remaining members in this row
        const checkedCount = updatedRowSplits.filter((split) => split.isChecked).length;
        const splitAmount = checkedCount > 0 ? parseFloat(rowSplits[0].itemPrice) / checkedCount : 0;
  
        // Update the splitAmount for each remaining split
        return updatedRowSplits.map((split) => ({
          ...split,
          splitAmount: split.isChecked ? splitAmount : 0,
        }));
      })
    );
  
    // Update tableContent to remove the deleted member's column
    setTableContent((prevTableContent) =>
      prevTableContent.map((row) => {
        const [item, price, ...rest] = row;
        return [item, price, ...rest.filter((_, i) => i !== index)];
      })
    );
  };
  
  
  
  

  const toggleMemberForAllSplits = (memberIndex, isChecked) => {
    setSplitData((prevSplitData) =>
      prevSplitData.map((rowSplits) => {
        if (rowSplits[memberIndex]) {
          rowSplits[memberIndex].isChecked = isChecked;
  
          // Calculate the new split amount
          const itemPrice = parseFloat(tableContent[0][1]);
          const checkedCount = rowSplits.filter((split) => split.isChecked).length;
          const splitAmount = checkedCount > 0 ? itemPrice / checkedCount : 0;
  
          // Update all splits in this row
          return rowSplits.map((split, index) => {
            if (index === memberIndex) {
              return {
                ...split,
                splitAmount: split.isChecked ? splitAmount : 0,
              };
            }
            return split;
          });
        }
        return rowSplits;
      })
    );
  };
  
  

  useEffect(() => {
    const totals = members.map((_, memberIndex) =>
      splitData.reduce((sum, rowSplits) => {
        const splitAmount = rowSplits[memberIndex]?.splitAmount || 0;
        return sum + splitAmount;
      }, 0)
    );
    setTotalSplits(totals);
  }, [splitData, members, tableContent]);
  
  

  return (
    <div>
      <h1>SillyBilly</h1>
      <MemberForm addMember={addMember} />
      <ItemForm addItem={addItem} />
      <BillTable
        tableContent={tableContent}
        members={members}
        splitData={splitData}
        setSplitData={setSplitData}
        setTableContent={setTableContent} 
        onEditMember={editMember}      
        onDeleteMember={deleteMember}  
        onToggleMember={toggleMemberForAllSplits} 
        totalSplits={totalSplits}      
      />
    </div>
  );
}

export default App;
