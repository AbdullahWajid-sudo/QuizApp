import { React, useState, useEffect } from "react";
import { getHistoryData } from "../models/HistoryModel";
// import { HistoryModel } from "../models/HistoryModel";

export function useHistoryViewModel() {
  // const [history] = useState(() => HistoryModel());
  const [history, setHistory] = useState({});
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
      setHistory(data);
    };
    loadData();
  }, []);

  const quizTitles = Object.keys(history);
  const allData =
    selectedTitle === "All"
      ? Object.values(history).flat()
      : history[selectedTitle] || [];

  const AnswerHandler = (item) => {
    setSelectedItem(item);
    setIsVisibleResult(!isVisibleResult);
  };
  const backHandler = () => {
    setSelectedItem(null);
    setIsVisibleResult(!isVisibleResult);
  };

  const filteredData = allData.filter((item) => {
    if (!item || !item.userName) return false;

    const matchesName = item.userName
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchTime = new Date(item.id || item.date).getTime();
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
      quizTitles,
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
