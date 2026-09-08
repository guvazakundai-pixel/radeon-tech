import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hint, setHint] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username, password);
      navigate("/admin/dashboard");
    } catch (err) {
      const msg = err.message || "Login failed";
      setError(msg);
      // Surface the seed hint once so owners know the default credentials exist.
      if (msg.includes("credentials") || msg.includes("Invalid")) {
        setHint("First-time setup? Use the default admin account seeded on deploy (change it afterwards under Security).");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-blue/5 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-purple/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="glass-card-static rounded-3xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-accent-blue flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent-blue/25">
              <Lock size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-text-white tracking-tight">Admin Panel</h1>
            <p className="text-text-muted text-sm font-light mt-1">Radeon Tech Investments</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  required
                  autoFocus
                  className="w-full bg-white/5 border border-border-subtle rounded-xl pl-11 pr-4 py-3 text-sm text-text-white placeholder-text-muted focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full bg-white/5 border border-border-subtle rounded-xl pl-11 pr-4 py-3 text-sm text-text-white placeholder-text-muted focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all"
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs font-medium bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2"
              >
                {error}
              </motion.p>
            )}
            {hint && !error && (
              <p className="text-amber-400/80 text-xs bg-amber-400/5 border border-amber-400/15 rounded-lg px-3 py-2">
                {hint}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full glass-btn text-white py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}