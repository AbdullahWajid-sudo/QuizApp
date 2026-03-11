import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import ResultView from "../views/ResultView";
import QuizView from "../views/QuizView";
import SelectQuiz from "./SelectQuiz";
import landingPageImg from "../../public/assets/images/Completed steps.gif";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";

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

                {/* <footer className="bg-white border-t border-border-gray pt-20 pb-10">
                  <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    <div className="col-span-2">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="bg-primary p-1 rounded-lg">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                              fill="currentColor"></path>
                          </svg>
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-navy">
                          QuizApp
                        </span>
                      </div>
                      <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
                        The premier destination for interactive learning and
                        knowledge mastery. Helping students and professionals
                        achieve their goals.
                      </p>
                      <div className="flex gap-4">
                        <a
                          className="w-10 h-10 rounded-full border border-border-gray flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all"
                          href="#">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                          </svg>
                        </a>
                        <a
                          className="w-10 h-10 rounded-full border border-border-gray flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all"
                          href="#">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-extrabold text-navy uppercase tracking-wider mb-6">
                        Product
                      </h5>
                      <ul className="space-y-4">
                        <li>
                          <a
                            className="text-slate-500 hover:text-primary transition-colors text-sm"
                            href="#">
                            Course Library
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-slate-500 hover:text-primary transition-colors text-sm"
                            href="#">
                            Enterprise
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-slate-500 hover:text-primary transition-colors text-sm"
                            href="#">
                            Quiz Builder
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-slate-500 hover:text-primary transition-colors text-sm"
                            href="#">
                            Pricing
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-extrabold text-navy uppercase tracking-wider mb-6">
                        Company
                      </h5>
                      <ul className="space-y-4">
                        <li>
                          <a
                            className="text-slate-500 hover:text-primary transition-colors text-sm"
                            href="#">
                            About Us
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-slate-500 hover:text-primary transition-colors text-sm"
                            href="#">
                            Careers
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-slate-500 hover:text-primary transition-colors text-sm"
                            href="#">
                            Blog
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-slate-500 hover:text-primary transition-colors text-sm"
                            href="#">
                            Contact
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-extrabold text-navy uppercase tracking-wider mb-6">
                        Legal
                      </h5>
                      <ul className="space-y-4">
                        <li>
                          <a
                            className="text-slate-500 hover:text-primary transition-colors text-sm"
                            href="#">
                            Privacy Policy
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-slate-500 hover:text-primary transition-colors text-sm"
                            href="#">
                            Terms of Service
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-slate-500 hover:text-primary transition-colors text-sm"
                            href="#">
                            Cookie Policy
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="max-w-7xl mx-auto px-6 lg:px-12 border-t border-border-gray pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                      © 2024 QuizApp Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          language
                        </span>
                        English (US)
                      </span>
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          verified_user
                        </span>
                        SSO Enabled
                      </span>
                    </div>
                  </div>
                </footer> */}
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
