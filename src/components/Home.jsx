import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import ResultView from "../views/ResultView";
import QuizView from "../views/QuizView";
import SelectQuiz from "./SelectQuiz";
import landingPageImg from "/assets/images/Completed steps.gif";

function Home() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().displayName);
        }
      }
    });
    return () => unsubscribe();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userName.trim()) return alert("Please enter your name!");
    navigate("SelectQuiz", { state: { userName } });
  };

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <div className="bg-background-light text-navy antialiased">
                <main>
                  <section className="relative overflow-hidden py-10 lg:py-15">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
                      <div className="flex-1 text-center lg:text-left z-10">
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full mb-6">
                          <span className="text-xs font-bold uppercase tracking-wider">
                            New Features Available
                          </span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-navy leading-[1.1] mb-8 tracking-tight">
                          Master Any Subject{" "}
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Through Quizzes
                          </span>
                        </h1>
                        <p className="text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
                          Track your progress in real-time, earn exclusive
                          digital badges, and master complex academic or
                          professional topics with our intelligent adaptive quiz
                          engine.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center  gap-4">
                          {user ? (
                            <div className="space-y-4">
                              <h3 className="text-navy font-bold text-xl">
                                Ready to beat your high score, {userName}?
                              </h3>
                              <button
                                onClick={handleSubmit}
                                className="inline-flex items-center gap-2 bg-quiz-purple hover:bg-quiz-purple/90 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-quiz-purple/20 transition-all active:scale-95 text-lg">
                                <span>Start Quiz Now</span>
                                <span className="material-symbols-outlined">
                                  play_circle
                                </span>
                              </button>
                            </div>
                          ) : (
                            <>
                              <Link
                                to="/register"
                                className="bg-quiz-purple hover:bg-quiz-purple/90 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-quiz-purple/20 transition-all active:scale-95 text-lg">
                                Get Started for Free
                              </Link>
                              <Link
                                to="/login"
                                className="bg-white border-2 border-border-gray hover:border-quiz-purple text-navy font-bold py-4 px-10 rounded-2xl transition-all active:scale-95 text-lg">
                                Sign In
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 relative w-full max-w-[600px] aspect-square">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[3rem] rotate-3 blur-2xl"></div>
                        <div className="relative w-full h-full bg-white rounded-[2.5rem] border border-border-gray shadow-2xl overflow-hidden p-4">
                          <div className="w-full h-full bg-slate-50 rounded-[1.5rem] overflow-hidden">
                            <img
                              alt="Dashboard Preview"
                              className="w-full h-full object-cover opacity-90"
                              data-alt="Modern quiz dashboard interface showing progress metrics"
                              src={landingPageImg}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
                  </section>

                  <section className="py-24 bg-white border-y border-border-gray">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                      <div className="text-center mb-16">
                        <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
                          Why Choose Us
                        </h2>
                        <h3 className="text-3xl lg:text-4xl font-extrabold text-navy">
                          Engineered for Effective Learning
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl border border-border-gray bg-ghost hover:border-primary/40 hover:shadow-xl transition-all group">
                          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white">
                              schedule
                            </span>
                          </div>
                          <h4 className="text-xl font-bold text-navy mb-4">
                            Timed Challenges
                          </h4>
                          <p className="text-slate-500 leading-relaxed">
                            Boost your recall speed and accuracy under pressure
                            with our customizable time-trial modules designed
                            for exam prep.
                          </p>
                        </div>

                        <div className="p-8 rounded-2xl border border-border-gray bg-ghost hover:border-primary/40 hover:shadow-xl transition-all group">
                          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-3xl text-secondary group-hover:text-white">
                              leaderboard
                            </span>
                          </div>
                          <h4 className="text-xl font-bold text-navy mb-4">
                            Global Ranking
                          </h4>
                          <p className="text-slate-500 leading-relaxed">
                            Join a vibrant community of learners. Compete on
                            global leaderboards and measure your expertise
                            against top performers.
                          </p>
                        </div>

                        <div className="p-8 rounded-2xl border border-border-gray bg-ghost hover:border-primary/40 hover:shadow-xl transition-all group">
                          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white">
                              psychology
                            </span>
                          </div>
                          <h4 className="text-xl font-bold text-navy mb-4">
                            Adaptive Learning
                          </h4>
                          <p className="text-slate-500 leading-relaxed">
                            Our AI analyzes your performance to dynamically
                            adjust question difficulty, focusing on your
                            specific knowledge gaps.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="py-24 bg-ghost">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                      <div className="text-center mb-20">
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-6">
                          Master Your Goals in 3 Simple Steps
                        </h2>
                        <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
                      </div>
                      <div className="flex flex-col lg:flex-row justify-between gap-12 relative">
                        <div className="flex-1 flex flex-col items-center text-center z-10">
                          <div className="w-20 h-20 rounded-full bg-white border-4 border-border-gray flex items-center justify-center mb-6 relative shadow-md">
                            <span className="material-symbols-outlined text-4xl text-primary">
                              person_add
                            </span>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">
                              1
                            </div>
                          </div>
                          <h4 className="text-xl font-bold text-navy mb-3">
                            Create Account
                          </h4>
                          <p className="text-slate-500">
                            Sign up in seconds and personalize your learning
                            dashboard to track your unique journey.
                          </p>
                        </div>

                        <div className="hidden lg:block absolute top-10 left-[25%] right-[25%] h-0.5 border-t-2 border-dashed border-border-gray"></div>

                        <div className="flex-1 flex flex-col items-center text-center z-10">
                          <div className="w-20 h-20 rounded-full bg-white border-4 border-border-gray flex items-center justify-center mb-6 relative shadow-md">
                            <span className="material-symbols-outlined text-4xl text-secondary">
                              explore
                            </span>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">
                              2
                            </div>
                          </div>
                          <h4 className="text-xl font-bold text-navy mb-3">
                            Choose Topic
                          </h4>
                          <p className="text-slate-500">
                            Select from thousands of curated topics ranging from
                            programming to history or medical science.
                          </p>
                        </div>

                        <div className="flex-1 flex flex-col items-center text-center z-10">
                          <div className="w-20 h-20 rounded-full bg-white border-4 border-border-gray flex items-center justify-center mb-6 relative shadow-md">
                            <span className="material-symbols-outlined text-4xl text-primary">
                              rocket_launch
                            </span>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">
                              3
                            </div>
                          </div>
                          <h4 className="text-xl font-bold text-navy mb-3">
                            Start Learning
                          </h4>
                          <p className="text-slate-500">
                            Take interactive quizzes, review explanations, and
                            watch your mastery scores soar with every attempt.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="py-24 px-6 lg:px-12">
                    <div className="max-w-6xl mx-auto rounded-[3rem] bg-navy p-12 lg:p-24 relative overflow-hidden shadow-2xl">
                      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl"></div>
                      <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary opacity-20 rounded-full blur-3xl"></div>
                      <div className="relative z-10 text-center flex flex-col items-center max-w-2xl mx-auto">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-8 leading-tight">
                          Join Over 10,000+ Active Learners
                        </h2>
                        <p className="text-slate-300 text-lg mb-10 leading-relaxed font-light">
                          Don't just study—master it. Join the fastest growing
                          community of knowledge seekers today and unlock your
                          potential.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                          <button className="px-10 py-5 bg-white text-navy font-bold rounded-2xl hover:bg-slate-50 transition-all text-lg shadow-xl">
                            Get Started Now
                          </button>
                          <button className="px-10 py-5 bg-navy border border-slate-700 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all text-lg">
                            Contact Sales
                          </button>
                        </div>
                        <div className="mt-12 flex items-center gap-4 text-slate-400">
                          <div className="flex -space-x-3">
                            <img
                              alt="User 1"
                              className="w-10 h-10 rounded-full border-2 border-navy"
                              data-alt="Profile picture of a professional user"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDzAD1uJIM1PxUmYXDQIl0CWpLpXmjNF4-J_KjBF7QU6snEuvFzPna2QZLl8rIEuKLQKal7sMoL_iEkQ3sIEq-8HGzO6XR_S0h1lU1zSEWYcaGwYWg1vB6P5SWDjynixdutOoh0VfjFDlqnNlQiDes18PFnzIoG6UOXlzekR4rRXjqzD0rW1wS9z_cS06N9DtWVhoF2SdW-SywRwpZ75S2Z092SmNLjMfhg1J6F-Ip-oib7CKpP61fanp0WL6wNhJglPWVk2TEPFaZ"
                            />
                            <img
                              alt="User 2"
                              className="w-10 h-10 rounded-full border-2 border-navy"
                              data-alt="Profile picture of a happy female user"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3yt-j-TDbJ6VBORCyBY3QjQcveIy2DhM34jFyyxx7-fCFPK3sBpNF_5pVpcC8_lIshun6eFct8B_qIyHGi8sWLg-EXwBOjqQP1DW4VqBStAFaebY3IciWzW7JXatepndBcJh6lX5HDUs9o0lLJ8gY0-4RwpACnnng1kbsDNHvoEY24hSvIK9HYkm_cJXBtDn65D3nftq5_Ka-ZTd8_LXZvKLcrT-9yDlK5_w5Ojql7sFSXyilpyPCv1YjqT73Wc6PLLazfxBZoFea"
                            />
                            <img
                              alt="User 3"
                              className="w-10 h-10 rounded-full border-2 border-navy"
                              data-alt="Profile picture of a smiling male user"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrLacs6lVedusnVGd1bNpT5AjYETCqiOXKZwcywPOW9QHsJ8eVmckdL4JiMQO9I_La_-minL-ql4gBmDTpEAu0_5KnYbVG_-R4yFOFpO6fXS-bCidw9WecWXOfPhu_h0lprITf5BXuLvmEXC_BQwmVRygC_PmB6e9W8C9SUL0xFFr7LWdtyCobgWJI-Y9edrYaS4VdjvJ6WtjTnBbMgD15aL1SGQQblImPwXP4l7ZDBiUQRPbOw2q0QAgWqJ3BFTLIzj10oJ8oia8k"
                            />
                            <div className="w-10 h-10 rounded-full border-2 border-navy bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                              +9k
                            </div>
                          </div>
                          <span className="text-sm">
                            Recently joined learners
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>
                </main>
              </div>
            </>
          }
        />
        <Route path="Login/*" element={<Login />} />
        <Route path="Register/*" element={<Register />} />
        <Route path="SelectQuiz/*" element={<SelectQuiz />} />
        <Route path="Quiz/:id/*" element={<QuizView />} />
        <Route path="Result" element={<ResultView />} />
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-border-gray shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-quiz-purple/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-quiz-purple">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h4 className="text-navy font-bold mb-2">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default Home;
