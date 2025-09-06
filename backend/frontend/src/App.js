import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddSchool from "./pages/AddSchool";
import ShowSchools from "./pages/ShowSchools";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddSchool />} />
        <Route path="/show" element={<ShowSchools />} />
      </Routes>
    </Router>
  );
}

export default App;
