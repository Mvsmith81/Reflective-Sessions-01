import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Anchor, Lock, ArrowRight, ShieldCheck, Mail, AlertCircle } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';
import { DataService } from '../../services/dataService';
import { SiteContent } from '../../types';
import { INITIAL_CONTENT } from '../../constants';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);

  useEffect(() => {
    DataService.getContent().then(setContent);

    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/admin');
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        navigate('/admin');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80" 
          alt="Abstract calm background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4DA3FF]/40 to-[#A855F7]/40"></div>
        
        <div className="relative z-10 text-center px-12 text-white">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20">
             <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Staff Portal</h2>
          <p className="text-lg text-slate-200 font-light leading-relaxed max-w-md mx-auto">
            Secure access for facilitators and administrators of {content.organizationName}.
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
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-500 mt-2">Please sign in to access the dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#4DA3FF] outline-none transition-all"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#4DA3FF] outline-none transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#4DA3FF] to-[#A855F7] hover:opacity-90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>Sign In <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            Unauthorized access is prohibited. All activities are monitored.
          </p>
        </div>
      </div>
    </div>
  );
};