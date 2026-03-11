import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Navbar() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Fetch the name from Firestore using the user's UID
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserName(userDoc.data().displayName); // Use the field name you saved in Register
          }
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      } else {
        setUserName(""); // Clear name on logout
      }
    });

    return () => unsubscribe();
  }, []);

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

              {user && (
                <Link
                  className="text-slate-500 font-medium text-sm hover:text-quiz-purple transition-colors"
                  to="/history">
                  Quiz History
                </Link>
              )}
            </nav>

            <div className="flex items-center justify-self-end gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="hidden lg:block text-xs text-slate-500 font-medium">
                    Welcome, {userName || "User"}
                  </span>
                  <button
                    onClick={() => signOut(auth)}
                    className="px-5 py-2 text-sm font-bold text-white bg-navy rounded-xl hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-200 transition-all active:scale-95">
                    Logout
                  </button>
                  {/* <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-semibold text-white bg-navy rounded-lg hover:bg-red-600 transition-colors">
                    Logout
                  </button> */}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-navy hover:text-quiz-purple transition-colors">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-semibold text-white bg-quiz-purple rounded-lg hover:opacity-90 transition-opacity">
                    Register
                  </Link>
                </div>
              )}

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

          <div className="hidden peer-checked:flex absolute top-full left-0 w-full bg-white border-b border-border-gray flex-col p-6 space-y-4 shadow-xl md:hidden">
            <Link className="text-navy font-semibold text-base" to="/">
              Home
            </Link>
            {user ? (
              <>
                <Link
                  className="text-slate-500 font-medium text-base"
                  to="/history">
                  Quiz History
                </Link>
                <button
                  onClick={() => signOut(auth)}
                  className="px-5 py-2 text-sm font-bold text-white bg-navy rounded-xl hover:bg-purple  -500 hover:shadow-lg hover:shadow-purple-200 transition-all active:scale-95">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="text-navy font-semibold text-base" to="/login">
                  Login
                </Link>
                <Link
                  className="text-navy font-semibold text-base"
                  to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </header>
      </div>
    </>
  );
}

export default Navbar;
