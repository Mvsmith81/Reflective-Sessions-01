import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { DataService } from '../services/dataService';

export const ContactPage: React.FC = () => {
  const content = DataService.getContent();

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header with Image */}
      <div className="relative bg-slate-900 py-24 lg:py-32 overflow-hidden">
        <img 
          src="https://blogger.googleusercontent.com/img/a/AVvXsEgqkP6VvZ9QzMRzPQBDd1LzkVxhhz_Spz2XZdMR_t5Ovkci9x0wiQaTbTLb7yt0SlkYNvIyZeHcMVHoWZKuYJDfH95AgIDb_jmhNgqIWpAkWAT9OUtisyw18E1USSkVi1K2DW1sBstAfjv53DobBZuTamOiNntL0z9ePG8ND3kDsqQ_dtus5x9Rl-74w244=w640-h426" 
          alt="Contact Header" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/90"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto font-light">
            Have questions about our groups or need help finding the right fit?
            Reach out to our team at DreamU Psychiatric Support Services.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Get in Touch</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-blue-50 p-3.5 rounded-xl text-[#4DA3FF] shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Phone</h4>
                    <p className="text-slate-600 font-medium">{content.contactPhone}</p>
                    <p className="text-xs text-slate-400 mt-1">Mon-Fri, 9am - 5pm EST</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="bg-purple-50 p-3.5 rounded-xl text-[#A855F7] shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Email</h4>
                    <p className="text-slate-600 font-medium break-all">{content.contactEmail}</p>
                    <p className="text-xs text-slate-400 mt-1">General inquiries & support</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-emerald-50 p-3.5 rounded-xl text-emerald-500 shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Office Location</h4>
                    <p className="text-slate-600 font-medium">Youngstown, OH</p>
                    <p className="text-xs text-slate-400 mt-1">DreamU Psychiatric Support Services</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200">
               <h4 className="font-bold text-slate-900 mb-2">Crisis Resources</h4>
               <p className="text-sm text-slate-600 mb-4">
                 Reflective Sessions is not a crisis service. If you are experiencing a medical or psychiatric emergency, please contact:
               </p>
               <ul className="text-sm space-y-2">
                 <li><strong>988</strong> - Suicide & Crisis Lifeline (Call or Text)</li>
                 <li><strong>911</strong> - Emergency Services</li>
               </ul>
            </div>
          </div>

          {/* Google Form Iframe */}
          <div className="bg-white p-2 md:p-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden min-h-[800px]">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSdSFUeaeQxVN6erodGClVDaLGaAVbSEttTk1adFSrw28u0zDQ/viewform?embedded=true" 
              width="100%" 
              height="100%"
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0}
              className="w-full h-full"
              title="Contact Form"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};