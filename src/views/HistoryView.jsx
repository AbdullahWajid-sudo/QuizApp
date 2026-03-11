import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "../common/DataTable";
import Answers from "../components/Answers";
import { useHistoryViewModel } from "../viewModels/useHistoryViewModel";

function HistoryView() {
  const { state, actions } = useHistoryViewModel();
  const tableColumns = [
    {
      header: "#",
      render: (_, index) => (
        <span className="text-slate-400 font-medium">{index + 1}</span>
      ),
    },
    {
      header: "Student",
      key: "userName",
      sort: true,
      searchFilter: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <span className="font-bold text-navy">{item.userName}</span>
        </div>
      ),
    },
    {
      header: "Quiz Title",
      key: "title",
      render: (item) => (
        <span className="text-slate-600 font-medium">{item.title}</span>
      ),
    },
    {
      header: "Performance",
      key: "score",
      sort: true,
      render: (item) => (
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 font-bold text-xs border border-emerald-100">
            {item.score}
          </span>
        </div>
      ),
    },
    {
      header: "Time",
      key: "timeTaken",
      render: (item) => (
        <div className="flex items-center gap-1 text-slate-500 text-xs">
          <span className="material-symbols-outlined text-sm">timer</span>
          {item.timeTaken}
        </div>
      ),
    },
    {
      header: "Attempted On",
      key: "date",
      date: true,
      sort: true,
      dateFormat: {
        formats: ["MMM DD, yyyy", "DD/MM/yyyy", "ddd, MMM DD"],
      },
    },
    {
      header: "Review",
      render: (item) => (
        <button
          className="flex items-center gap-1 px-4 py-2 bg-navy text-white hover:bg-quiz-purple rounded-xl font-bold text-[10px] tracking-widest transition-all shadow-sm active:scale-95"
          onClick={() => actions.AnswerHandler(item)}>
          DETAILS
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#F8FAFC] pb-32">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-quiz-purple/10 text-quiz-purple text-[10px] font-bold rounded-full tracking-widest uppercase">
                  Analytics
                </span>
              </div>
              <h2 className="text-4xl font-black text-navy tracking-tight">
                Attempt History
              </h2>
              <p className="text-slate-500 mt-1">
                Track student progress and review detailed answer sheets.
              </p>
            </div>

            {state.selectedItem && (
              <button
                onClick={() => actions.backHandler()}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-navy font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm group">
                <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
                  arrow_back
                </span>
                Return to List
              </button>
            )}
          </div>

          {state.isVisibleResult && !state.selectedItem && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-4 space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Live Search
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        search
                      </span>
                      <input
                        className="w-full pl-12 pr-4 py-4 bg-slate-100 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-quiz-purple/20 transition-all outline-none text-slate-500"
                        type="text"
                        value={state.searchName}
                        onChange={(e) => actions.setSearchName(e.target.value)}
                        placeholder="Student name..."
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-4 space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Date Range
                    </label>
                    <div className="flex items-center gap-2">
                      <DatePicker
                        className="w-full px-4 py-4 bg-slate-100 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-quiz-purple/20  outline-none text-slate-500"
                        selected={state.startDate}
                        onChange={(date) => actions.setStartDate(date)}
                        placeholderText="From"
                      />
                      <span className="text-slate-300">/</span>
                      <DatePicker
                        className="w-full px-4 py-4 bg-slate-100 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-quiz-purple/20  outline-none text-slate-500"
                        selected={state.endDate}
                        onChange={(date) => actions.setEndDate(date)}
                        placeholderText="To"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-4 space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Quiz Subject
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => actions.setSelectedTitle("All")}
                        className={`px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                          state.selectedTitle === "All"
                            ? "bg-quiz-purple text-white shadow-lg shadow-quiz-purple/20"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}>
                        All
                      </button>
                      {state.quizTitles.map((title) => (
                        <button
                          key={title}
                          onClick={() => actions.setSelectedTitle(title)}
                          className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all ${
                            state.selectedTitle === title
                              ? "bg-quiz-purple text-white shadow-lg shadow-quiz-purple/20"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}>
                          {title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <DataTable columns={tableColumns} data={state.filteredData} />
              </div>
            </div>
          )}
          {state.selectedItem && (
            <div className="animate-in slide-in-from-bottom-6 duration-500 space-y-6">
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 rounded-3xl bg-quiz-purple text-white flex items-center justify-center text-3xl shadow-xl shadow-quiz-purple/30">
                    {state.selectedItem.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-quiz-purple uppercase tracking-[0.2em]">
                      Detailed Report
                    </span>
                    <h3 className="text-3xl font-black text-navy">
                      {state.selectedItem.userName}
                    </h3>
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      Final Score
                    </span>
                    <div className="text-2xl font-black text-emerald-500">
                      {state.selectedItem.score}
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      Total Time
                    </span>
                    <div className="text-2xl font-black text-navy">
                      {state.selectedItem.timeTaken}
                    </div>
                  </div>
                </div>
              </div>
              <Answers
                ans={state.selectedItem.answers}
                que={state.selectedItem.questions}
              />
            </div>
          )}
        </div>
      </div>
     
    </>
  );
}

export default HistoryView;
