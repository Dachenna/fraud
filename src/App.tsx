import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from './Components/Hero';
import FraudDetection from './Components/Detection';
import Navbar from "./Components/NavBar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/detect" element={<FraudDetection />} />
      </Routes>
    </Router>
  )
}

export default App
