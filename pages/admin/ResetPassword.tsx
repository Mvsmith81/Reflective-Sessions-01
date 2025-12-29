import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Anchor, Lock, ArrowRight, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';
import { DataService } from '../../services/dataService';
import { SiteContent } from '../../types';
import { INITIAL_CONTENT } from '../../constants';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);

  useEffect(() => {
    DataService.getContent().then(setContent);

    // Listen for the PASSWORD_RECOVERY event.
    // When a user clicks a recovery link, Supabase sets the session and emits this event.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // Session is now active, allowing the user to update their password.
        setError(''); 
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setIsLoading(false);
      return;
    }

    try {
      // Update the user's password using the active session from the recovery link
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        throw error;
      }

      setSuccess('Password updated successfully. Redirecting to login...');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Failed to update password. Your recovery link may have expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-9a60aa207126?auto=format&fit=crop&q=80" 
          alt="Abstract calm background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4DA3FF]/40 to-[#A855F7]/40"></div>
        
        <div className="relative z-10 text-center px-12 text-white">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20">
             <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Security Update</h2>
          <p className="text-lg text-slate-200 font-light leading-relaxed max-w-md mx-auto">
            Please establish a new secure password for your administrative account.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
        <div className="absolute top-8 left-8">
           <Link to="/" className="flex items-center gap-2 group">
             {content.logoUrl ? (
                <img src={content.logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
             ) : (
               <div className="p-2 bg-gradient-to-br from-[#4DA3FF]/10 to-[#A855F7]/10 rounded-lg">
                  <Anchor className="h-5 w-5 text-[#4DA3FF]" />
               </div>
             )}
             <span className="font-bold text-slate-700">Reflective Sessions</span>
           </Link>
        </div>

        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Reset Password</h1>
            <p className="text-slate-500 mt-2">Enter your new credentials below.</p>
          </div>

          <form onSubmit={handleReset} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="bg-emerald-50 text-emerald-600 px-4 py-3 rounded-xl text-sm font-medium border border-emerald-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <CheckCircle className="h-4 w-4 shrink-0" />
                {success}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#4DA3FF] outline-none transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#4DA3FF] outline-none transition-all"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={6}
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !!success}
              className="w-full bg-gradient-to-r from-[#4DA3FF] to-[#A855F7] hover:opacity-90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Updating...</span>
              ) : (
                <>Set New Password <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            Remember your password? <Link to="/admin/login" className="text-[#4DA3FF] hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};