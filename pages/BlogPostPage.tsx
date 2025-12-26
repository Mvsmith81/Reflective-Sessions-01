import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { DataService } from '../services/dataService';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = DataService.getBlogPostById(postId || '');

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero */}
      <div className="h-[400px] w-full relative overflow-hidden bg-slate-900">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="absolute top-8 left-4 md:left-8 z-20">
           <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full transition-colors text-sm font-medium">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
           </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-32 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12">
           <div className="flex flex-wrap gap-2 mb-6">
             {post.tags?.map(tag => (
               <span key={tag} className="px-3 py-1 bg-purple-50 text-[#A855F7] text-xs font-bold uppercase tracking-wider rounded-full">
                 {tag}
               </span>
             ))}
           </div>
           
           <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">{post.title}</h1>
           
           <div className="flex items-center gap-6 text-sm text-slate-500 mb-10 pb-10 border-b border-slate-100">
              <div className="flex items-center gap-2">
                 <Calendar className="h-4 w-4" /> {post.publishDate}
              </div>
              <div className="flex items-center gap-2">
                 <User className="h-4 w-4" /> {post.author}
              </div>
           </div>

           <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed font-light">
             {post.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-6">{paragraph}</p>
             ))}
           </div>

           <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
              <Link to="/blog" className="text-slate-500 hover:text-slate-900 font-medium text-sm flex items-center gap-2">
                 <ArrowLeft className="h-4 w-4" /> Back to Articles
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};