import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Detection from "./pages/Detection.jsx";
import Result from "./pages/Result.jsx";
import History from "./pages/History.jsx";

// Navbar and Footer are rendered once, here, for every route.
// Do not import Navbar/Footer inside individual pages.
export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<Detection />} />
          <Route path="/result" element={<Result />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
