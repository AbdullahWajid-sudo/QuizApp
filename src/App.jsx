import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import HistoryView from "./views/HistoryView";
import QuizError from "./components/QuizError";
import Navbar from "./common/Navbar";

function App() {
  return (
    <>
      <BrowserRouter basename="/QuizApp">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/History" element={<HistoryView props />} />
          <Route path="/QuizError" element={<QuizError />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
