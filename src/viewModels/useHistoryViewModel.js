import { useState, useEffect } from "react";
import { getHistoryData } from "../models/HistoryModel";

export function useHistoryViewModel() {
  const [history, setHistory] = useState([]);
  const [searchName, setSearchName] = useState("");
  // --- NEW STATE ---
  const [searchAll, setSearchAll] = useState("");

  const [startDate, setStartDate] = useState(new Date(2026, 0, 1));
  const [endDate, setEndDate] = useState(new Date());
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVisibleResult, setIsVisibleResult] = useState(true);
  const [sortOrderUserName, setSortOrderUserName] = useState("");
  const [sortOrderScore, setSortOrderScore] = useState();

  useEffect(() => {
    const unsubscribe = getHistoryData((newData) =>
      setHistory(Array.isArray(newData) ? newData : []),
    );
    return unsubscribe;
  }, []);

  const quizTitles = [
    ...new Set(history.map((item) => item.title || item.quizName)),
  ];

  const allData =
    selectedTitle === "All"
      ? history
      : history.filter(
          (item) => (item.title || item.quizName) === selectedTitle,
        );

  const AnswerHandler = (item) => {
    setSelectedItem(item);
    setIsVisibleResult(!isVisibleResult);
  };

  const backHandler = () => {
    setSelectedItem(null);
    setIsVisibleResult(!isVisibleResult);
  };

  const filteredData = allData.filter((item) => {
    if (!item) return false;

    // 1. Name Filter (Specific)
    const matchesName = (item.userName || "")
      .toLowerCase()
      .includes(searchName.toLowerCase());

    // 2. Global Filter (Search All)
    const searchString = searchAll.toLowerCase();
    const matchesGlobal =
      (item.userName || "").toLowerCase().includes(searchString) ||
      (item.quizName || "").toLowerCase().includes(searchString) ||
      (item.score || "").toLowerCase().includes(searchString) ||
      (item.date || "").toLowerCase().includes(searchString);

    // 3. Date Filter
    const matchTime = item.timestamp?.seconds
      ? item.timestamp.seconds * 1000
      : new Date(item.date).getTime();

    const matchesDate =
      matchTime >= startDate.getTime() && matchTime <= endDate.getTime();

    // Combined Logic
    return matchesName && matchesGlobal && matchesDate;
  });

  return {
    state: {
      searchName,
      searchAll, // Added to state
      startDate,
      endDate,
      selectedTitle,
      selectedItem,
      isVisibleResult,
      sortOrderUserName,
      sortOrderScore,
      quizTitles,
      filteredData,
    },
    actions: {
      setSearchName,
      setSearchAll, // Added to actions
      setStartDate,
      setEndDate,
      setSelectedTitle,
      setSortOrderUserName,
      AnswerHandler,
      backHandler,
      setSortOrderScore,
    },
  };
}
