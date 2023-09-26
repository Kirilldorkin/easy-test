import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import GamePage from "./pages/Game";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<GamePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
