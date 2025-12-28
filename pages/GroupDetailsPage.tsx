import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { DataService } from '../services/dataService';
import { ArrowLeft, Calendar, User, CheckCircle, Video, ArrowRight, Shield } from 'lucide-react';
import { GroupOffering } from '../types';

export const GroupDetailsPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<GroupOffering | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupId) {
      DataService.getGroupById(groupId).then((g) => {
        setGroup(g);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [groupId]);

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400">Loading Group Details...</div>;
  }

  if (!group) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header Image Area */}
      <div className="h-[400px] w-full relative overflow-hidden bg-slate-900">
        <img 
          src={group.image} 
          alt={group.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="absolute top-8 left-4 md:left-8 z-20">
           <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full transition-colors text-sm font-medium">
              <ArrowLeft className="h-4 w-4" /> Back to Home
           </Link>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-12">
            
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-blue-50 text-[#4DA3FF] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {group.type}
              </span>
              <span className="bg-purple-50 text-[#A855F7] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {group.focus}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {group.title}
            </h1>

            {/* Key Info Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 py-8 border-y border-slate-100">
               <div className="flex items-start gap-4">
                 <div className="bg-slate-50 p-3 rounded-xl text-slate-900">
                   <Calendar className="h-6 w-6" />
                 </div>
                 <div>
                   <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Schedule</div>
                   <div className="font-semibold text-slate-900">{group.schedule}</div>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="bg-slate-50 p-3 rounded-xl text-slate-900">
                   <User className="h-6 w-6" />
                 </div>
                 <div>
                   <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Facilitator</div>
                   <div className="font-semibold text-slate-900">{group.facilitator}</div>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="bg-slate-50 p-3 rounded-xl text-slate-900">
                   <Video className="h-6 w-6" />
                 </div>
                 <div>
                   <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Platform</div>
                   <div className="font-semibold text-slate-900">Virtual (Secure Video)</div>
                 </div>
               </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-4">About this Group</h3>
                   <div className="prose prose-slate text-slate-600 leading-relaxed text-lg font-light">
                     <p>{group.longDescription || group.description}</p>
                   </div>
                </div>

                {group.benefits && group.benefits.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">What We Explore</h3>
                    <ul className="space-y-4">
                      {group.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                           <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                           <span className="text-slate-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar CTA */}
              <div className="lg:col-span-1">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 sticky top-24">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Ready to Join?</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Our groups are kept small to ensure safety and connection. Submit an inquiry to check availability for the next cohort.
                  </p>
                  
                  <Link 
                    to="/group-intake"
                    className="w-full py-4 bg-gradient-to-r from-[#4DA3FF] to-[#A855F7] text-white font-bold rounded-xl shadow-lg shadow-purple-200 hover:opacity-90 transition-all flex items-center justify-center gap-2 mb-4"
                  >
                    Start Intake Form <ArrowRight className="h-4 w-4" />
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                     <Shield className="h-3 w-3" /> Secure & Confidential
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};