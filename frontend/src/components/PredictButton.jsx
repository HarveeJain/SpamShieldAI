import { Sparkles } from "lucide-react";

function PredictButton({ loading, predictSpam }) {
  return (
    <button
      onClick={predictSpam}
      disabled={loading}
      className="mt-7 w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-2xl py-4 text-lg font-semibold text-white flex justify-center items-center gap-3 disabled:opacity-60"
    >
      <Sparkles size={22} />

      {loading ? "Analyzing..." : "Analyze Message"}
    </button>
  );
}

export default PredictButton;