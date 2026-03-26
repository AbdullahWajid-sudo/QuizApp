import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  limit,
  query,
  getCountFromServer,
} from "firebase/firestore";
import DataTable from "../../common/DataTable";
import StatCard from "../../common/StatCard";
import Sidebar from "./SideBar";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    activeUsers: 0,
    avgScore: 0,
  });
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        console.log("Starting fetch...");

        const quizQuery = query(collection(db, "quizzes"), limit(5));
        const quizSnapshot = await getDocs(quizQuery);
        let fetchedQuizzes = quizSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const totalQuizzesSnap = await getCountFromServer(
          collection(db, "quizzes"),
        );
        const totalUsersSnap = await getCountFromServer(
          collection(db, "users"),
        );
        const detailsSnap = await getDocs(collection(db, "Details"));
        let calculatedAvg = 0;
        const playsCount = {};

        if (!detailsSnap.empty) {
          let totalPercentage = 0;
          let validRecords = 0;

          detailsSnap.forEach((doc) => {
            const data = doc.data();

            // Count plays per quiz
            const qName = data.quizName;
            if (qName) {
              playsCount[qName] = (playsCount[qName] || 0) + 1;
            }

            if (
              data.score &&
              typeof data.score === "string" &&
              data.score.includes("/")
            ) {
              const parts = data.score.split("/");
              const earned = parseFloat(parts[0]);
              const total = parseFloat(parts[1]);

              if (!isNaN(earned) && !isNaN(total) && total > 0) {
                totalPercentage += (earned / total) * 100;
                validRecords++;
              }
            }
          });

          if (validRecords > 0) {
            calculatedAvg = Math.round(totalPercentage / validRecords);
          }
        }

        // Merge play counts into quizzes
        fetchedQuizzes = fetchedQuizzes.map((quiz) => ({
          ...quiz,
          plays: playsCount[quiz.title] || 0,
        }));
        setQuizzes(fetchedQuizzes);

        setStats({
          totalQuizzes: totalQuizzesSnap.data().count,
          activeUsers: totalUsersSnap.data().count.toLocaleString(),
          avgScore: `${calculatedAvg}%`,
        });
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const columns = [
    {
      header: "Quiz Name",
      key: "title",
      // sort: true,
    },
    {
      header: "Plays",
      key: "plays",
      // sort: true,
    },
    {
      header: "Status",
      key: "active",
      render: (row) => (
        <span className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              row.active ? "bg-emerald-500" : "bg-outline-variant"
            }`}
          ></span>
          <span className="text-xs">{row.active ? "Active" : "Draft"}</span>
        </span>
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
              Dashboard
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
            <>
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Total Quizzes"
                  value={stats.totalQuizzes}
                  icon="quiz"
                />
                <StatCard
                  title="Average Score"
                  value={stats.avgScore}
                  icon="speed"
                />
                <StatCard
                  title="Active Users"
                  value={stats.activeUsers}
                  icon="group"
                  highlight
                />
              </section>
              <DataTable columns={columns} data={quizzes} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
