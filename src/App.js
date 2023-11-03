import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "./styles/App.css";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/detail-business/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
