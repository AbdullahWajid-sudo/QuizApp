import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./components/Home";
import HistoryView from "./views/HistoryView";
import QuizError from "./components/QuizError";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Dashboard from "./components/Admin/Dashboard";
import AddQuiz from "./components/Admin/AddQuiz";
import EditQuiz from "./components/Admin/EditQuiz";
import ManageUsers from "./components/Admin/ManageUsers";
import ManageScore from "./components/Admin/ManageScore";
import AdminRoute from "./components/Admin/AdminRoute";

function App() {
  const location = useLocation();
  const hiddenRoutes = [
    "/dashboard",
    "/addquiz",
    "/editquiz",
    "/manageusers",
    "/managescore",
  ];
  const hideLayout = hiddenRoutes.some((path) =>
    location.pathname.startsWith(path),
  );

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/*" element={<Home />} />
        {/* Protected Admin Routes */}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addquiz" element={<AddQuiz />} />
        <Route path="/editquiz" element={<EditQuiz />} />
        <Route path="/manageusers" element={<ManageUsers />} />
        <Route path="/managescore" element={<ManageScore />} />

        <Route path="/History" element={<HistoryView props />} />
        <Route path="/QuizError" element={<QuizError />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
