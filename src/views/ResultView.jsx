import React from "react";
import QuizError from "../components/QuizError";
import { useResultViewModel } from "../viewModels/useResultViewModel";
import Answers from "../components/Answers";

function ResultView() {
  const { state, actions } = useResultViewModel();

  if (!state) {
    return <QuizError />;
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50/50 overflow-x-hidden">
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 pb-40">
        <div className="mb-8 text-center">
          <div className="inline-block p-3 rounded-full bg-quiz-purple/5 mb-4">
            <span className="material-symbols-outlined text-quiz-purple text-4xl">
              emoji_events
            </span>
          </div>
          <h2 className="text-3xl font-bold text-navy mb-2">Quiz Completed!</h2>
          <p className="text-slate-500">
            Great effort, {state.userName}! Here is your performance summary for{" "}
            <b>{state.QuizName}</b>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-white border border-slate-100 rounded-2xl flex items-center justify-between p-5 shadow-sm">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Final Score
              </span>
              <div className="text-2xl font-bold text-quiz-purple">
                {state.finalScore}%
              </div>
            </div>
            <span className="material-symbols-outlined text-quiz-purple/20 text-3xl">
              grade
            </span>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl flex items-center justify-between p-5 shadow-sm">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Time Taken
              </span>
              <div className="text-2xl font-bold text-quiz-purple">
                {state.totalTimeStr}
              </div>
            </div>
            <span className="material-symbols-outlined text-quiz-purple/20 text-3xl">
              timer
            </span>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl flex items-center justify-between p-5 shadow-sm">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Correct
              </span>
              <div className="text-2xl font-bold text-emerald-500">
                {state.correctAnswers}/{state.totalQuestions}
              </div>
            </div>
            <span className="material-symbols-outlined text-emerald-500/20 text-3xl">
              check_circle
            </span>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl flex items-center justify-between p-5 shadow-sm">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Accuracy
              </span>
              <div className="text-2xl font-bold text-rose-400">
                {state.finalScore >= 90
                  ? "Expert! Outstanding Performance"
                  : state.finalScore >= 75
                    ? "Great Job! Almost Perfect"
                    : state.finalScore >= 50
                      ? "Good Effort! Keep Improving"
                      : "Keep Practicing"}
              </div>
            </div>
            <span className="material-symbols-outlined text-rose-400/20 text-3xl">
              insights
            </span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-navy">Question Review</h3>
            <button
              onClick={() => actions.setIsVisibleResult(!state.isVisibleResult)}
              className="text-sm font-bold text-quiz-purple hover:underline"
            >
              {state.isVisibleResult ? "Hide Review" : "Show Review"}
            </button>
          </div>

          {state.isVisibleResult && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Answers
                que={state.questions || state.finalQuestions}
                ans={state.userAnswers || state.finalAnswers}
              />
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-slate-200 shadow-2xl z-50">
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          <button
            onClick={() =>
              actions.navigate("/SelectQuiz", {
                state: { name: state.userName },
              })
            }
            className="w-full py-4 bg-quiz-purple text-white font-bold rounded-xl shadow-lg shadow-quiz-purple/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">refresh</span>
            RETRY QUIZ
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => actions.navigate("/")}
              className="flex-1 py-4 bg-white text-quiz-purple border border-quiz-purple/20 font-bold rounded-xl active:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">home</span>
              HOME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultView;
