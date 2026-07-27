import { ShieldCheck } from "lucide-react";

function Header() {
  return (
    <div className="text-center mb-10">

      <div className="flex justify-center mb-5">
        <div className="bg-blue-600/20 p-5 rounded-full border border-blue-500">
          <ShieldCheck
            size={48}
            className="text-blue-400"
          />
        </div>
      </div>

      <h1 className="text-5xl font-black text-white tracking-tight">
        SpamShield AI
      </h1>

      <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto leading-relaxed">
        Detect spam messages instantly using Natural Language Processing and
        Machine Learning.
      </p>

    </div>
  );
}

export default Header;