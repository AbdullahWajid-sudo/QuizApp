import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import ResultView from "../views/ResultView";
import QuizView from "../views/QuizView";
import SelectQuiz from "./SelectQuiz";

function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) return alert("Please enter your name!");
    navigate("SelectQuiz", { state: { name } });
  };

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <main className="flex-1 flex flex-col items-center justify-center px-5 py-10">
                <div className="w-full max-w-md">
                  <div className="text-center mb-8">
                    <div className="inline-block px-3 py-1 rounded-full bg-quiz-purple/10 text-quiz-purple text-[10px] font-bold uppercase tracking-widest mb-4">
                      Join 10,000+ Learners
                    </div>
                    <h2 className="text-4xl font-extrabold text-navy leading-tight tracking-tight mb-4">
                      Master Your <br />
                      <span className="text-quiz-purple">Skills</span>
                    </h2>
                    <p className="text-slate-500 text-base max-w-[280px] mx-auto leading-relaxed">
                      Challenge yourself with professional quizzes and track
                      your progress.
                    </p>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="main-card rounded-2xl p-6 mb-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label
                          className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                          htmlFor="username">
                          Player Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-400 text-xl">
                              person
                            </span>
                          </div>
                          <input
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-ghost-white border border-border-gray rounded-xl py-4 pl-12 pr-4 text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-quiz-purple/20 focus:border-quiz-purple transition-all text-base"
                            id="username"
                            placeholder="Enter your full name"
                            type="text"
                          />
                        </div>
                      </div>
                      <button className="pill-button w-full h-14 flex items-center justify-center gap-3 bg-quiz-purple font-bold text-white text-base tracking-wide shadow-lg shadow-quiz-purple/20">
                        <span>START QUIZ</span>
                        <span className="material-symbols-outlined text-xl">
                          rocket_launch
                        </span>
                      </button>
                    </div>
                  </form>
                  <div className="grid grid-cols-1 gap-4 sm:flex sm:items-center sm:justify-center sm:gap-6 text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-lg">
                        verified
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider">
                        Certified Content
                      </span>
                    </div>
                    <div className="hidden sm:block h-4 w-px bg-border-gray"></div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-lg">
                        timer
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider">
                        10-Min Quizzes
                      </span>
                    </div>
                    <div className="hidden sm:block h-4 w-px bg-border-gray"></div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-lg">
                        leaderboard
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider">
                        Global Rankings
                      </span>
                    </div>
                  </div>
                </div>
              </main>
              <footer className="py-6 text-slate-400  border-t border-border-gray bg-white mt-auto">
                <div className="max-w-5xl mx-auto text-[11px]  px-5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
                  <p>© 2026 QuizApp Platform. All rights reserved.</p>
                  <div className="flex gap-6">
                    <a className="hover:text-purple-brand" href="#">
                      Privacy Policy
                    </a>
                    <a className="hover:text-purple-brand" href="#">
                      Terms of Service
                    </a>
                  </div>
                </div>
              </footer>
            </>
          }
        />
        <Route path="SelectQuiz/*" element={<SelectQuiz />} />
        <Route path="Quiz/:id/*" element={<QuizView />} />
        <Route path="Result" element={<ResultView />} />
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default Home;
