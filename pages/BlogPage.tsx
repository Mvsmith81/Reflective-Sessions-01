import React, { useEffect, useState } from 'react';
import { DataService } from '../services/dataService';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DataService.getBlogPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading Articles...</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-purple-900/50"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Reflective Insights</h1>
           <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
             Articles, resources, and reflections on community healing, transitions, and personal growth.
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group h-full">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-[#4DA3FF]/10 transition-all duration-300 flex flex-col h-full border border-slate-100 hover:-translate-y-1">
                 <div className="h-56 overflow-hidden relative">
                   <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                 </div>
                 <div className="p-6 flex-grow flex flex-col">
                   <div className="flex flex-wrap gap-2 mb-4">
                     {post.tags?.map(tag => (
                       <span key={tag} className="px-2.5 py-1 bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wider rounded-md border border-slate-100">
                         {tag}
                       </span>
                     ))}
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#4DA3FF] transition-colors line-clamp-2">
                     {post.title}
                   </h3>
                   <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                     {post.excerpt}
                   </p>
                   <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                         <Calendar className="h-3 w-3" /> {post.publishDate}
                      </div>
                      <span className="text-sm font-semibold text-[#4DA3FF] flex items-center gap-1">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                   </div>
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};