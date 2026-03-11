import React from "react";

function Footer() {
  return (
    <footer className="py-6 text-slate-400  border-t border-border-gray bg-white mt-auto">
      <div className="max-w-5xl mx-auto text-[11px]  px-5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
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
  );
}

export default Footer;
