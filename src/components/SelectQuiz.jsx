import React from "react";
import { quizData } from "../data/questions";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import QuizError from "./QuizError";

function SelectQuiz() {
  const location = useLocation();
  const { name } = location.state || {};
  const navigate = useNavigate();
  const selectHandler = (quiz) => {
    navigate(`/Quiz/${quiz.id}`, {
      state: {
        questions: quiz.questions,
        title: quiz.topic,
        name: name,
      },
    });
  };
  if (!location.state) {
    return <QuizError />;
  }
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <div className="bg-ghost-white font-sans text-navy-deep antialiased ">
                <main className="flex-1 flex flex-col items-center px-4 py-8 md:py-12  md:pb-12">
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
                      {quizData.map((quiz) => {
                        return (
                          <div
                            key={quiz.id}
                            onClick={() => selectHandler(quiz)}
                            className="relative bg-white border-2 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group border-border-gray shadow-lg scale-[1.02] hover:border-purple-brand/30 transition-all shadow-soft group">
                            <div
                              className={
                                "w-20 h-20 md:w-26 md:h-26 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shrink-0 transition-transform group-hover:scale-110 bg-purple-brand-50 text-purple-brand-500 bg-purple-50 text-purple-500 "
                              }>
                              <img
                                className="w-30 h-30 md:w-38 md:h-38 object-contain"
                                src={quiz.image}
                                alt={quiz.topic}
                              />
                            </div>

                            <div className="text-center">
                              <h3 className="text-lg md:text-xl font-bold text-navy mb-1">
                                {quiz.topic}
                              </h3>
                              <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-2">
                                {quiz.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </main>
                <footer className="py-6 text-center text-slate-400  border-t border-border-gray bg-white mt-auto">
                  <div className="max-w-7xl mx-auto text-[11px] px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
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
              </div>
            </>
          }
        />
        <Route path="*" element={<>404 Page not fount</>} />
      </Routes>
    </>
  );
}

export default SelectQuiz;
