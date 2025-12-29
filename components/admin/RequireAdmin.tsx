import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';

export const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          // Not authenticated at all -> Login
          navigate('/admin/login', { replace: true });
          return;
        }

        // Check if user exists in admin_users table
        // Use maybeSingle() to return null instead of error if row missing
        const { data, error } = await supabase
          .from('admin_users')
          .select('user_id')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error('Error verifying admin status (DB Error):', error);
          // On system error, default to denying access for safety, but log it.
          // In a real app, you might want to show an error screen instead of redirecting.
          navigate('/'); 
          return;
        }

        if (!data) {
          console.warn('Access denied: User authenticated but not authorized (not in admin_users).');
          // Authenticated but not an admin -> Public Home
          navigate('/', { replace: true });
          return;
        }

        // Success
        setIsAdmin(true);
      } catch (error) {
        console.error('Unexpected error during admin check:', error);
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[#4DA3FF] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium text-sm">Verifying Access...</p>
        </div>
      </div>
    );
  }

  return isAdmin ? <>{children}</> : null;
};