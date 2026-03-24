import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import QuizError from "./QuizError";

function SelectQuiz() {
  const location = useLocation();
  const { userName } = location.state || {};
  const navigate = useNavigate();

  // --- New State for Firestore Data ---
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch Quizzes from Firebase ---
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const q = query(collection(db, "quizzes"), where("active", "==", true));
        const querySnapshot = await getDocs(q);
        const firebaseQuizzes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuizzes(firebaseQuizzes);
      } catch (error) {
        console.error("Error fetching active quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const selectHandler = (quiz) => {
    navigate(`/Quiz/${quiz.id}`, {
      state: {
        questions: quiz.questions, // Array stored in Firestore
        title: quiz.title, // Updated from .topic to .title to match your Firestore
        name: userName,
      },
    });
  };

  if (!location.state) {
    return <QuizError />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ghost-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-quiz-purple"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <div className="bg-ghost-white font-sans text-navy-deep antialiased min-h-screen">
              <main className="flex-1 flex flex-col items-center px-4 py-6 md:py-12">
                <div className="max-w-4xl w-full">
                  <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
                      Choose Your
                      <span className="text-quiz-purple"> Challenge</span>
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg px-4">
                      Select a technology to test your expertise and earn
                      badges.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 px-4 md:px-0">
                    {quizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        onClick={() => selectHandler(quiz)}
                        className="relative bg-white border-2 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group border-border-gray shadow-lg hover:border-quiz-purple/30 hover:scale-[1.02]"
                      >
                        <div className="w-20 h-20 md:w-26 md:h-26 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shrink-0 transition-transform group-hover:scale-110 bg-purple-50">
                          {/* Use the logoUrl we stored in the database */}
                          <img
                            className="w-full h-full object-contain p-2 rounded-xl"
                            src={quiz.imageUrl || quiz.image}
                            alt={quiz.title}
                          />
                        </div>

                        <div className="text-center">
                          <h3 className="text-lg md:text-xl font-bold text-navy mb-1">
                            {quiz.title}
                          </h3>
                          <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-2">
                            {quiz.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </main>
            </div>
          }
        />
        <Route path="*" element={<>404 Page not found</>} />
      </Routes>
    </>
  );
}

export default SelectQuiz;
