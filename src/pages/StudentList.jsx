import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch,FaEdit, FaTrashAlt  } from "react-icons/fa";
import "./StudentList.css";

const ITEMS_PER_PAGE = 5;

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((r) => r.json())
      .then(setStudents)
      .catch(console.error);
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/students/${id}`, { method: "DELETE" })
      .then(() => setStudents((prev) => prev.filter((s) => s.id !== id)))
      .catch(console.error);
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = sortBy
    ? [...filtered].sort((a, b) =>
        sortBy === "age" || sortBy === "grade"
          ? a[sortBy] - b[sortBy]
          : a.name.localeCompare(b.name)
      )
    : filtered;

  const pagesCount = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paged = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="student-list">
      <div className="controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            placeholder="Search by name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="grade">Grade</option>
        </select>
      </div>

     <ul>
  {paged.map((s) => (
    <li key={s.id}>
      <span>{s.name}</span>
      <span>{s.age}</span>
      <span>{s.grade}</span>
      <Link to={`/edit/${s.id}`}>
        <button className="edit-btn" aria-label="Edit Student">
          <FaEdit />
        </button>
      </Link>
      <button
        className="delete-btn"
        onClick={() => handleDelete(s.id)}
        aria-label="Delete Student"
      >
        <FaTrashAlt />
      </button>
    </li>
  ))}
</ul>


      <div className="pagination">
        <button style={{color:"#545353ff"}} disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        {[...Array(pagesCount)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page >= pagesCount}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
