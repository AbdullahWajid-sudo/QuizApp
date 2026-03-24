import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Sidebar from "./SideBar";

const EditQuiz = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "quizzes"));
      const quizList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuizzes(quizList);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuiz = async (e) => {
    e.preventDefault();
    if (!selectedQuiz) return;

    const isInvalid = selectedQuiz.questions.some(
      (q) => q.correctAnswer === "",
    );
    if (isInvalid) {
      alert("Please select a correct answer for every question!");
      return;
    }

    try {
      const quizRef = doc(db, "quizzes", selectedQuiz.id);
      const { ...quizData } = selectedQuiz;
      await updateDoc(quizRef, quizData);
      alert("Quiz updated successfully!");
      setSelectedQuiz(null);
      fetchQuizzes();
    } catch (error) {
      console.error("Error updating quiz:", error);
      alert("Failed to update quiz.");
    }
  };

  const handleToggleActive = async (e, quiz) => {
    e.stopPropagation();
    const newActiveState = !quiz.active;
    try {
      const quizRef = doc(db, "quizzes", quiz.id);
      await updateDoc(quizRef, {
        active: newActiveState,
      });
      setQuizzes(
        quizzes.map((q) =>
          q.id === quiz.id ? { ...q, active: newActiveState } : q,
        ),
      );
    } catch (error) {
      console.error("Error toggling quiz status:", error);
      alert("Failed to update quiz status.");
    }
  };

  const handleDeleteQuiz = async (e, quizId) => {
    e.stopPropagation();
    if (
      window.confirm(
        "Are you sure you want to delete this quiz? This action cannot be undone.",
      )
    ) {
      try {
        await deleteDoc(doc(db, "quizzes", quizId));
        setQuizzes(quizzes.filter((q) => q.id !== quizId));
        if (selectedQuiz?.id === quizId) setSelectedQuiz(null);
      } catch (error) {
        console.error("Error deleting quiz:", error);
        alert("Failed to delete quiz");
      }
    }
  };

  const addQuestionField = () => {
    setSelectedQuiz((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
      ],
    }));
  };

  const deleteQuestion = (indexToDelete) => {
    setSelectedQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, index) => index !== indexToDelete),
    }));
  };

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
              {selectedQuiz ? "Edit Quiz" : "All Quizzes"}
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

        <div className="max-w-5xl mx-auto w-full p-4 md:p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-quiz-purple"></div>
            </div>
          ) : selectedQuiz ? (
            <form onSubmit={handleUpdateQuiz} className="space-y-6">
              <button
                type="button"
                onClick={() => setSelectedQuiz(null)}
                className="flex items-center text-slate-500 hover:text-navy mb-4 transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                <span className="ml-2 font-bold">Back to Quizzes</span>
              </button>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Quiz Title
                  </label>
                  <input
                    className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none hover:border-slate-400"
                    value={selectedQuiz.title}
                    onChange={(e) =>
                      setSelectedQuiz({
                        ...selectedQuiz,
                        title: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none h-24 hover:border-slate-400"
                    value={selectedQuiz.description}
                    onChange={(e) =>
                      setSelectedQuiz({
                        ...selectedQuiz,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Logo Image URL
                  </label>
                  <input
                    className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none hover:border-slate-400"
                    value={selectedQuiz.imageUrl || ""}
                    onChange={(e) =>
                      setSelectedQuiz({
                        ...selectedQuiz,
                        imageUrl: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {selectedQuiz.questions.map((q, qIndex) => (
                <div
                  key={qIndex}
                  className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-quiz-purple font-bold text-lg">
                      Question {qIndex + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => deleteQuestion(qIndex)}
                      className="flex items-center gap-1 text-rose-400 hover:text-rose-600 transition-colors group"
                    >
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                      <span className="text-xs font-bold uppercase hidden group-hover:block">
                        Delete
                      </span>
                    </button>
                  </div>

                  <input
                    className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none hover:border-slate-400"
                    placeholder="Enter question"
                    value={q.questionText}
                    onChange={(e) => {
                      const updatedQuestions = selectedQuiz.questions.map(
                        (item, i) =>
                          i === qIndex
                            ? { ...item, questionText: e.target.value }
                            : item,
                      );
                      setSelectedQuiz({
                        ...selectedQuiz,
                        questions: updatedQuestions,
                      });
                    }}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {q.options.map((opt, oIndex) => (
                      <div
                        key={oIndex}
                        className={`flex items-center gap-3 focus-within:ring-1 border p-3 rounded-xl transition-colors ${
                          q.correctAnswer === opt && opt !== ""
                            ? "bg-emerald-50 border-emerald-300"
                            : "border-slate-200 hover:border-slate-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={q.correctAnswer === opt}
                          disabled={opt === ""}
                          onChange={() => {
                            const updatedQuestions = selectedQuiz.questions.map(
                              (item, i) =>
                                i === qIndex
                                  ? { ...item, correctAnswer: opt }
                                  : item,
                            );
                            setSelectedQuiz({
                              ...selectedQuiz,
                              questions: updatedQuestions,
                            });
                          }}
                          required
                        />
                        <input
                          className="bg-transparent outline-none text-sm w-full"
                          placeholder={`Option ${oIndex + 1}`}
                          value={opt}
                          onChange={(e) => {
                            const updatedQuestions = selectedQuiz.questions.map(
                              (item, i) => {
                                if (i === qIndex) {
                                  const newOptions = [...item.options];
                                  const oldOptionValue = newOptions[oIndex];
                                  newOptions[oIndex] = e.target.value;

                                  const newQuestion = {
                                    ...item,
                                    options: newOptions,
                                  };
                                  if (
                                    item.correctAnswer === oldOptionValue ||
                                    item.correctAnswer === ""
                                  ) {
                                    // If we edited the correct answer, update the correct answer field too
                                    // Or if no correct answer was set yet (rare but possible)
                                    if (item.correctAnswer === oldOptionValue) {
                                      newQuestion.correctAnswer =
                                        e.target.value;
                                    }
                                  }
                                  return newQuestion;
                                }
                                return item;
                              },
                            );
                            setSelectedQuiz({
                              ...selectedQuiz,
                              questions: updatedQuestions,
                            });
                          }}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={addQuestionField}
                  className="px-6 py-3 rounded-xl border border-primary text-primary font-bold hover:bg-primary/10 transition"
                >
                  + Add Question
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary px-6 py-3 rounded-xl text-white font-bold hover:brightness-110 transition shadow-lg shadow-primary/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.length === 0 ? (
                <div className="col-span-full text-center py-12 text-slate-400">
                  <span className="material-symbols-outlined text-4xl mb-2">
                    quiz
                  </span>
                  <p>No quizzes found. Add one to get started!</p>
                </div>
              ) : (
                quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    onClick={() => setSelectedQuiz(quiz)}
                    className="cursor-pointer bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all group relative"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center overflow-hidden">
                        {quiz.imageUrl ? (
                          <img
                            src={quiz.imageUrl}
                            className="w-full h-full object-cover"
                            alt="Quiz Logo"
                          />
                        ) : (
                          <span className="material-symbols-outlined text-quiz-purple">
                            quiz
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={(e) => handleDeleteQuiz(e, quiz.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors z-10 relative"
                          title="Delete Quiz"
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                    <h3 className="font-bold text-navy text-lg mb-2">
                      {quiz.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 h-10">
                      {quiz.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span>{quiz.questions?.length || 0} Questions</span>
                      <div
                        className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full font-bold ${
                          quiz.active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            quiz.active ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                        ></div>
                        <span>{quiz.active ? "Active" : "Inactive"}</span>
                        <button
                          onClick={(e) => handleToggleActive(e, quiz)}
                          className={`p-1 rounded-full transition-colors z-10 relative ${
                            quiz.active
                              ? "text-emerald-500 hover:bg-emerald-50"
                              : "text-slate-400 hover:bg-slate-100"
                          }`}
                          title={
                            quiz.active ? "Deactivate Quiz" : "Activate Quiz"
                          }
                        >
                          <span
                            className="material-symbols-outlined text-3xl"
                            style={{ fontSize: "40px" }}
                          >
                            {quiz.active ? "toggle_on" : "toggle_off"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditQuiz;
