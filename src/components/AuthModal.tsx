import React, { useState } from 'react';
import { X, CheckCircle2, Shield, Zap, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#e0e3eb] overflow-hidden p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#787b86] hover:text-[#131722] rounded-xl hover:bg-[#f0f3fa] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Mark */}
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-7 h-6 fill-current text-black"
            viewBox="0 0 36 28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 22H7V6h7v16zm8-22h-7v28h7V0zm8 10h-7v18h7V10z"></path>
          </svg>
          <span className="font-extrabold text-lg tracking-tight text-[#131722]">TradingView</span>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#089981] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#131722]">Welcome to TradingView!</h3>
            <p className="text-xs text-[#787b86] max-w-xs mx-auto leading-relaxed">
              We&rsquo;ve sent an activation link to <b className="text-[#131722]">{email}</b>. You now have full access to simulated real-time data, supercharts, and custom alerts.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#131722] text-white text-xs font-semibold hover:bg-black transition-colors"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-extrabold text-[#131722] tracking-tight">
              {mode === 'signup' ? 'Look first / Then leap.' : 'Welcome back'}
            </h3>
            <p className="text-xs text-[#787b86] mt-1">
              {mode === 'signup'
                ? 'Join 60+ million traders & investors exploring world markets.'
                : 'Sign in to sync your watchlists and chart layouts.'}
            </p>

            {/* Social Logins */}
            <div className="mt-6 space-y-2.5">
              <button
                onClick={() => setSubmitted(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-[#e0e3eb] hover:bg-[#f8f9fd] text-xs font-semibold text-[#131722] flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                onClick={() => setSubmitted(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-[#e0e3eb] hover:bg-[#f8f9fd] text-xs font-semibold text-[#131722] flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.02.63-2.67 1.38-.58.65-1.09 1.73-.96 2.76 1.04.08 2.1-.53 2.71-1.27z" />
                </svg>
                <span>Continue with Apple</span>
              </button>
            </div>

            <div className="my-4 flex items-center gap-2 text-xs text-[#787b86]">
              <div className="flex-1 border-t border-[#f0f3fa]"></div>
              <span>or email</span>
              <div className="flex-1 border-t border-[#f0f3fa]"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-2.5 rounded-xl border border-[#e0e3eb] text-xs text-[#131722] placeholder:text-[#787b86] outline-none focus:border-[#2962ff]"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#0052ff] via-[#2962ff] to-[#a855f7] hover:opacity-95 text-white text-xs font-bold transition duration-150 shadow-sm"
              >
                {mode === 'signup' ? 'Get started for free' : 'Sign in'}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-[#787b86]">
              {mode === 'signup' ? (
                <span>
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('signin')}
                    className="font-bold text-[#2962ff] hover:underline"
                  >
                    Sign in
                  </button>
                </span>
              ) : (
                <span>
                  Don&rsquo;t have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="font-bold text-[#2962ff] hover:underline"
                  >
                    Sign up free
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
