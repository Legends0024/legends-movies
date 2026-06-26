import { BrowserRouter as Router, Routes, Route } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#141414] text-white font-sans selection:bg-red-600 selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/watch/movie/:id" element={<WatchPage type="movie" />} />
          <Route path="/watch/tv/:id" element={<WatchPage type="tv" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
