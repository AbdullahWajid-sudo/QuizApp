import { useState, useEffect } from "react"; // Removed unnecessary React import
import { getHistoryData } from "../models/HistoryModel";

export function useHistoryViewModel() {
  // 1. Initialize as an ARRAY now, not an object
  const [history, setHistory] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState(new Date(2026, 0, 1));
  const [endDate, setEndDate] = useState(new Date());
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVisibleResult, setIsVisibleResult] = useState(true);
  const [sortOrderUserName, setSortOrderUserName] = useState("");
  const [sortOrderScore, setSortOrderScore] = useState();

  useEffect(() => {
    const loadData = async () => {
      const data = await getHistoryData();
      // Ensure we always set an array
      setHistory(Array.isArray(data) ? data : []);
    };
    loadData();
  }, []);

  // 2. Get unique titles from the "title" or "quizName" field inside the documents
  // This fixes the "0, 1, 2" button issue
  const quizTitles = [
    ...new Set(history.map((item) => item.title || item.quizName)),
  ];

  // 3. Simple filter logic for the selected subject
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

  // 4. Final filtration for Search and Date
  const filteredData = allData.filter((item) => {
    // Basic safety check to prevent "item.userName of undefined" crash
    if (!item || !item.userName) return false;

    const matchesName = item.userName
      .toLowerCase()
      .includes(searchName.toLowerCase());

    // Use the Firestore timestamp or the date string for the time comparison
    const matchTime = item.timestamp?.seconds
      ? item.timestamp.seconds * 1000
      : new Date(item.date).getTime();

    const matchesDate =
      matchTime >= startDate.getTime() && matchTime <= endDate.getTime();

    return matchesName && matchesDate;
  });

  return {
    state: {
      searchName,
      startDate,
      endDate,
      selectedTitle,
      selectedItem,
      isVisibleResult,
      sortOrderUserName,
      sortOrderScore,
      quizTitles, // Now contains ["Python", "C++", etc.]
      filteredData,
    },
    actions: {
      setSearchName,
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
