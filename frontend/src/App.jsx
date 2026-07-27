import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import Header from "./components/Header";
import MessageInput from "./components/MessageInput";
import PredictButton from "./components/PredictButton";
import ResultCard from "./components/ResultCard";
import HistoryCard from "./components/HistoryCard";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedHistory = localStorage.getItem("spam-history");

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleMessageChange = (value) => {
    setMessage(value);

    if (result) setResult(null);
    if (error) setError("");
  };

  const predictSpam = async () => {
    if (!message.trim()) {
      setError("Please enter a message before analyzing.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/predict`,
        {
          message,
        }
      );

      setResult(res.data);

      const newItem = {
        message,
        prediction: res.data.prediction,
        confidence: res.data.confidence,
        time: new Date().toLocaleString(),
      };

      const updatedHistory = [newItem, ...history];

      setHistory(updatedHistory);

      localStorage.setItem(
        "spam-history",
        JSON.stringify(updatedHistory)
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to the backend. Make sure the FastAPI server is running."
      );
    }

    setLoading(false);
  };

  const deleteHistoryItem = (index) => {
    const updated = history.filter((_, i) => i !== index);

    setHistory(updated);

    localStorage.setItem(
      "spam-history",
      JSON.stringify(updated)
    );
  };

  const clearHistory = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to clear all prediction history?"
    );

    if (!confirmDelete) return;

    localStorage.removeItem("spam-history");
    setHistory([]);
  };

  const exportCSV = () => {
    if (history.length === 0) {
      setError("No prediction history available to export.");
      return;
    }

    const headers = [
      "Time",
      "Prediction",
      "Confidence",
      "Message",
    ];

    const rows = history.map((item) => [
      item.time,
      item.prediction,
      item.confidence + "%",
      item.message.replace(/"/g, '""'),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((value) => `"${value}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "prediction_history.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-5 py-10">

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-10"
      >

        <Header />

        <MessageInput
          message={message}
          setMessage={handleMessageChange}
          loading={loading}
        />

        <PredictButton
          loading={loading}
          predictSpam={predictSpam}
        />

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4">
            <h3 className="font-semibold text-red-400">
              Error
            </h3>

            <p className="text-red-200 mt-1">
              {error}
            </p>
          </div>
        )}

        <ResultCard
          result={result}
        />

        <HistoryCard
          history={history}
          clearHistory={clearHistory}
          deleteHistoryItem={deleteHistoryItem}
          exportCSV={exportCSV}
        />

        <p className="text-center text-slate-500 text-sm mt-10">
          Powered by FastAPI • React • Scikit-learn • Tailwind CSS
        </p>

      </motion.div>

    </div>
  );
}

export default App;