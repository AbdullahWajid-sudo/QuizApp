import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";

const AddQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category] = useState("General");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const navigate = useNavigate();

  const handleSaveQuiz = async (e) => {
    e.preventDefault();
    if (questions.length === 0) {
      alert("Please add at least one question!");
      return;
    }
    const isInvalid = questions.some(
      (q) => q.correctAnswer === "" || q.questionText === "",
    );
    if (isInvalid) {
      alert("Please select a correct answer for every question!");
      return;
    }

    try {
      const quizRef = collection(db, "quizzes");
      await addDoc(quizRef, {
        title,
        description,
        imageUrl,
        category,
        questions,
        createdAt: serverTimestamp(),
        plays: 0,
        active: true,
      });
      alert("Quiz successfully saved to Firestore!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding quiz: ", error);
      alert("Failed to save quiz.");
    }
  };

  const addQuestionField = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const deleteQuestion = (indexToDelete) => {
    // Filter out the question at the specific index
    const updatedQuestions = questions.filter(
      (_, index) => index !== indexToDelete,
    );
    setQuestions(updatedQuestions);
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
              Add Quiz
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
          <h1 className="text-3xl font-bold mb-6 text-primary">
            Create New Quiz
          </h1>

          <form onSubmit={handleSaveQuiz} className="space-y-6 ">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Quiz Title
                </label>
                <input
                  className="w-full bg-white  border border-light border-slate-200 rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none hover:border-slate-400"
                  placeholder="e.g. JavaScript Pro"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Description
                </label>
                <textarea
                  className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none h-24 hover:border-slate-400"
                  placeholder="What is this quiz about?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Logo Image URL
                </label>
                <input
                  className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none hover:border-slate-400"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="mt-4 h-32 w-full object-cover rounded-lg border border-slate-200"
                  />
                )}
              </div>
            </div>
            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="bg-white p-6 rounded-2xl border border-slate-200  space-y-4 "
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
                    setQuestions((prevQuestions) =>
                      prevQuestions.map((q, i) =>
                        i === qIndex
                          ? { ...q, questionText: e.target.value }
                          : q,
                      ),
                    );
                  }}
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4   ">
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
                          setQuestions((prevQuestions) =>
                            prevQuestions.map((q, i) =>
                              i === qIndex ? { ...q, correctAnswer: opt } : q,
                            ),
                          );
                        }}
                        required
                      />
                      <input
                        className="bg-transparent  outline-none  text-sm w-full "
                        placeholder={`Option ${oIndex + 1}`}
                        value={opt}
                        onChange={(e) => {
                          setQuestions((prevQuestions) =>
                            prevQuestions.map((q, i) => {
                              if (i === qIndex) {
                                const newOptions = [...q.options];
                                const oldOptionValue = newOptions[oIndex];
                                newOptions[oIndex] = e.target.value;

                                const newQuestion = {
                                  ...q,
                                  options: newOptions,
                                };
                                if (q.correctAnswer === oldOptionValue) {
                                  newQuestion.correctAnswer = e.target.value;
                                }
                                return newQuestion;
                              }
                              return q;
                            }),
                          );
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
                Finalize & Save Quiz
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddQuiz;
