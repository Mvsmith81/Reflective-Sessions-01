import React from 'react';
import { DataService } from '../services/dataService';
import { Calendar, Clock, Video, ArrowRight, Hourglass } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SchedulePage: React.FC = () => {
  const content = DataService.getContent();
  const groups = DataService.getGroups().filter(g => g.active);

  // Condition 1: Global Status Message exists (e.g. "Coming March 2026")
  if (content.globalScheduleStatus && content.globalScheduleStatus.trim().length > 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white px-4 text-center relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-4 bg-slate-50 rounded-full mb-8 shadow-sm">
             <Hourglass className="h-8 w-8 text-[#4DA3FF] animate-spin-slow" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Schedule Update
          </h1>
          
          <div className="bg-white border-l-4 border-[#A855F7] p-8 rounded-r-xl shadow-xl shadow-purple-500/5 text-left transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
              "{content.globalScheduleStatus}"
            </p>
          </div>

          <p className="mt-10 text-slate-500">
            We are currently curating our upcoming cohorts. Please check back soon or 
            <Link to="/contact" className="text-[#4DA3FF] font-semibold hover:underline ml-1">contact us</Link> to be added to the waitlist.
          </p>

          <Link to="/" className="inline-flex items-center gap-2 mt-8 text-slate-400 hover:text-slate-900 transition-colors text-sm font-medium">
             <ArrowRight className="h-4 w-4 rotate-180" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Condition 2: No Status Message -> Show Actual Schedule
  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Upcoming Session Schedule</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            All groups meet virtually via our secure telehealth platform. Times listed are Eastern Standard Time (EST).
          </p>
        </div>

        <div className="grid gap-6">
          {groups.map((group) => (
            <div key={group.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 hover:border-[#4DA3FF] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-blue-50 text-[#4DA3FF] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {group.type}
                  </span>
                  <span className="text-slate-400 text-xs flex items-center gap-1">
                    <Video className="h-3 w-3" /> Virtual
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  <Link to={`/groups/${group.id}`} className="hover:text-[#4DA3FF] transition-colors">{group.title}</Link>
                </h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{group.description}</p>
                <div className="flex items-center gap-2 text-sm text-slate-700 font-medium bg-slate-50 inline-block px-3 py-1.5 rounded-lg">
                   <Clock className="h-4 w-4 text-[#A855F7]" />
                   {group.schedule}
                </div>
              </div>

              <div className="flex-shrink-0 flex gap-3">
                <Link 
                  to={`/groups/${group.id}`}
                  className="w-full md:w-auto px-6 py-3 bg-white text-slate-600 border-2 border-slate-100 hover:border-[#4DA3FF] hover:text-[#4DA3FF] font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Details
                </Link>
                <Link 
                  to="/group-intake"
                  className="w-full md:w-auto px-6 py-3 bg-slate-900 text-white hover:bg-[#4DA3FF] font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                >
                  <Calendar className="h-4 w-4" /> Inquire
                </Link>
              </div>
            </div>
          ))}
        </div>

        {groups.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No active groups currently scheduled.</p>
          </div>
        )}
      </div>
    </div>
  );
};