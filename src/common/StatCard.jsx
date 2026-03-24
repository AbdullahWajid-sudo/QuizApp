import React from "react";

const StatCard = ({ title, value, icon, trend, highlight }) => (
  <div
    className={`${highlight ? "bg-primary text-white" : "bg-white border-navy/10 border-outline"} rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow`}
  >
    <div className="flex justify-between items-start">
      <div
        className={`p-2 rounded-lg ${highlight ? "bg-white/20 text-white" : "bg-primary-container text-primary"}`}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      {trend && (
        <span className="text-emerald-500 text-xs font-bold">{trend}</span>
      )}
    </div>
    <div className="mt-4">
      <p className="text-4xl font-bold">{value}</p>
      <p
        className={`${highlight ? "text-white/80" : "text-on-surface-variant"} text-sm font-medium`}
      >
        {title}
      </p>
    </div>
  </div>
);

export default StatCard;
