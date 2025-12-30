import React, { useEffect, useState } from 'react';
import { DataService } from '../services/dataService';
import { Calendar, ArrowRight, ExternalLink, RefreshCw } from 'lucide-react';
import { BlogPost } from '../types';

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await DataService.getBlogPosts();
      if (data.length === 0) {
        // Simple check: if empty, might be an error or just no posts.
        // In a real RSS fail scenario, getBlogPosts returns empty array per current logic.
        // We can treat empty as 'no posts' or 'error' depending on preference, 
        // but let's assume if it's empty right now it might be a fetch issue given the context.
      }
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <RefreshCw className="h-8 w-8 text-[#4DA3FF] animate-spin" />
        <p className="text-slate-500 font-medium">Loading Articles...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-purple-900/50"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Reflective Insights</h1>
           <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
             Articles, resources, and reflections on community healing, transitions, and personal growth.
           </p>
           <div className="mt-8">
             <a 
               href="https://blog.reflectivesessions.org" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors text-sm font-medium backdrop-blur-sm border border-white/10"
             >
               Visit Full Blog <ExternalLink className="h-4 w-4" />
             </a>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        
        {posts.length === 0 && !loading && (
           <div className="bg-white p-12 rounded-2xl text-center shadow-lg text-slate-500">
             <p>Unable to load posts at this time. Please visit our blog directly.</p>
             <a 
               href="https://blog.reflectivesessions.org" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-[#4DA3FF] font-medium mt-4 inline-block hover:underline"
             >
               Go to blog.reflectivesessions.org
             </a>
           </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <div key={post.id} className="group h-full flex flex-col">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-[#4DA3FF]/10 transition-all duration-300 flex flex-col h-full border border-slate-100 hover:-translate-y-1">
                 
                 {/* Image */}
                 <div className="h-56 overflow-hidden relative bg-slate-100">
                   <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80';
                      }}
                   />
                 </div>

                 {/* Content */}
                 <div className="p-6 flex-grow flex flex-col">
                   <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#4DA3FF] transition-colors line-clamp-2">
                     {post.title}
                   </h3>
                   <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                     {post.excerpt}
                   </p>
                   
                   <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                         <Calendar className="h-3 w-3" /> {post.publishDate}
                      </div>
                      
                      <a 
                        href={post.externalLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[#4DA3FF] flex items-center gap-1 hover:text-[#A855F7] transition-colors"
                      >
                        Read Article <ExternalLink className="h-3 w-3" />
                      </a>
                   </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length > 0 && (
          <div className="mt-16 text-center">
            <a 
               href="https://blog.reflectivesessions.org" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-600 font-medium rounded-full shadow-sm hover:shadow-md hover:border-[#4DA3FF] hover:text-[#4DA3FF] transition-all"
            >
               View All Posts on Blogger <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};