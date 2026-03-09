import React from "react";
import DataTable from "../common/DataTable";

function Answers(props) {
  const questions = props.que || [];
  const answers = props.ans || [];

  const tableData = questions.map((question, index) => {
    const uAns = answers[index] || "Not Answered";
    const cAns = question.answer;

    // Safely check for correctness
    const isCorrect = uAns?.toString().trim() === cAns?.toString().trim();

    return {
      id: question.id || index, // Fallback to index if no ID
      questionText: question.question || "No Question Text",
      correctAnswer: cAns || "N/A",
      userAnswer: uAns,
      isCorrect: isCorrect,
      trInlineStyle: {
        borderLeft: isCorrect ? "4px solid #34d399" : "4px solid #f87171",
      },
    };
  });

  const tableColumns = [
    {
      header: "#",
      render: (_, index) => (
        <span className="text-slate-400 font-bold">{index + 1}</span>
      ),
    },
    {
      header: "Question",
      key: "questionText",
      render: (item) => (
        <div className="max-w-md">
          <p className="text-navy font-semibold leading-tight">
            {item.questionText}
          </p>
        </div>
      ),
    },
    {
      header: "Correct Answer",
      key: "correctAnswer",
      render: (item) => (
        <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 text-xs">
          {item.correctAnswer}
        </span>
      ),
    },
    {
      header: "Your Answer",
      key: "userAnswer",
      render: (item) => (
        <div className="flex items-center gap-2">
          <span
            className={`font-bold text-xs px-3 py-1 rounded-lg border ${
              item.isCorrect
                ? "text-emerald-600 bg-emerald-50 border-emerald-100"
                : "text-rose-600 bg-rose-50 border-rose-100"
            }`}>
            {item.userAnswer}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
        <h4 className="text-lg font-black text-navy tracking-tight">
          Review Sheets
        </h4>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Correct
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Incorrect
            </span>
          </div>
        </div>
      </div>

      <div className="p-2">
        <DataTable columns={tableColumns} data={tableData} />
      </div>
    </div>
  );
}

export default Answers;
