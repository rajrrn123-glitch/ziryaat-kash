import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Mail, ShieldCheck, UserPlus, LogIn, Award } from "lucide-react";

export const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { loginGoogle, loginEmail, registerEmail, isUserLoading } = useApp();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (mode === "login") {
      const success = await loginEmail(email);
      if (success) onClose();
    } else {
      if (!name.trim()) return;
      await registerEmail(email, name);
      onClose();
    }
  };

  const handleGoogleSignIn = async () => {
    await loginGoogle();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-md flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 cursor-pointer" />

      <div className="relative w-full max-w-md bg-white border border-gold-300 shadow-2xl rounded-sm p-6 sm:p-8 overflow-hidden">
        {/* Decorative corner borders */}
        <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-gold-400" />
        <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-gold-400" />
        <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-gold-400" />
        <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-gold-400" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <span className="font-luxury-display text-[10px] tracking-[0.3em] text-gold-600 block uppercase font-bold mb-1">
            Ziryaat Kash Lounge
          </span>
          <h2 className="text-xl font-luxury-display tracking-widest uppercase font-medium text-neutral-950">
            {mode === "login" ? "HERITAGE PATRON LOGIN" : "MEMBERSHIP REGISTRATION"}
          </h2>
          <div className="h-[1px] w-12 bg-gold-400 mx-auto mt-3" />
        </div>

        {/* Sign In form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="Lord Evelyn Hastings"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-3 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6] focus:border-gold-500 font-light"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Email Coordinates</label>
            <input
              required
              type="email"
              placeholder="patron@royalheritage.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs p-3 border border-gold-200 outline-none rounded-sm bg-[#FCF9F6] focus:border-gold-500 font-light"
            />
          </div>

          <button
            type="submit"
            disabled={isUserLoading}
            className="w-full py-3 bg-neutral-950 hover:bg-gold-500 text-gold-300 hover:text-neutral-950 text-xs tracking-widest uppercase font-semibold transition-all rounded-sm cursor-pointer border border-gold-400/30 flex items-center justify-center space-x-2"
          >
            {mode === "login" ? <LogIn className="h-3.5 w-3.5" /> : <UserPlus className="h-3.5 w-3.5" />}
            <span>{isUserLoading ? "Communicating..." : mode === "login" ? "Sign In to Lounge" : "Register Membership"}</span>
          </button>
        </form>

        {/* Google SSO Divider */}
        <div className="my-6 flex items-center justify-between text-[10px] text-neutral-400 uppercase tracking-widest">
          <div className="h-[1px] w-20 bg-neutral-100" />
          <span>Or Quick Access</span>
          <div className="h-[1px] w-20 bg-neutral-100" />
        </div>

        {/* Google sign-in */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isUserLoading}
          className="w-full py-2.5 bg-white hover:bg-gold-50 border border-gold-300 hover:border-gold-400 text-neutral-800 text-[10px] tracking-widest uppercase font-semibold transition-all rounded-sm cursor-pointer flex items-center justify-center space-x-2.5"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.952 5.952 0 0 1 8 12.565a5.952 5.952 0 0 1 5.991-5.95c1.554 0 2.964.595 4.027 1.57l3.078-3.078C19.234 3.29 16.793 2 13.99 2 8.163 2 3.44 6.723 3.44 12.55s4.723 10.55 10.55 10.55c5.827 0 10.55-4.723 10.55-10.55a10.02 10.02 0 0 0-.25-2.265H12.24Z"
            />
          </svg>
          <span>Lounge Sign In with Google</span>
        </button>

        {/* Toggle Mode Footer */}
        <div className="mt-6 pt-4 border-t border-neutral-100 text-center">
          {mode === "login" ? (
            <p className="text-[11px] text-neutral-500 font-light">
              Don't have a royal profile yet?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-gold-600 font-medium hover:underline cursor-pointer"
              >
                Create Credentials
              </button>
            </p>
          ) : (
            <p className="text-[11px] text-neutral-500 font-light">
              Already have coordinates registered?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-gold-600 font-medium hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

        {/* Note on Google Verification */}
        <div className="mt-4 text-center text-[9px] text-neutral-400 font-mono flex items-center justify-center space-x-1">
          <ShieldCheck className="h-3 w-3 text-gold-500" />
          <span>Verified security. Official GI Kashmiri Patrons Circle.</span>
        </div>

      </div>
    </div>
  );
};
