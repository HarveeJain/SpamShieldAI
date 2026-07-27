import { AlertTriangle, CheckCircle2, Shield } from "lucide-react";
import { motion } from "framer-motion";

function ResultCard({ result }) {

  if (!result) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 rounded-3xl border border-dashed border-slate-700 bg-slate-900/30 p-10 text-center"
      >
        <Shield
          size={52}
          className="mx-auto text-blue-400 mb-4"
        />

        <h2 className="text-2xl font-bold text-white">
          Ready to Analyze
        </h2>

        <p className="text-slate-400 mt-3">
          Paste an SMS message above and click
          <span className="text-blue-400 font-semibold">
            {" "}Analyze Message
          </span>
          {" "}to check whether it is spam.
        </p>

      </motion.div>
    );
  }

  const spam = result.prediction === "Spam";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`mt-8 rounded-3xl p-7 border ${
        spam
          ? "border-red-500 bg-red-500/10"
          : "border-emerald-500 bg-emerald-500/10"
      }`}
    >
      <div className="flex items-center gap-4">

        {spam ? (
          <AlertTriangle
            size={42}
            className="text-red-400"
          />
        ) : (
          <CheckCircle2
            size={42}
            className="text-emerald-400"
          />
        )}

        <div>

          <h2 className="text-2xl font-bold text-white">

            {spam
              ? "Potential Spam Detected"
              : "Message Appears Safe"}

          </h2>

          <p className="text-slate-300 mt-2">

            {spam
              ? "This message contains patterns commonly associated with spam or promotional content."
              : "No common spam patterns were detected in this message."}

          </p>

        </div>

      </div>

      <div className="mt-7">

        <div className="flex justify-between text-white mb-2">

          <span>Confidence</span>

          <span>{result.confidence}%</span>

        </div>

        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">

          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${result.confidence}%`
            }}
            transition={{
              duration: 0.9
            }}
            className={`h-full ${
              spam
                ? "bg-red-500"
                : "bg-emerald-500"
            }`}
          />

        </div>

      </div>

    </motion.div>
  );
}

export default ResultCard;