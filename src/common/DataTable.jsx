import React, { useState } from "react";

const DataTable = ({ columns, data }) => {
  const [sortConfig, setSortConfig] = useState([]);
  const [designState, setDesignState] = useState({});
  const [columnFilters, setColumnFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [globalSearch, setGlobalSearch] = useState("");

  const [selectedFormat, setSelectedFormat] = useState(() => {
    const dateCol = columns.find(
      (c) => c.dateFormat && Array.isArray(c.dateFormat.formats),
    );
    return dateCol ? dateCol.dateFormat.formats[0] : "none";
  });
  const handleGlobalSearchChange = (value) => {
    setGlobalSearch(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setColumnFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSortChange = (key, direction) => {
    setSortConfig((prev) => {
      const newSort =
        direction === "none"
          ? prev.filter((s) => s.key !== key)
          : prev.find((s) => s.key === key)
            ? prev.map((s) => (s.key === key ? { key, direction } : s))
            : [...prev, { key, direction }];
      return newSort;
    });
    setCurrentPage(1);
  };

  const handleDesignChange = (colKey, property, value) => {
    setDesignState((prev) => ({
      ...prev,
      [colKey]: { ...prev[colKey], [property]: value },
    }));
  };

  const formatTableDate = (dateInput, formatStr) => {
    if (!dateInput || !formatStr || formatStr === "none") return dateInput;
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return dateInput;
    const opt = (o) => new Intl.DateTimeFormat("en-US", o).format(date);
    const formats = {
      yyyy: date.getFullYear(),
      MMMM: opt({ month: "long" }),
      MMM: opt({ month: "short" }),
      MM: String(date.getMonth() + 1).padStart(2, "0"),
      DD: String(date.getDate()).padStart(2, "0"),
      ddd: opt({ weekday: "short" }),
      HH: String(date.getHours()).padStart(2, "0"),
      mm: String(date.getMinutes()).padStart(2, "0"),
      A: date.getHours() >= 12 ? "PM" : "AM",
    };
    let result = formatStr;
    Object.keys(formats)
      .sort((a, b) => b.length - a.length)
      .forEach((token) => {
        result = result.replace(token, formats[token]);
      });
    return result;
  };

  const filteredData = data.filter((item) => {
    // 1. Check Global Search across all keys
    const matchesGlobal =
      globalSearch === "" ||
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(globalSearch.toLowerCase()),
      );

    // 2. Check individual column filters
    const matchesColumnFilters = Object.entries(columnFilters).every(
      ([key, filterValue]) => {
        if (!filterValue) return true;
        const itemValue = item[key];
        if (itemValue == null) return false;
        return String(itemValue)
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      },
    );

    return matchesGlobal && matchesColumnFilters;
  });

  // const filteredData = data.filter((item) => {
  //   return Object.entries(columnFilters).every(([key, filterValue]) => {
  //     if (!filterValue) return true;
  //     const itemValue = item[key];
  //     if (itemValue == null) return false;
  //     return String(itemValue)
  //       .toLowerCase()
  //       .includes(filterValue.toLowerCase());
  //   });
  // });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.length === 0) return (b.id || 0) - (a.id || 0);
    for (const { key, direction } of sortConfig) {
      let valA = a[key],
        valB = b[key];
      let comparison = String(valA).localeCompare(String(valB), undefined, {
        numeric: true,
      });
      if (comparison !== 0)
        return direction === "asc" ? comparison : -comparison;
    }
    return 0;
  });

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const getColumnStyle = (col) => {
    if (!col.design) return {};
    const userSelection = designState[col.key] || {};
    return {
      textAlign:
        userSelection.align ||
        (Array.isArray(col.design.align) ? col.design.align[0] : "left"),
      color:
        userSelection.textColorStyle ||
        (Array.isArray(col.design.textColorStyle)
          ? col.design.textColorStyle[0]
          : "inherit"),
      fontFamily:
        userSelection.textFontStyle ||
        (Array.isArray(col.design.textFontStyle)
          ? col.design.textFontStyle[0]
          : "inherit"),
      fontSize: `${userSelection.textSize || 14}px`,
    };
  };

  return (
    <div className="w-full overflow-hidden rounded-xl md:rounded-3xl border border-slate-100 bg-white shadow-sm flex flex-col">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th
                // colSpan={5}
                colSpan={columns.length}
                className="p-0 border-b border-slate-100 bg-slate-50/30"
              >
                <div className="flex items-center gap-4 w-full px-6 py-4">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-quiz-purple/20 transition-all"
                      placeholder="Search all records..."
                      value={globalSearch}
                      onChange={(e) => handleGlobalSearchChange(e.target.value)}
                    />
                  </div>
                  <div className="hidden sm:block text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Results: {filteredData.length}
                  </div>
                </div>
              </th>
            </tr>

            <tr className="bg-slate-50/80 border-b border-slate-100">
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-5 align-top">
                  <div className="flex flex-col gap-2">
                    {col.searchFilter && (
                      <input
                        className="w-full px-3 py-2 text-sm bg-white text-slate-500  border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-quiz-purple/20"
                        placeholder="Find..."
                        value={columnFilters[col.key] || ""}
                        onChange={(e) =>
                          handleFilterChange(col.key, e.target.value)
                        }
                      />
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {col.sort && (
                        <select
                          className="appearance-none text-[13px] py-2 pl-3 pr-8 bg-white border border-slate-200 rounded-xl outline-none text-slate-500 
             bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] 
             bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                          value={
                            sortConfig.find((s) => s.key === col.key)
                              ?.direction || "none"
                          }
                          onChange={(e) =>
                            handleSortChange(col.key, e.target.value)
                          }
                        >
                          <option value="none">SORT</option>
                          <option value="asc">ASC</option>
                          <option value="desc">DESC</option>
                        </select>
                      )}
                      {col.dateFormat && (
                        <select
                          className="appearance-none text-[13px] py-2 pl-3 pr-8 bg-white border border-slate-200 rounded-xl outline-none text-slate-500 
             bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] 
             bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                          onChange={(e) => setSelectedFormat(e.target.value)}
                        >
                          {col.dateFormat.formats.map((f) => (
                            <option key={f} value={f}>
                              {f}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    {col.design && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Object.keys(col.design).map((prop) => (
                          <select
                            key={prop}
                            className="text-[9px] bg-slate-100 rounded px-1 py-0.5 outline-none"
                            onChange={(e) =>
                              handleDesignChange(col.key, prop, e.target.value)
                            }
                          >
                            {col.design[prop].map((opt) => (
                              <option key={opt} value={opt}>
                                {prop}: {opt}
                              </option>
                            ))}
                          </select>
                        ))}
                      </div>
                    )}
                    <span className="text-[12px] text-slate-600 py-2 px-1 font-bold uppercase tracking-widest text-slate-400">
                      {col.header}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedData.map((item, rIdx) => (
              <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
                {columns.map((col, cIdx) => (
                  <td
                    key={cIdx}
                    className="px-6 py-4"
                    style={getColumnStyle(col)}
                  >
                    {col.render
                      ? col.render(item, rIdx)
                      : col.date
                        ? formatTableDate(item[col.key], selectedFormat)
                        : item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-slate-100">
        {paginatedData.map((item, rIdx) => (
          <div key={rIdx} className="p-5 space-y-4">
            {columns.map((col, cIdx) => (
              <div
                key={cIdx}
                className="flex justify-between items-start gap-4"
              >
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                  {col.header}
                </span>
                <div className="text-right" style={getColumnStyle(col)}>
                  {col.render ? col.render(item, rIdx) : item[col.key]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}
        </div>

        <div className="flex items-center gap-3">
          <select
            className="appearance-none text-[13px] py-2 pl-3 pr-8 bg-white border border-slate-200 rounded-xl outline-none text-slate-500 
             bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] 
             bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 20].map((v) => (
              <option key={v} value={v}>
                {v} / page
              </option>
            ))}
          </select>

          <div className="flex border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 disabled:opacity-20 hover:bg-slate-50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="px-4 py-2 text-xs font-black border-x border-slate-100 text-quiz-purple">
              {currentPage}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 disabled:opacity-20 hover:bg-slate-50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {paginatedData.length === 0 && (
        <div className="py-12 text-center text-slate-400 text-sm">
          No results found.
        </div>
      )}
    </div>
  );
};

export default DataTable;
