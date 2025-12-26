import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Calendar, Video, FileCheck, Users, Clock, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { DataService } from '../services/dataService';

export const HowItWorksPage: React.FC = () => {
  const content = DataService.getContent();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-slate-50 pt-20 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50/50 text-[#4DA3FF] text-xs font-semibold tracking-wide mb-6">
              <Sparkles className="h-3 w-3" />
              <span>Your Journey to Connection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Understanding the Process
            </h1>
            <p className="text-xl text-slate-500 font-light leading-relaxed">
              We've designed a simple, clinically-informed pathway to ensure every participant finds the right space for their growth. Here is what to expect from inquiry to your first session.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Image Column */}
          <div className="relative max-w-md mx-auto w-full md:sticky md:top-24">
             <div className="absolute -inset-4 bg-gradient-to-r from-[#4DA3FF] to-[#A855F7] rounded-3xl opacity-20 blur-lg"></div>
             <img 
               src="https://blogger.googleusercontent.com/img/a/AVvXsEh4oqmsEuJ-k61OA7yRtewd8x96l06VthwM2T3trBMNt0hbQV5Bqe0-3ytslj7_568bGBpBsfT64zrcK6_5obj1OjVdCBnbmdwUAwhkho47eEatF-Ie8YdhaSTaUVv2r-enH40ujxnsgYx5gZ6tuLwgfEy5BHTpGPDCKmlrDjP6fexU98VV3r0hbCZNjw6L=w400-h400" 
               alt="Two people discussing in a calm environment" 
               className="relative rounded-3xl shadow-2xl z-10 w-full h-auto object-contain"
             />
             <div className="absolute -bottom-6 left-6 right-6 z-20 bg-white/95 backdrop-blur-md p-5 rounded-xl shadow-lg border border-slate-100">
               <div className="flex items-center gap-4">
                 <div className="bg-green-100 p-2.5 rounded-full text-green-600 shrink-0">
                   <Shield className="h-5 w-5" />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 text-sm">Safety First</h4>
                   <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Every group is screened to ensure a secure container.</p>
                 </div>
               </div>
             </div>
          </div>

          {/* Steps Column */}
          <div className="space-y-12">
            <div className="relative pl-8 border-l-2 border-slate-100 space-y-12">
              {/* Step 1 */}
              <div className="relative group">
                <div className="absolute -left-[41px] top-0 bg-white border-4 border-slate-100 group-hover:border-[#4DA3FF] w-5 h-5 rounded-full transition-colors"></div>
                <div className="flex items-start gap-5">
                   <div className="bg-blue-50 text-[#4DA3FF] p-4 rounded-2xl">
                     <FileCheck className="h-6 w-6" />
                   </div>
                   <div>
                     <span className="text-xs font-bold text-[#4DA3FF] uppercase tracking-wider mb-1 block">Step 01</span>
                     <h3 className="text-2xl font-bold text-slate-900 mb-3">Inquiry & Selection</h3>
                     <p className="text-slate-600 leading-relaxed">
                       Browse our active groups and select the topic that resonates with you. Submit a brief interest form. No payment is required at this stage.
                     </p>
                   </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="absolute -left-[41px] top-0 bg-white border-4 border-slate-100 group-hover:border-[#A855F7] w-5 h-5 rounded-full transition-colors"></div>
                <div className="flex items-start gap-5">
                   <div className="bg-purple-50 text-[#A855F7] p-4 rounded-2xl">
                     <Phone className="h-6 w-6" />
                   </div>
                   <div>
                     <span className="text-xs font-bold text-[#A855F7] uppercase tracking-wider mb-1 block">Step 02</span>
                     <h3 className="text-2xl font-bold text-slate-900 mb-3">The Intake Call</h3>
                     <p className="text-slate-600 leading-relaxed">
                       Our intake coordinator will schedule a 15-minute phone call. This isn't a therapy session, but a "fit check" to ensure the group format matches your current needs and to rule out any acute crisis risks.
                     </p>
                   </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="absolute -left-[41px] top-0 bg-white border-4 border-slate-100 group-hover:border-[#4DA3FF] w-5 h-5 rounded-full transition-colors"></div>
                <div className="flex items-start gap-5">
                   <div className="bg-blue-50 text-[#4DA3FF] p-4 rounded-2xl">
                     <Calendar className="h-6 w-6" />
                   </div>
                   <div>
                     <span className="text-xs font-bold text-[#4DA3FF] uppercase tracking-wider mb-1 block">Step 03</span>
                     <h3 className="text-2xl font-bold text-slate-900 mb-3">Registration & Onboarding</h3>
                     <p className="text-slate-600 leading-relaxed">
                       Once approved, you'll receive a secure link to sign the Participant Agreement and finalize your spot. You'll also receive a "Welcome Packet" with the syllabus and Zoom details.
                     </p>
                   </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative group">
                <div className="absolute -left-[41px] top-0 bg-white border-4 border-slate-100 group-hover:border-[#A855F7] w-5 h-5 rounded-full transition-colors"></div>
                <div className="flex items-start gap-5">
                   <div className="bg-purple-50 text-[#A855F7] p-4 rounded-2xl">
                     <Video className="h-6 w-6" />
                   </div>
                   <div>
                     <span className="text-xs font-bold text-[#A855F7] uppercase tracking-wider mb-1 block">Step 04</span>
                     <h3 className="text-2xl font-bold text-slate-900 mb-3">Attend Sessions</h3>
                     <p className="text-slate-600 leading-relaxed">
                       Log in weekly for your 90-minute session. Groups are closed cohorts, meaning the same participants attend every week to build trust and continuity.
                     </p>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Session Structure Detail */}
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80" 
          alt="Notebook and calm setting" 
          className="absolute inset-0 w-full h-full object-cover opacity-10" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Inside a 90-Minute Session</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our groups follow a predictable, structured arc to ensure safety and purpose. You will never be forced to "open up" more than you are comfortable with.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-[#4DA3FF] transition-all group">
              <div className="text-4xl font-bold text-[#4DA3FF] mb-4 opacity-50 group-hover:opacity-100 transition-opacity">15</div>
              <h4 className="text-lg font-bold mb-2">The Check-In</h4>
              <p className="text-sm text-slate-400">Brief, structured updates from each member (e.g., "Rose, Bud, Thorn") to ground us in the present moment.</p>
              <div className="mt-4 text-xs font-mono text-slate-500">Mins 0-15</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-[#A855F7] transition-all group">
              <div className="text-4xl font-bold text-[#A855F7] mb-4 opacity-50 group-hover:opacity-100 transition-opacity">30</div>
              <h4 className="text-lg font-bold mb-2">Psychoeducation</h4>
              <p className="text-sm text-slate-400">The facilitator introduces a concept (e.g., "The Window of Tolerance") using slides or visual aids.</p>
              <div className="mt-4 text-xs font-mono text-slate-500">Mins 15-45</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-all group">
              <div className="text-4xl font-bold text-emerald-500 mb-4 opacity-50 group-hover:opacity-100 transition-opacity">30</div>
              <h4 className="text-lg font-bold mb-2">Guided Reflection</h4>
              <p className="text-sm text-slate-400">Journaling prompts followed by optional sharing. The focus is on personal insight and resonance.</p>
              <div className="mt-4 text-xs font-mono text-slate-500">Mins 45-75</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-amber-500 transition-all group">
              <div className="text-4xl font-bold text-amber-500 mb-4 opacity-50 group-hover:opacity-100 transition-opacity">15</div>
              <h4 className="text-lg font-bold mb-2">Closing</h4>
              <p className="text-sm text-slate-400">A grounding exercise (breathwork or visualization) and "check-out" to transition back to daily life safely.</p>
              <div className="mt-4 text-xs font-mono text-slate-500">Mins 75-90</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to join a cohort?</h2>
          <p className="text-lg text-slate-500 mb-10">
            View our schedule to see which groups are currently accepting new members.
          </p>
          <div className="flex justify-center gap-4">
             <Link to="/schedule" className="px-8 py-4 bg-gradient-to-r from-[#4DA3FF] to-[#A855F7] text-white rounded-full font-bold shadow-xl shadow-purple-200 hover:opacity-90 transition-all flex items-center gap-2">
               View Schedule <ArrowRight className="h-4 w-4" />
             </Link>
             <Link to="/contact" className="px-8 py-4 bg-slate-100 text-slate-700 rounded-full font-bold hover:bg-slate-200 transition-all">
               Contact Support
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};