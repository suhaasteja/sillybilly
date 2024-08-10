import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BillTable from './Components/BillTable'
import MemberForm from './Components/MemberForm'

function App() {
  const [members, setMembers] = useState([]);
  const [items, setItems] = useState([
    // {
    //   index: 0,
    //   name: "abc",
    //   price: 5
    // }
  ]);

  const handleCellAction = (type, newVal, position) => {
    if(type == "editHeader"){
      setMembers(prev => {
        prev[position] = newVal;
        return [...prev];
      });
    }

    if(type == "delHeader"){
      setMembers(prev => {
        const newMembers = prev.filter((mem, index) => (index !== position));
        return newMembers;
      })
    }
  }

  return <>
    <MemberForm setMembers={setMembers} />
    <BillTable members={members} handleCellAction={handleCellAction} />
  </>
}

export default App
