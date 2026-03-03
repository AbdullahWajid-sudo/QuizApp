import React from "react";
import QuizError from "../components/QuizError";
import { useResultViewModel } from "../viewModels/useResultViewModel";

function ResultView() {
  const { state, actions } = useResultViewModel();

  if (!state) {
    return <QuizError />;
  }

  const totalQuestions = state.finalQuestions?.length || 0;
  const scorePercentage =
    totalQuestions > 0
      ? Math.round((state.finalScore / totalQuestions) * 100)
      : 0;

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
                {scorePercentage}%
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
                {state.finalScore}/{totalQuestions}
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
                {scorePercentage > 70 ? "High" : "Keep Practicing"}
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
              className="text-sm font-bold text-quiz-purple hover:underline">
              {state.isVisibleResult ? "Hide Review" : "Show Review"}
            </button>
          </div>

          {state.isVisibleResult && (
            <div className="space-y-4">
              {state.finalQuestions.map((q, index) => {
                const userAns = state.finalAnswers[index];

                // console.log(`Q${index + 1}:`, {
                //   userSelected: userAns,
                //   actualData: q,
                // });
                const actualCorrect = q.correctAnswer || q.answer || q.correct;

                const isCorrect =
                  userAns !== undefined &&
                  actualCorrect !== undefined &&
                  userAns.toString().trim().toLowerCase() ===
                    actualCorrect.toString().trim().toLowerCase();

                return (
                  <div
                    key={index}
                    className={`bg-white p-5 rounded-2xl border-l-4 shadow-sm ${isCorrect ? "border-l-emerald-400" : "border-l-rose-400"}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">
                        Question {index + 1}
                      </span>
                      <span
                        className={`material-symbols-outlined text-xl ${isCorrect ? "text-emerald-500" : "text-rose-400"}`}>
                        {isCorrect ? "check_circle" : "cancel"}
                      </span>
                    </div>

                    <p className="font-bold text-navy mb-3">{q.question}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-sm">
                        <span className="text-slate-400 block mb-0.5">
                          Your Answer
                        </span>
                        <span
                          className={
                            isCorrect
                              ? "text-emerald-600 font-semibold"
                              : "text-rose-500 font-semibold"
                          }>
                          {userAns || "Skipped"}
                        </span>
                      </div>

                      <div className="text-sm">
                        <span className="text-slate-400 block mb-0.5">
                          Correct Answer
                        </span>
                        <span className="text-navy font-semibold">
                          {actualCorrect || "Data Missing in ViewModel"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
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
            className="w-full py-4 bg-quiz-purple text-white font-bold rounded-xl shadow-lg shadow-quiz-purple/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">refresh</span>
            RETRY QUIZ
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => actions.navigate("/")}
              className="flex-1 py-4 bg-white text-quiz-purple border border-quiz-purple/20 font-bold rounded-xl active:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">home</span>
              HOME
            </button>
            {/* <button className="flex-1 py-4 bg-navy text-white font-bold rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">share</span>
              SHARE
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultView;
