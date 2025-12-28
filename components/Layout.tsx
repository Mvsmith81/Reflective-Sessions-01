import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, Anchor, Phone, Mail, Globe } from 'lucide-react';
import { DataService } from '../services/dataService';
import { SiteContent } from '../types';
import { INITIAL_CONTENT } from '../constants';

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    DataService.getContent().then(setContent);
  }, []);

  // Branding:
  // Gradient: from-[#4DA3FF] to-[#A855F7]
  // Backgrounds: White / Slate-50

  const isActive = (path: string) => location.pathname === path 
    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#4DA3FF] to-[#A855F7] font-semibold cursor-default" 
    : "text-slate-600 hover:text-[#4DA3FF] transition-colors cursor-pointer";

  const handleNav = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
      {/* Top Bar - Gradient background */}
      <div className="bg-gradient-to-r from-slate-50 to-white text-slate-500 py-2 px-4 text-xs tracking-wide text-center border-b border-slate-100">
        Affiliated with {content.organizationName} | <span className="text-[#A855F7] font-semibold">Accepting New Inquiries</span>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              {content.logoUrl ? (
                <img src={content.logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
              ) : (
                <div className="p-2 bg-gradient-to-br from-[#4DA3FF]/10 to-[#A855F7]/10 rounded-xl group-hover:from-[#4DA3FF]/20 group-hover:to-[#A855F7]/20 transition-all">
                  <Anchor className="h-6 w-6 text-[#4DA3FF]" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4DA3FF] to-[#A855F7] leading-tight tracking-tight">
                  Reflective Sessions
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Structured Support</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className={isActive("/")}>Home</Link>
              <Link to="/how-it-works" className={isActive("/how-it-works")}>How It Works</Link>
              <button onClick={() => handleNav('offerings')} className="text-slate-600 hover:text-[#4DA3FF] transition-colors font-medium">Groups</button>
              <Link to="/blog" className={isActive("/blog")}>Blog</Link>
              <Link to="/contact" className={isActive("/contact")}>Contact</Link>
              <Link 
                to="/group-intake"
                className="bg-gradient-to-r from-[#4DA3FF] to-[#A855F7] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 transform hover:-translate-y-0.5"
              >
                Start Intake
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:text-[#A855F7]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 shadow-xl animate-in slide-in-from-top-2">
            <Link to="/" className="block py-2 text-slate-900 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/how-it-works" className="block py-2 text-slate-600" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
            <button className="block w-full text-left py-2 text-slate-600" onClick={() => handleNav('offerings')}>Group Offerings</button>
            <Link to="/blog" className="block py-2 text-slate-600" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link to="/contact" className="block py-2 text-slate-600" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link to="/login" className="block py-2 text-[#4DA3FF] text-sm mt-4 border-t border-slate-100 pt-4" onClick={() => setIsMenuOpen(false)}>Staff Portal</Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-100 pt-16 pb-8 text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Brand */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Reflective Sessions</h3>
              <p className="text-sm leading-relaxed mb-6 max-w-xs text-slate-600">
                A program of {content.organizationName}. Providing structured, safe environments for personal growth and community connection.
              </p>
              <div className="text-xs text-slate-400 mb-4">
                Based in Youngstown, OH • Serving Clients Virtually
              </div>
              <div className="flex items-center gap-2 text-[#A855F7] text-sm font-medium">
                <Shield className="h-4 w-4" />
                <span>Ethically Facilitated</span>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-4 uppercase text-xs tracking-wider">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 hover:text-[#4DA3FF] transition-colors">
                  <Mail className="h-4 w-4 text-[#4DA3FF]" />
                  {content.contactEmail}
                </li>
                <li className="flex items-center gap-3 hover:text-[#4DA3FF] transition-colors">
                   <Globe className="h-4 w-4 text-[#4DA3FF]" />
                   <a href="https://dreamucares.org" target="_blank" rel="noopener noreferrer" className="hover:underline">
                     Visit DreamU Website
                   </a>
                </li>
                <li className="flex items-center gap-3 hover:text-[#4DA3FF] transition-colors">
                  <Phone className="h-4 w-4 text-[#4DA3FF]" />
                  {content.contactPhone}
                </li>
                <li className="text-slate-400 italic pt-2">
                  Note: We are not a crisis service. In an emergency, please call 988.
                </li>
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-4 uppercase text-xs tracking-wider">Legal & Admin</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog" className="hover:text-[#4DA3FF]">Blog</Link></li>
                <li><Link to="/legal" className="hover:text-[#4DA3FF]">Privacy Policy</Link></li>
                <li><Link to="/legal" className="hover:text-[#4DA3FF]">Terms of Service</Link></li>
                <li className="pt-4">
                  <Link to="/login" className="text-slate-400 hover:text-slate-600 text-xs transition-colors">Staff Login</Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-400 text-xs">
            © {new Date().getFullYear()} Reflective Sessions by DreamU. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};