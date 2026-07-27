import { Trash2, Download, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function HistoryCard({
  history,
  clearHistory,
  deleteHistoryItem,
  exportCSV,
}) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (history.length === 0) return null;

  return (
    <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-white">
          Prediction History
        </h2>

        <div className="flex gap-3">

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
          >
            <Download size={18} />
            Export
          </button>

          <button
            onClick={clearHistory}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
          >
            Clear All
          </button>

        </div>

      </div>

      <div className="space-y-4">

        {history.map((item, index) => {

          const expanded = expandedIndex === index;

          return (

            <div
              key={index}
              className="bg-slate-900 border border-slate-700 rounded-xl p-4"
            >

              <div className="flex justify-between items-start">

                <div>

                  <span
                    className={`font-bold text-lg ${
                      item.prediction === "Spam"
                        ? "text-red-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {item.prediction === "Spam"
                      ? "🚨 Spam"
                      : "✅ Safe"}
                  </span>

                  <p className="text-slate-400 text-sm mt-1">
                    Confidence: {item.confidence}%
                  </p>

                </div>

                <button
                  onClick={() => deleteHistoryItem(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>

              </div>

              <p className="text-slate-300 mt-4">

                {expanded
                  ? item.message
                  : item.message.length > 100
                  ? item.message.substring(0, 100) + "..."
                  : item.message}

              </p>

              {item.message.length > 100 && (

                <button
                  className="mt-3 text-blue-400 flex items-center gap-2"
                  onClick={() =>
                    setExpandedIndex(expanded ? null : index)
                  }
                >
                  {expanded ? (
                    <>
                      <EyeOff size={16} />
                      Show Less
                    </>
                  ) : (
                    <>
                      <Eye size={16} />
                      View Full
                    </>
                  )}
                </button>

              )}

              <p className="text-xs text-slate-500 mt-3">
                {item.time}
              </p>

            </div>

          );
        })}

      </div>

    </div>
  );
}

export default HistoryCard;