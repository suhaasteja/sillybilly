import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BillTable from './Components/BillTable'
import MemberForm from './Components/MemberForm'
import ItemForm from './Components/ItemForm'

function App() {
  const [members, setMembers] = useState([]);
  const [items, setItems] = useState([
    {
      index: 0,
      name: "abc",
      price: 5,
    }
  ]);
  const [memberSplits, setMemberSplits] = useState([]);

  // useEffect(() => {
  //   if(!memberSplits){
  //     setMemberSplits(prev => {
  //       const newMemberSplits = new Array(members.length).fill(0);
  //       return newMemberSplits;
  //     })
  //   }
  // }, [members]);

  const handleCellAction = (type, from, newVal, position, rowIndex) => {
    console.log(type, from, newVal, position, rowIndex);
    if(type == "edit" && from == "memberName"){
    console.log(type, from, newVal, position);

      setMembers(prev => {
        const newMembers = [...prev];
        newMembers[position] = newVal;
        return newMembers;
      });
    }

    if(type == "del" && from == "memberName"){
      setMembers(prev => {
        const newMembers = prev.filter((mem, index) => (index !== position));
        return newMembers;
      })
    }

    if(type == "edit" && from == "itemName"){
      setItems(prev => {
        const newItems = [...prev];
        newItems[position]["name"] = newVal;
        return newItems;
      })
    }

    if(type == "edit" && from == "itemPrice"){
      setItems(prev => {
        const newItems = [...prev];
        newItems[position]["price"] = newVal;
        return newItems;
      })
    }

    if(type == "edit" && from == "memberSplit"){
      console.log("here");
      setMemberSplits(prev => {
        const newMemberSplits = [...prev];
        newMemberSplits[position] = newVal;
        console.log(newMemberSplits);
        return newMemberSplits;
      })
    }

    if(type == "del" && from == "actionCol"){
      setItems(prev => {
        const newItems = prev.filter((_, index) => (index !== position));
        return newItems;
      })
    }
  }

  return <>
    <MemberForm setMembers={setMembers} />
    <ItemForm setItems={setItems} />
    <BillTable members={members} handleCellAction={handleCellAction} items={items} memberSplits={memberSplits} />
  </>
}

export default App
