import { useState } from "react";
import { Lock, Eye, EyeOff, RotateCcw, LogOut } from "lucide-react";
import { HASH_KEY, hashPassword } from "../AdminLogin";
import { resetPortfolioData } from "../../../data/portfolioData";
import { usePortfolio } from "../../../context/PortfolioContext";
import { DEFAULT_DATA } from "../../../data/portfolioData";

const SettingsTab = ({ onLogout }) => {
  const { updateData } = usePortfolio();

  // Change password
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSaved, setPwSaved] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwError("");
    setPwLoading(true);

    const storedHash = localStorage.getItem(HASH_KEY);
    const currentHash = await hashPassword(currentPw);
    if (currentHash !== storedHash) {
      setPwError("Current password is incorrect.");
      setPwLoading(false);
      return;
    }
    if (newPw.length < 8) {
      setPwError("New password must be at least 8 characters.");
      setPwLoading(false);
      return;
    }
    if (newPw !== confirmPw) {
      setPwError("Passwords do not match.");
      setPwLoading(false);
      return;
    }

    const newHash = await hashPassword(newPw);
    localStorage.setItem(HASH_KEY, newHash);
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 3000);
    setPwLoading(false);
  };

  // Reset portfolio data
  const [resetDone, setResetDone] = useState(false);

  const handleReset = () => {
    if (!confirm("Reset all portfolio content to defaults? This cannot be undone.")) return;
    resetPortfolioData();
    updateData({ ...DEFAULT_DATA });
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
          Settings
        </h2>
        <p className="text-slate-500 text-sm">Manage your admin password and portfolio data.</p>
      </div>

      {/* Change password */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Change Admin Password</h3>
        <form onSubmit={handleChangePassword} className="space-y-3 max-w-sm">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type={showPw ? "text" : "password"}
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              placeholder="Current password"
              className={`${inputClass} pl-10 pr-10`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <input
            type={showPw ? "text" : "password"}
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            placeholder="New password (min. 8 chars)"
            className={inputClass}
            required
          />
          <input
            type={showPw ? "text" : "password"}
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            placeholder="Confirm new password"
            className={inputClass}
            required
          />

          {pwError && (
            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
              {pwError}
            </p>
          )}

          <button
            type="submit"
            disabled={pwLoading}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${pwSaved ? "bg-emerald-600 text-white" : "bg-blue-600 hover:bg-blue-500 text-white"}`}
          >
            <Lock className="w-4 h-4" />
            {pwLoading ? "Saving…" : pwSaved ? "Password Updated!" : "Update Password"}
          </button>
        </form>
      </div>

      {/* Reset data */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-1">Reset Portfolio Data</h3>
        <p className="text-slate-500 text-sm mb-4">
          Restore all content to the original defaults. Your admin password will not be affected.
        </p>
        <button
          onClick={handleReset}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border ${resetDone ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 hover:bg-red-500/20 border-red-500/20 text-red-400"}`}
        >
          <RotateCcw className="w-4 h-4" />
          {resetDone ? "Reset complete!" : "Reset to Defaults"}
        </button>
      </div>

      {/* Log out */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-1">Session</h3>
        <p className="text-slate-500 text-sm mb-4">Your session is stored until you close the browser tab.</p>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
