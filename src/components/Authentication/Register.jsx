import React, { useState } from "react";
import { auth, db } from "../../firebase"; // Ensure db is exported from your firebase.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Basic Validation
    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }
    if (password.length < 6) {
      return setError("Password should be at least 6 characters.");
    }

    try {
      // 2. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: fullName,
      });
      // 3. Save extra info (Full Name) to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: fullName,
        email: email,
        createdAt: new Date(),
        highScore: 0,
      });

      console.log("Registered:", user.email);
      navigate("/"); // Redirect to home
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else {
        setError("Failed to create account. Try again.");
      }
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
        <div className="main-card bg-white rounded-2xl p-8 md:p-10 border shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-slate-800 leading-tight tracking-tight mb-4">
              Create Account
            </h1>
            <p className="text-slate-500 text-base max-w-[280px] mx-auto leading-relaxed">
              Join our community of learners today.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-xl">
                    person_outline
                  </span>
                </div>
                <input
                  className="w-full bg-ghost-white border border-border-gray rounded-xl py-4 pl-12 pr-4 text-navy focus:outline-none focus:ring-2 focus:ring-quiz-purple/20 focus:border-quiz-purple transition-all"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-xl">
                    email
                  </span>
                </div>
                <input
                  className="w-full bg-ghost-white border border-border-gray rounded-xl py-4 pl-12 pr-4 text-navy focus:outline-none focus:ring-2 focus:ring-quiz-purple/20 focus:border-quiz-purple transition-all"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-xl">
                    lock
                  </span>
                </div>
                <input
                  className="w-full bg-ghost-white border border-border-gray rounded-xl py-4 pl-12 pr-12 text-navy focus:outline-none focus:ring-2 focus:ring-quiz-purple/20 focus:border-quiz-purple transition-all"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 text-slate-400">
                  <span className="material-symbols-outlined text-xl">
                    {showPass ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-xl">
                    fingerprint
                  </span>
                </div>
                <input
                  className="w-full bg-ghost-white border border-border-gray rounded-xl py-4 pl-12 pr-12 text-navy focus:outline-none focus:ring-2 focus:ring-quiz-purple/20 focus:border-quiz-purple transition-all"
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-4 text-slate-400">
                  <span className="material-symbols-outlined text-xl">
                    {showConfirmPass ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            <button
              className="w-full bg-quiz-purple hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
              type="submit">
              <span>Sign Up</span>
              <span className="material-symbols-outlined text-lg">
                app_registration
              </span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Already have an account?
              <Link
                className="text-quiz-purple font-semibold hover:underline ml-1"
                to="/login">
                Login
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

export default Register;
