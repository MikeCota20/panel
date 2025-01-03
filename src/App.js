import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Mangas from "./pages/Mangas";
import Webtoons from "./pages/Webtoons";
import Comics from "./pages/Comics";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Categories />} /> 
          <Route path="/manga" element={<Mangas />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/webtoons" element={<Webtoons />} />
        </Routes>

      </div>
    </Router>

  );
}

export default App;
