import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Sidebar = ({ isMobileMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getLinkClass = (path) => {
    const base =
      "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ";
    return location.pathname === path
      ? base + "bg-primary text-white shadow-lg shadow-primary/20"
      : base + "text-navy/75 hover:bg-primary/10 hover:text-primary";
  };
  return (
    <aside
      className={`
      ${isMobileMenuOpen ? "flex" : "hidden"} 
      md:flex flex-col w-72 h-screen sticky top-0 bg-white  border-r border-navy/10 border-outline-variant/20 z-50
    `}
    >
      <div className="p-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-primary  rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-white">
              cast_for_education
            </span>
          </div>
          <div>
            <h1 className="font-headline text-navy text-lg font-bold leading-none">
              Quiz Admin
            </h1>
            <p className="text-[10px] text-navy text-on-surface-variant uppercase tracking-widest mt-1">
              Panel
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Link to="/dashboard" className={getLinkClass("/dashboard")}>
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-medium">Overview</span>
        </Link>
        <Link to="/addquiz" className={getLinkClass("/addquiz")}>
          <span className="material-symbols-outlined">note_add</span>
          <span className="font-medium">Add Quiz</span>
        </Link>
        <Link to="/editquiz" className={getLinkClass("/editquiz")}>
          <span className="material-symbols-outlined">edit_note</span>
          <span className="font-medium">Edit Quiz</span>
        </Link>
        <Link to="/manageusers" className={getLinkClass("/manageusers")}>
          <span className="material-symbols-outlined">
            admin_panel_settings
          </span>
          <span className="font-medium">Manage Users</span>
        </Link>
        <Link to="/managescore" className={getLinkClass("/managescore")}>
          <span className="material-symbols-outlined">scoreboard</span>
          <span className="font-medium">Manage Score</span>
        </Link>
      </nav>
      <div className="p-6">
        <button
          onClick={handleLogout}
          className="w-full bg-white flex items-center gap-4 px-4 py-3 text-error hover:bg-error-container/30 rounded-xl transition-all font-medium"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
