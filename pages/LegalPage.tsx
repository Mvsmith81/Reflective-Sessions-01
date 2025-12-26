import React from 'react';
import { Shield, FileText, CheckCircle } from 'lucide-react';
import { DataService } from '../services/dataService';

export const LegalPage: React.FC = () => {
  const content = DataService.getContent();

  // Scroll to section on click
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-[#4DA3FF] rounded-full mb-6">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Legal & Policy</h1>
          <p className="text-slate-500 text-lg">Transparency, safety, and community guidelines for {content.organizationName}.</p>
        </div>
        
        {/* Nav Tabs */}
        <div className="max-w-4xl mx-auto px-4 flex overflow-x-auto space-x-8 border-t border-slate-100">
          <button onClick={() => scrollTo('privacy')} className="py-4 text-sm font-medium text-slate-600 hover:text-[#4DA3FF] whitespace-nowrap border-b-2 border-transparent hover:border-[#4DA3FF] transition-all">
            Privacy Policy
          </button>
          <button onClick={() => scrollTo('terms')} className="py-4 text-sm font-medium text-slate-600 hover:text-[#4DA3FF] whitespace-nowrap border-b-2 border-transparent hover:border-[#4DA3FF] transition-all">
            Terms of Service
          </button>
          <button onClick={() => scrollTo('agreement')} className="py-4 text-sm font-medium text-slate-600 hover:text-[#4DA3FF] whitespace-nowrap border-b-2 border-transparent hover:border-[#4DA3FF] transition-all">
            Participant Agreement
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-16">
        
        {/* Privacy Policy */}
        <section id="privacy" className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-6 w-6 text-[#A855F7]" />
            <h2 className="text-2xl font-bold text-slate-900">Privacy Policy</h2>
          </div>
          <div className="prose prose-slate max-w-none text-slate-600">
            <p><strong>Last Updated: October 2023</strong></p>
            <p>
              At Reflective Sessions, a program of {content.organizationName}, we take your privacy seriously. 
              This policy explains how we collect, use, and protect your personal information.
            </p>
            <h3>Information We Collect</h3>
            <p>
              When you inquire about a group or book a session, we collect personally identifiable information including your name, email address, and phone number. 
              We utilize this solely for the purpose of coordinating group logistics and screening.
            </p>
            <h3>How We Use Your Data</h3>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>To facilitate group scheduling and send secure video links.</li>
              <li>To conduct intake screenings to ensure group suitability.</li>
              <li>To communicate important updates regarding your sessions.</li>
            </ul>
            <p className="mt-4">
              We do <strong>not</strong> sell your data. As a psychiatric support service, we adhere to strict confidentiality standards aligned with HIPAA where applicable regarding health information.
            </p>
          </div>
        </section>

        {/* Terms of Service */}
        <section id="terms" className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-6 w-6 text-[#4DA3FF]" />
            <h2 className="text-2xl font-bold text-slate-900">Terms of Service</h2>
          </div>
          <div className="prose prose-slate max-w-none text-slate-600">
            <h3>Nature of Services</h3>
            <p>
              Reflective Sessions offers psychoeducational support groups. <strong>These sessions are NOT a substitute for clinical psychotherapy or medical treatment.</strong> 
              Participation does not establish a patient-provider relationship with {content.organizationName} unless otherwise formally established through a separate clinical intake process.
            </p>
            <h3>Payment and Cancellation</h3>
            <p>
              Details regarding fees (if applicable) will be provided upon acceptance into a group. We ask for 24-hour notice for cancellations to respect the time of facilitators and fellow participants.
            </p>
          </div>
        </section>

        {/* Participant Agreement */}
        <section id="agreement" className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="h-6 w-6 text-emerald-500" />
            <h2 className="text-2xl font-bold text-slate-900">Participant Agreement</h2>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl mb-6">
             <p className="text-emerald-800 text-sm font-medium">
               By joining a Reflective Session, all participants agree to the following Community Standards to ensure a safe environment.
             </p>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="font-bold text-slate-900 min-w-[24px]">1.</div>
              <p className="text-slate-600"><strong>Confidentiality:</strong> What is shared in the group stays in the group. You agree not to disclose the identities or personal stories of other participants to anyone outside the session.</p>
            </div>
            <div className="flex gap-4">
              <div className="font-bold text-slate-900 min-w-[24px]">2.</div>
              <p className="text-slate-600"><strong>Respect:</strong> We maintain a non-judgmental stance. Hate speech, bullying, or aggressive behavior will result in immediate removal.</p>
            </div>
            <div className="flex gap-4">
              <div className="font-bold text-slate-900 min-w-[24px]">3.</div>
              <p className="text-slate-600"><strong>Sobriety:</strong> Participants agree to attend sessions free from the influence of substances to ensure presence and safety.</p>
            </div>
            <div className="flex gap-4">
              <div className="font-bold text-slate-900 min-w-[24px]">4.</div>
              <p className="text-slate-600"><strong>Visual Privacy:</strong> Please join from a private space where others cannot overhear the group. Headphones are highly recommended.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};