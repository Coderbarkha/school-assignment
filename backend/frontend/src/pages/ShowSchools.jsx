import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API_BASE}/schools`)
      .then(res => setSchools(res.data))
      .catch(err => console.error("Error fetching schools:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this school?")) return;

      const res = await axios.delete(`${API_BASE}/schools/${id}`);
      console.log("Delete response:", res.data);
      setSchools(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error("Error deleting school:", err);
      const msg = err.response?.data?.error || err.message || "Unknown error";
      alert("Error in deleting: " + msg);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Schools List</h2>
      <div className="text-center mb-3">
        <button className="btn btn-success" onClick={() => (window.location.href = "/")}>Add Another School</button>
      </div>

      {schools.length === 0 ? (
        <p className="text-center text-muted">No schools found.</p>
      ) : (
        <div className="row">
          {schools.map(school => (
            <div className="col-md-4 mb-4" key={school.id}>
              <div className="card h-100 shadow-sm">
                {school.image && <img src={`${API_BASE}${school.image}`} alt={school.name} className="card-img-top" style={{ height: "200px", objectFit: "cover" }}/>}
                <div className="card-body">
                  <h5 className="card-title">{school.name}</h5>
                  <p className="card-text">{school.address}</p>
                  <p className="card-text text-muted">{school.city}</p>
                  <button className="btn btn-danger w-100" onClick={() => handleDelete(school.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
