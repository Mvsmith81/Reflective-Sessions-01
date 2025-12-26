import React from 'react';
import { Sparkles } from 'lucide-react';

export const GroupIntakePage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Header */}
      <div className="relative bg-slate-900 py-24 lg:py-32 overflow-hidden">
        <img 
            src="https://blogger.googleusercontent.com/img/a/AVvXsEgQntaKRXlKAboytxLC7bRA9w0HX2irfAfo3n_KVIPRtdbrswI76hogoNH-oWdBhw298zPZkCK_QEokPgZAFZoZKDa812fPx8DuIt0ux1T9qLcJYCCT8y8M--vYBapprWkUTRlROmxSJJMWLzmj7SdgwCyQbxubfB7jVqaWWcvgEnpq1MlxQng4_r-c5oCh=w640-h426"
            alt="Intake Header"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/90"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold tracking-wide mb-6">
                <Sparkles className="h-3 w-3" />
                <span>Begin Your Journey</span>
              </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Group Intake</h1>
            <p className="text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto font-light">
              Reflective Sessions uses a group intake form to collect interest and availability requests for upcoming virtual group sessions. Please complete the form below to help us match you with a cohort.
            </p>
        </div>
      </div>
      
      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
         <div className="bg-white p-1 md:p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex justify-center">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSd9fdjQ7EmZUQdKLj3yJ9LY4v5_VTA3hhP3XvoLUUmoQZ6cug/viewform?embedded=true" 
            width="640" 
            height="1598" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            className="w-full max-w-[640px]"
            title="Group Intake Form"
          >
            Loading…
          </iframe>
         </div>
      </div>
    </div>
  );
};