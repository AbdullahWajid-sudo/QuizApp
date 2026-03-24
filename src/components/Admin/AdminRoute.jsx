import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const AdminRoute = () => {
  const [authStatus, setAuthStatus] = useState({
    loading: true,
    isLoggedIn: false,
    isAdmin: false,
  });
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          let isAdmin = false;
          if (userDoc.exists()) {
            const data = userDoc.data();
            isAdmin = data.isAdmin === true || data.isAdmin === "true";
          }
          setAuthStatus({ loading: false, isLoggedIn: true, isAdmin });
        } catch (error) {
          console.error("Error checking admin status:", error);
          setAuthStatus({ loading: false, isLoggedIn: true, isAdmin: false });
        }
      } else {
        setAuthStatus({ loading: false, isLoggedIn: false, isAdmin: false });
      }
    });

    return () => unsubscribe();
  }, []);

  if (authStatus.loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-ghost-white">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-quiz-purple"></div>
      </div>
    );
  }

  if (!authStatus.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!authStatus.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
