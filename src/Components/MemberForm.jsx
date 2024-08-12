import React, { useState } from "react";

const MemberForm = ({ addMember }) => {
  const [memberName, setMemberName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memberName.trim()) {
      addMember(memberName.trim());
      setMemberName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={memberName}
        onChange={(e) => setMemberName(e.target.value)}
        placeholder="Enter member name"
        required
      />
      <button type="submit">Add Member</button>
    </form>
  );
};

export default MemberForm;
