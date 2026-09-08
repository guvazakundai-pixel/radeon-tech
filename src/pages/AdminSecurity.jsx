import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { ShieldCheck, Check, Loader2, Eye, EyeOff, KeyRound, User as UserIcon } from "lucide-react";

export default function AdminSecurity() {
  const { token, admin, setAdmin } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState({ cur: false, pw: false, cf: false });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const toggle = (k) => setShow((s) => ({ ...s, [k]: !s[k] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword && newPassword !== confirmPassword) {
      setError("New password and confirmation don't match.");
      return;
    }
    if (!newUsername.trim() && !newPassword) {
      setError("Enter a new username or a new password to update.");
      return;
    }

    if (!window.confirm("Confirm these security changes before submitting?")) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          currentPassword,
          newUsername: newUsername.trim() || undefined,
          newPassword: newPassword || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          setError("Current password is incorrect. Nothing was changed.");
        } else {
          setError(data.error || "Update failed");
        }
        return;
      }
      setAdmin(data.admin);
      setSuccess(data.message || "Updated successfully.");
      setCurrentPassword("");
      if (newPassword) {
        setNewPassword("");
        setConfirmPassword("");
        // Force a re-login with the new password for security.
        setTimeout(() => {
          localStorage.removeItem("rt_admin_token");
          window.location.href = "/admin/login";
        }, 1800);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-white tracking-tight flex items-center gap-3">
          <ShieldCheck size={26} className="text-accent-blue" /> Security
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Change your admin username and password. Your current password is required to confirm.
        </p>
      </div>

      <div className="glass-card p-5 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent-blue/15 flex items-center justify-center font-heading font-bold text-accent-blue text-lg">
          {(admin?.username || "A").slice(0, 1).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-white">{admin?.username}</p>
          <p className="text-xs text-text-muted">{admin?.role === "MASTER_ADMIN" ? "Master Admin · single account" : "Admin"}</p>
        </div>
        <div className="ml-auto">
          <span className="inline-flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-glow" /> Authenticated
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 rounded-3xl space-y-5">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1 flex items-center gap-1.5">
            <KeyRound size={12} /> Current Password *
          </label>
          <div className="relative">
            <input type={show.cur ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required placeholder="Required to confirm changes" autoComplete="current-password" className="input-ghost w-full pr-11" />
            <button type="button" onClick={() => toggle("cur")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white cursor-pointer p-1">
              {show.cur ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <div className="h-px bg-white/[0.06]" />

        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1 flex items-center gap-1.5">
            <UserIcon size={12} /> New Username
          </label>
          <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="Leave blank to keep current" className="input-ghost w-full" />
          <p className="text-[11px] text-text-muted mt-1 ml-1">Current: {admin?.username} · 3–64 characters.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1 flex items-center gap-1.5">
              <KeyRound size={12} /> New Password
            </label>
            <div className="relative">
              <input type={show.pw ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Leave blank to keep current" autoComplete="new-password" className="input-ghost w-full pr-11" />
              <button type="button" onClick={() => toggle("pw")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white cursor-pointer p-1">
                {show.pw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Confirm Password</label>
            <div className="relative">
              <input type={show.cf ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" autoComplete="new-password" className="input-ghost w-full pr-11" />
              <button type="button" onClick={() => toggle("cf")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white cursor-pointer p-1">
                {show.cf ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-text-muted ml-1 -mt-2">New password must be at least 8 characters and different from the current one.</p>

        {error && (
          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
            {error}
          </motion.p>
        )}
        {success && (
          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-lg px-3 py-2 inline-flex items-center gap-2">
            <Check size={14} /> {success}
          </motion.p>
        )}

        <div className="flex justify-end pt-2 gap-3">
          <button type="submit" disabled={submitting} className="glass-btn px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 cursor-pointer inline-flex items-center gap-2">
            {submitting ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={15} />}
            {submitting ? "Updating..." : "Update Credentials"}
          </button>
        </div>
      </form>
    </div>
  );
}