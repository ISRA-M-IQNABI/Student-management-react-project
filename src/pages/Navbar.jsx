import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaHome, FaUserPlus } from "react-icons/fa";

export default function Navbar() {
  return (
    <>
      <h1 className="header1">Student Management</h1>
      <nav className="navbar">
        <Link to="/" className="nav-item">
          <FaHome className="icon" />
          Home
        </Link>
        <Link to="/add" className="nav-item">
          <FaUserPlus className="icon" />
          Add Student
        </Link>
      </nav>
    </>
  );
}
