import React, { useEffect, useState } from 'react';
import { DataService } from '../services/dataService';
import { GroupOffering, SiteContent } from '../types';
import { INITIAL_CONTENT } from '../constants';
import { ArrowRight, Users, BookOpen, HeartHandshake, Shield, Info, Sparkles, Video } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const GroupCard: React.FC<{ group: GroupOffering }> = ({ group }) => (
  <Link to={`/groups/${group.id}`} className="block h-full">
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-[#4DA3FF]/10 transition-all duration-300 flex flex-col h-full group border border-slate-100 hover:-translate-y-1">
      <div className="h-56 overflow-hidden relative">
        <img src={group.image} alt={group.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
        {/* Subtle overlay to ensure text contrast if needed, but mostly clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="bg-white/90 backdrop-blur-md text-[#4DA3FF] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Video className="h-3 w-3" /> Virtual
          </div>
          <div className="bg-white/90 backdrop-blur-md text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {group.type}
          </div>
        </div>
      </div>
      <div className="p-7 flex-grow flex flex-col relative">
        <div className="text-[#A855F7] text-xs font-bold uppercase tracking-wider mb-2">{group.focus}</div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-[#4DA3FF] transition-colors">{group.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow font-light">{group.description}</p>
        
        <div className="space-y-3 pt-5 border-t border-slate-50">
          <div className="flex items-center text-sm text-slate-500">
            <BookOpen className="h-4 w-4 mr-3 text-[#4DA3FF]" />
            {group.schedule}
          </div>
          <div className="flex items-center text-sm text-slate-500">
            <Users className="h-4 w-4 mr-3 text-[#4DA3FF]" />
            Facilitator: {group.facilitator}
          </div>
        </div>
        
        <div 
          className="mt-8 w-full py-3.5 bg-slate-50 text-slate-900 group-hover:bg-[#4DA3FF] group-hover:text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 text-sm"
        >
          View Details <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  </Link>
);

export const LandingPage: React.FC = () => {
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [groups, setGroups] = useState<GroupOffering[]>([]);
  const location = useLocation();

  useEffect(() => {
    DataService.getContent().then(setContent);
    DataService.getGroups().then(setGroups);
  }, []);

  useEffect(() => {
    // Handle scroll from other pages via state
    if (location.state && (location.state as any).scrollTo) {
      const id = (location.state as any).scrollTo;
      const element = document.getElementById(id);
      if (element) {
        // Short delay to ensure DOM is fully ready
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

  const scrollToOfferings = () => {
    const element = document.getElementById('offerings');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white text-slate-900 overflow-hidden pb-24 pt-24 lg:pt-32">
        {/* Hero Image Background - Abstract Gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://blogger.googleusercontent.com/img/a/AVvXsEigNzo9R2awkd0GSq3Fdnur-EnfXdC_oWXWBv62GGk7veD9iDXCozeEcQbBQjEcit3JSpk1QR0nPGVQSKF4u8oB92NOvQHXUJlZcSNZwy-ZdZJfiKU2B-n0IoKDQY6q4a2bbgRNSXP_9d32Eu9ZDfA-AnRqjObJfIymKyn74g1okyT8z7Uok-AlHNPgv5FS=w640-h426" 
            alt="Abstract calming gradient background with soft blues and purples, representing reflection and growth" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
        </div>

        {/* Gradient Orbs for airy feel */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse z-10"></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 z-10"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Animated Hero Logo */}
          {content.logoUrl && (
            <div className="flex justify-center mb-10">
              <img 
                src={content.logoUrl} 
                alt={`${content.organizationName} Logo`}
                className="h-32 md:h-40 w-auto object-contain animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-8 drop-shadow-xl"
              />
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-100 bg-purple-50/50 backdrop-blur-sm text-[#A855F7] text-xs font-semibold tracking-wide mb-8 shadow-sm">
            <Sparkles className="h-3 w-3" />
            <span>Structured. Safe. Supported.</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-slate-900">
            {content.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            {content.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button 
              onClick={scrollToOfferings}
              className="bg-gradient-to-r from-[#4DA3FF] to-[#A855F7] hover:opacity-90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-xl shadow-blue-500/20"
            >
              Explore Our Groups
            </button>
            <Link to="/how-it-works" className="bg-white border border-slate-200 hover:border-[#4DA3FF] text-slate-600 hover:text-[#4DA3FF] px-8 py-4 rounded-full font-medium text-lg transition-all shadow-sm hover:shadow-md">
              How It Works
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-sm">
             <Video className="h-4 w-4" /> All groups meet virtually
          </div>
        </div>
      </section>

      {/* About & Philosophy */}
      <section id="about" className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-[#4DA3FF] font-bold text-sm uppercase tracking-widest mb-3">Our Philosophy</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-tight">Bridging the Gap Between<br/>Therapy & Community.</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-light">
                <p>{content.aboutText}</p>
                <div className="bg-white border-l-4 border-[#A855F7] p-8 shadow-sm rounded-r-xl mt-8">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4 text-[#A855F7]" /> Methodology
                  </h4>
                  <p className="text-base text-slate-500">{content.methodologyText}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
               <div className="bg-white p-8 rounded-3xl flex flex-col items-center text-center shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-[#4DA3FF]/30 transition-all hover:-translate-y-1">
                  <Users className="h-8 w-8 text-[#4DA3FF] mb-4" />
                  <h4 className="font-bold text-slate-900">Shared Identity</h4>
                  <p className="text-xs text-slate-500 mt-2">Connecting with others walking similar paths.</p>
               </div>
               <div className="bg-white p-8 rounded-3xl flex flex-col items-center text-center translate-y-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-[#A855F7]/30 transition-all hover:-translate-y-1">
                  <BookOpen className="h-8 w-8 text-[#A855F7] mb-4" />
                  <h4 className="font-bold text-slate-900">Psychoeducation</h4>
                  <p className="text-xs text-slate-500 mt-2">Learning tools to navigate stress and systems.</p>
               </div>
               <div className="bg-white p-8 rounded-3xl flex flex-col items-center text-center shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-emerald-400/30 transition-all hover:-translate-y-1">
                  <Shield className="h-8 w-8 text-emerald-500 mb-4" />
                  <h4 className="font-bold text-slate-900">Safe Containers</h4>
                  <p className="text-xs text-slate-500 mt-2">Structured boundaries for emotional safety.</p>
               </div>
               <div className="bg-white p-8 rounded-3xl flex flex-col items-center text-center translate-y-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-amber-400/30 transition-all hover:-translate-y-1">
                  <HeartHandshake className="h-8 w-8 text-amber-500 mb-4" />
                  <h4 className="font-bold text-slate-900">Non-Clinical</h4>
                  <p className="text-xs text-slate-500 mt-2">Supportive reflection without diagnostic labels.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Group Offerings */}
      <section id="offerings" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="text-[#A855F7] font-bold text-sm uppercase tracking-widest mb-3">Group Offerings</div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Upcoming Sessions</h2>
              <p className="text-slate-500 text-lg font-light">
                Our groups run on 6-8 week cycles. Select a group below to view details and inquire about availability. All groups are held virtually.
              </p>
            </div>
            {/* Changed from /contact to #offerings because the schedule is right here */}
            <Link to="/schedule" className="text-[#4DA3FF] font-medium hover:text-[#A855F7] flex items-center gap-2 transition-colors">
              View Schedule <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.filter(g => g.active).map(group => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      </section>

      {/* Facilitator / Credibility */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-10 text-slate-900">Professional Leadership</h2>
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden">
             {/* Decorative Gradient Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4DA3FF] to-[#A855F7]"></div>
            
            <p className="text-slate-600 italic text-xl mb-8 font-light leading-relaxed">
              "The role of the facilitator is not to fix, but to hold the frame. We ensure that the group remains a space of reflection rather than uncontained venting, allowing every participant to find their own insight within the collective wisdom."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#4DA3FF] to-[#A855F7] flex items-center justify-center text-xs font-bold text-white uppercase">
                AS
              </div>
              <div className="text-left">
                <div className="font-semibold text-slate-900">Ashley Smith, PMHNP-BC</div>
                <div className="text-sm text-[#4DA3FF] font-medium">Program Director</div>
                <div className="text-xs text-slate-500">DreamU Psychiatric Support Services</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
             <details className="group p-6 bg-white rounded-2xl shadow-sm border border-slate-200 cursor-pointer open:border-[#4DA3FF] transition-all">
              <summary className="flex justify-between items-center font-semibold text-slate-900 list-none">
                Are sessions in-person or virtual?
                <span className="transition-transform group-open:rotate-180 duration-300">
                  <ArrowRight className="h-5 w-5 text-[#4DA3FF] rotate-90" />
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed font-light">
                All Reflective Sessions are conducted virtually via a secure, HIPAA-compliant video platform. This allows you to join from the comfort of your own space in Youngstown or anywhere in Ohio.
              </p>
            </details>
            <details className="group p-6 bg-white rounded-2xl shadow-sm border border-slate-200 cursor-pointer open:border-[#4DA3FF] transition-all">
              <summary className="flex justify-between items-center font-semibold text-slate-900 list-none">
                Is this group therapy?
                <span className="transition-transform group-open:rotate-180 duration-300">
                  <ArrowRight className="h-5 w-5 text-[#4DA3FF] rotate-90" />
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed font-light">
                No. While therapeutic, Reflective Sessions are psychoeducational support groups. We focus on skill-building, shared reflection, and resilience rather than deep processing of individual trauma or treating mental health diagnoses.
              </p>
            </details>
            <details className="group p-6 bg-white rounded-2xl shadow-sm border border-slate-200 cursor-pointer open:border-[#4DA3FF] transition-all">
              <summary className="flex justify-between items-center font-semibold text-slate-900 list-none">
                Do I need to be a DreamU patient?
                <span className="transition-transform group-open:rotate-180 duration-300">
                  <ArrowRight className="h-5 w-5 text-[#4DA3FF] rotate-90" />
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed font-light">
                Not necessarily. Many of our groups are open to the community. However, an intake screening is required to ensure the group format is appropriate for your current needs.
              </p>
            </details>
            <details className="group p-6 bg-white rounded-2xl shadow-sm border border-slate-200 cursor-pointer open:border-[#4DA3FF] transition-all">
              <summary className="flex justify-between items-center font-semibold text-slate-900 list-none">
                What about confidentiality?
                <span className="transition-transform group-open:rotate-180 duration-300">
                  <ArrowRight className="h-5 w-5 text-[#4DA3FF] rotate-90" />
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed font-light">
                Confidentiality is the cornerstone of our work. All participants sign an agreement to keep the identities and shares of others private. Facilitators are bound by professional ethical codes.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
};