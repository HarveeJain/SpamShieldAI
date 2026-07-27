function MessageInput({ message, setMessage, loading }) {
  return (
    <div>

      <textarea
        rows={8}
        value={message}
        disabled={loading}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste your SMS here..."
        className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 text-white text-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition resize-none disabled:opacity-60 disabled:cursor-not-allowed"
      />

      <div className="flex justify-between mt-3 text-sm text-slate-400">

        <span>
          Supports SMS spam detection
        </span>

        <span>
          {message.length}/500
        </span>

      </div>

    </div>
  );
}

export default MessageInput;