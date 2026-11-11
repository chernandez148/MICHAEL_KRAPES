import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { adminLogin, apiError, getAdminToken } from "../../services/admin";
import { AdminHead, fieldClass, labelClass, primaryButton } from "../../components/admin/AdminLayout";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (getAdminToken()) return <Navigate to={from} replace />;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await adminLogin(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(apiError(err, "Couldn't log in. Please try again."));
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-outfit flex items-center justify-center px-4">
      <AdminHead />
      <form onSubmit={submit} className="w-full max-w-sm border border-white/10 bg-[#111111] p-8 flex flex-col gap-6">
        <div>
          <span className="font-bebas text-2xl tracking-[0.18em] text-white">
            MK <span className="text-[#c8a96e] text-sm tracking-[0.3em]">STUDIO</span>
          </span>
          <p className="text-sm font-light text-white/50 m-0 mt-2">Sign in to manage orders and works.</p>
        </div>
        <div>
          <label htmlFor="admin-email" className={labelClass}>Email</label>
          <input id="admin-email" type="email" autoComplete="username" required className={fieldClass}
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="admin-password" className={labelClass}>Password</label>
          <input id="admin-password" type="password" autoComplete="current-password" required className={fieldClass}
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p role="alert" className="text-xs text-red-300/90 font-light m-0">{error}</p>}
        <button type="submit" disabled={busy} className={`${primaryButton} w-full`}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
