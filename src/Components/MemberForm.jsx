import React, { useState } from "react";

const MemberForm = ({setMembers}) => {
  const [input, setInput] = useState("");
  const handleMemberFormSubmit = (e) => {
    e.preventDefault();
    setMembers(prev => [...prev, input]);
    setInput("");
  };
  return (
    <div>
      <form onSubmit={handleMemberFormSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type member name"
          required
        />
        <button type="submit">Add member</button>
      </form>
    </div>
  );
};

export default MemberForm;
