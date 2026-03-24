import React from "react";
import { Routes, Route } from "react-router-dom";
import QuizError from "../components/QuizError";
import { useQuizViewModel } from "../viewModels/useQuizViewModel";

function QuizView() {
  const { state, action } = useQuizViewModel();

  if (!state) {
    return <QuizError />;
  }
  const progressPercent = Math.round(
    ((state.questionNo + 1) / state.quizLength) * 100,
  );

  return (
    <Routes>
      <Route
        index
        element={
          <>
            <div className="min-h-screen bg-slate-50/50 pb-32 md:pb-8">
              <div className="max-w-md mx-auto px-4 py-4 md:max-w-4xl md:px-6 md:py-8">
                <header className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img
                        alt="User"
                        className="h-full w-full object-cover"
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">
                        {state.name || "Player"}
                      </p>
                      <p className="text-navy font-bold text-sm">
                        {state.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-border-light shadow-sm">
                    <span className="material-symbols-outlined text-quiz-purple text-lg">
                      timer
                    </span>
                    <span className="font-mono text-base font-bold text-navy">
                      {action.formatTime(state.time)}
                    </span>
                  </div>
                </header>

                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Question {state.questionNo + 1} of {state.quizLength}
                    </span>
                    <span className="text-xs font-bold text-quiz-purple">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white rounded-full border border-border-light overflow-hidden">
                    <div
                      className="h-full bg-quiz-purple transition-all duration-500 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                <main className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-semibold text-navy leading-tight tracking-tight">
                      {state.currentQuestion.questionText}
                    </h1>
                    <p className="text-slate-500 text-sm md:text-lg">
                      Select one of the following options:
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {state.currentQuestion.options.map((option, id) => {
                      const isSelected =
                        state.userAnswer[state.questionNo] === option;
                      const label = String.fromCharCode(65 + id);

                      return (
                        <button
                          key={id}
                          onClick={() => action.selectHandle(option)}
                          className={`flex items-center justify-between w-full p-2 rounded-2xl border-2 transition-all duration-200 group ${
                            isSelected
                              ? "border-quiz-purple bg-white shadow-md shadow-quiz-purple/5"
                              : "border-white bg-white hover:border-slate-200 shadow-sm"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
                                isSelected
                                  ? "bg-quiz-purple text-white shadow-md shadow-quiz-purple/20"
                                  : "bg-slate-50 text-slate-400 border border-slate-100"
                              }`}
                            >
                              {label}
                            </div>
                            <span
                              className={`text-base text-left ${isSelected ? "font-bold text-navy" : "font-semibold text-slate-700"}`}
                            >
                              {option}
                            </span>
                          </div>
                          {isSelected && (
                            <span className="material-symbols-outlined text-quiz-purple fill-1">
                              check_circle
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-100 p-4 md:relative md:bg-transparent md:border-none md:p-0">
                    <div className="flex items-center gap-3 max-w-xl mx-auto">
                      <button
                        onClick={action.prevHandler}
                        disabled={state.questionNo === 0}
                        className="flex-1 p-4 rounded-2xl border border-border-light bg-white text-slate-600 active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined">
                          arrow_back
                        </span>
                      </button>

                      {state.questionNo === state.quizLength - 1 ? (
                        <button
                          onClick={action.submitHandler}
                          disabled={action.isAnyUnanswered()}
                          className="flex-1 py-4 px-6 rounded-2xl bg-navy text-white font-bold hover:bg-slate-800 shadow-lg active:scale-[0.98] disabled:opacity-50 transition-all"
                        >
                          Submit Quiz
                        </button>
                      ) : (
                        <button
                          onClick={action.nextHandler}
                          className="flex-1 py-4 px-6 rounded-2xl bg-quiz-purple text-white font-bold hover:bg-purple-600 shadow-lg shadow-quiz-purple/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                          Next
                          <span className="material-symbols-outlined text-lg">
                            arrow_forward
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </>
        }
      />
      <Route
        path="*"
        element={
          <div className="p-20 text-center font-bold">404 Page not found</div>
        }
      />
    </Routes>
  );
}

export default QuizView;
