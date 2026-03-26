import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import DataTable from "../../common/DataTable";
import Sidebar from "./SideBar";

const ManageScore = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "Details"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedScores = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setScores(fetchedScores);
    } catch (error) {
      console.error("Error fetching scores:", error);
      // Fallback without sort if index is missing
      try {
        const qFallback = query(collection(db, "Details"));
        const querySnapshot = await getDocs(qFallback);
        const fetchedScores = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        fetchedScores.sort(
          (a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0),
        );
        setScores(fetchedScores);
      } catch (err) {
        console.error("Fallback fetch failed:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteScore = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteDoc(doc(db, "Details", id));
        setScores(scores.filter((score) => score.id !== id));
      } catch (error) {
        console.error("Error deleting score:", error);
        alert("Failed to delete record");
      }
    }
  };

  const columns = [
    {
      header: "User Name",
      key: "userName",
      // sort: true,
      // searchFilter: true,
      render: (row) => (
        <span className="font-medium">
          {row.name || row.userName || "Unknown User"}
        </span>
      ),
    },
    {
      header: "Quiz",
      key: "quizName",
      // sort: true,
      // searchFilter: true,
    },
    {
      header: "Score",
      key: "score",
      // sort: true,
    },
    {
      header: "Date",
      key: "timestamp",
      // sort: true,
      render: (row) =>
        row.timestamp?.seconds
          ? new Date(row.timestamp.seconds * 1000).toLocaleString()
          : row.date || "N/A",
    },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <button
          onClick={() => handleDeleteScore(row.id)}
          className="text-rose-500 hover:text-rose-700 transition-colors"
          title="Delete Record"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      ),
    },
  ];

  return (
    <div className="bg-ghost-white text-on-surface min-h-screen flex flex-col md:flex-row">
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-navy/10 border-outline-variant/10 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-on-surface"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="font-headline text-xl font-bold hidden md:block">
              Manage Score Board
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-none">
                {auth.currentUser?.displayName || "Admin User"}
              </p>
              <p className="text-[10px] text-on-surface-variant mt-1">
                {auth.currentUser?.email}
              </p>
            </div>
            <img
              alt="Profile"
              className="w-10 h-10 rounded-xl border-2 border-primary  object-cover"
              src={
                auth.currentUser?.photoURL ||
                "https://ui-avatars.com/api/?name=Admin"
              }
            />
          </div>
        </header>

        <div className="p-4 md:p-8 space-y-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-quiz-purple"></div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {scores.length === 0 ? (
                <div className="col-span-full text-center py-12 text-slate-400">
                  <span className="material-symbols-outlined text-4xl mb-2">
                    scoreboard
                  </span>
                  <p>No score history found.</p>
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={scores}
                  pagination
                  highlightOnHover
                  pointerOnHover
                  responsive
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageScore;
