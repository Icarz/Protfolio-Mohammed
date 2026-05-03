import { useState } from "react";
import { Lock, Eye, EyeOff, Shield } from "lucide-react";

export const HASH_KEY = "admin_password_hash";

export async function hashPassword(password) {
  const encoded = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const AdminLogin = ({ onLogin }) => {
  const isSetup = !localStorage.getItem(HASH_KEY);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isSetup) {
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        setLoading(false);
        return;
      }
      if (password !== confirm) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      const hash = await hashPassword(password);
      localStorage.setItem(HASH_KEY, hash);
      sessionStorage.setItem("admin_auth", "true");
      onLogin();
    } else {
      const storedHash = localStorage.getItem(HASH_KEY);
      const inputHash = await hashPassword(password);
      if (inputHash === storedHash) {
        sessionStorage.setItem("admin_auth", "true");
        onLogin();
      } else {
        setError("Incorrect password.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <h1
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isSetup ? "Create Admin Password" : "Admin Access"}
          </h1>
          <p className="text-slate-400 text-sm">
            {isSetup
              ? "Set a secure password to protect your portfolio admin."
              : "Enter your password to manage your portfolio."}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0A1628] border border-white/10 rounded-2xl p-8 space-y-5"
        >
          <div>
            <label className="block text-sm text-slate-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSetup ? "Create a strong password" : "Enter your password"}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isSetup && (
            <div>
              <label className="block text-sm text-slate-400 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
                  required
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            {loading ? "Verifying…" : isSetup ? "Set Password & Enter" : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
            ← Back to Portfolio
          </a>
        </div>

        {!isSetup && (
          <p className="text-center text-xs text-slate-600 mt-4">
            Forgot password? Open DevTools → Console → type:{" "}
            <code className="text-slate-500">localStorage.removeItem('admin_password_hash')</code>
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
