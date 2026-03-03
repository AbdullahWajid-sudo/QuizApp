import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <header className="w-full px-5 py-4 bg-white/80 backdrop-blur-md border-b border-border-gray sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between md:grid md:grid-cols-3">
            <Link to="/" className="flex items-center gap-2 justify-self-start">
              <div className="bg-quiz-purple p-1.5 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-lg">
                  auto_awesome
                </span>
              </div>
              <h1 className="text-lg font-bold tracking-tight text-navy">
                Quiz<span className="text-quiz-purple">App</span>
              </h1>
            </Link>
            <nav className="hidden md:flex items-center justify-center gap-8">
              <Link
                className="text-navy font-semibold text-sm hover:text-quiz-purple transition-colors"
                to="/">
                Home
              </Link>
              <Link
                className="text-slate-500 font-medium text-sm hover:text-quiz-purple transition-colors"
                to="/history">
                Quiz History
              </Link>
            </nav>
            <div className="flex items-center justify-self-end gap-4">
              <label
                className="md:hidden p-2 text-navy cursor-pointer"
                htmlFor="mobile-menu-toggle">
                <span className="material-symbols-outlined">menu</span>
              </label>
            </div>
          </div>
          <input
            className="hidden peer"
            id="mobile-menu-toggle"
            type="checkbox"
          />
          <div
            className="hidden peer-checked:flex absolute top-full left-0 w-full bg-white border-b border-border-gray flex-col p-6 space-y-4 shadow-xl md:hidden"
            id="mobile-menu">
            <Link className="text-navy font-semibold text-base" to="/">
              Home
            </Link>
            <Link
              className="text-slate-500 font-medium text-base"
              to="/history">
              Quiz History
            </Link>
          </div>
        </header>
      </div>
    </>
  );
}

export default Navbar;
