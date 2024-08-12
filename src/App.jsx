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

  const [members, setMembers] = useState(["Alice", "Bob"]);
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
      prevSplitData.map((rowSplits) => rowSplits.filter((_, i) => i !== index))
    );
  };

  
  const toggleMemberForAllSplits = (memberIndex, isChecked) => {
    setSplitData((prevSplitData) =>
      prevSplitData.map((rowSplits) => {
        const updatedSplits = [...rowSplits];
        updatedSplits[memberIndex].isChecked = isChecked;

        
        const checkedCount = updatedSplits.filter((split) => split.isChecked).length;
        const splitAmount = checkedCount > 0 ? parseFloat(rowSplits[0].splitAmount) : 0;
        updatedSplits.forEach((split, i) => {
          split.splitAmount = split.isChecked ? splitAmount : 0;
        });

        return updatedSplits;
      })
    );
  };

  
  useEffect(() => {
    const totals = members.map((_, memberIndex) =>
      splitData.reduce((sum, rowSplits) => sum + rowSplits[memberIndex].splitAmount, 0)
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
        onEdit={(rowIndex, colIndex, newValue) => {
          const updatedContent = [...tableContent];
          updatedContent[rowIndex][colIndex] = newValue;
          setTableContent(updatedContent);
        }}
        onDelete={(rowIndex) => {
          const updatedContent = tableContent.filter((_, i) => i !== rowIndex);
          setTableContent(updatedContent);
          const updatedSplits = splitData.filter((_, i) => i !== rowIndex);
          setSplitData(updatedSplits);
        }}
        onEditMember={editMember}      
        onDeleteMember={deleteMember}  
        onToggleMember={toggleMemberForAllSplits} 
        totalSplits={totalSplits}      
      />
    </div>
  );
}

export default App;
