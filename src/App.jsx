import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import HistoryView from "./views/HistoryView";
import QuizError from "./components/QuizError";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

function App() {
  return (
    <>
      <HashRouter>
        <Navbar />

        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/History" element={<HistoryView props />} />
          <Route path="/QuizError" element={<QuizError />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
