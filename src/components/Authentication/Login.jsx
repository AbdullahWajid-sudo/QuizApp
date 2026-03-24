import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, } from "../../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log("Login Success!", user.email);
      if (email === "admin@quizapp.com") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login Error:", err.code);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="bg-ghost-white flex-1 min-h-screen flex flex-col items-center font-display justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-2">
          <div className="inline-block px-3 py-1 rounded-full bg-quiz-purple/10 text-quiz-purple text-[10px] font-bold uppercase tracking-widest mb-4">
            Join 10,000+ Learners
          </div>
        </div>
        <div className="main-card rounded-2xl border shadow-sm p-8 md:p-10 bg-white">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-slate-800 leading-tight tracking-tight mb-4">
              Welcome
            </h1>
            <p className="text-slate-500 text-base max-w-[280px] mx-auto leading-relaxed">
              Please enter your details to sign in
            </p>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label
                className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-xl">
                    email
                  </span>
                </div>
                <input
                  className="w-full bg-ghost-white border border-border-gray rounded-xl py-4 pl-12 pr-4 text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-quiz-purple/20 focus:border-quiz-purple transition-all text-base"
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label
                  className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  className="text-quiz-purple text-xs font-medium hover:underline"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-xl">
                    lock_person
                  </span>
                </div>
                <input
                  className="w-full bg-ghost-white border border-border-gray rounded-xl py-4 pl-12 pr-12 text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-quiz-purple/20 focus:border-quiz-purple transition-all text-base"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="w-4 h-4 rounded border-border-gray text-quiz-purple focus:ring-quiz-purple"
                id="remember"
                type="checkbox"
              />
              <label className="text-sm text-slate-600" htmlFor="remember">
                Keep me logged in
              </label>
            </div>
            <div className="pt-2">
              <button
                className="w-full bg-quiz-purple hover:bg-quiz-purple/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-quiz-purple/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                type="submit"
              >
                <span>Login</span>
                <span className="material-symbols-outlined text-lg">login</span>
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-border-gray text-center">
            <p className="text-slate-600 text-sm">
              Don't have an account?
              <Link
                className="text-quiz-purple font-bold hover:underline ml-1"
                to="/register"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-8 mb-4 sm:flex sm:items-center sm:justify-center sm:gap-6 text-slate-400">
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">verified</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              Certified Content
            </span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-border-gray"></div>
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">timer</span>
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
    </div>
  );
};

export default Login;
