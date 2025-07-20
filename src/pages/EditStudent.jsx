import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: "", age: "", grade: "" });

  useEffect(() => {
    fetch(`http://localhost:5000/students/${id}`)
      .then((r) => r.json())
      .then(setStudent)
      .catch(console.error);
  }, [id]);

  const handleChange = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student.name.trim()) return alert("Name is required");
    fetch(`http://localhost:5000/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...student, age: Number(student.age) }),
    })
      .then(() => navigate("/"))
      .catch(console.error);
  };

  return (
    <div className="form-page">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={student.name} onChange={handleChange} required />
        <input name="age" type="number" value={student.age} onChange={handleChange} required />
        <input name="grade" value={student.grade} onChange={handleChange} required />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}