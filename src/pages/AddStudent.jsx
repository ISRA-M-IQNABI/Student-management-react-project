import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./AddStudent.css";


export default function AddStudent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  if (!name.trim()) return alert("Name is required");
  if (Number(age) <= 0) return alert("The age is incorrect."); 

    const newStudent = { id: uuidv4(), name, age: Number(age), grade };

    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    })
      .then(() => navigate("/"))
      .catch(console.error);
  };

  return (
    <div className="form-page">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <input placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}