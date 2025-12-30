import React, { useState, useEffect } from 'react';
import { DataService } from '../../services/dataService';
import { supabase } from '../../services/supabaseClient';
import { GroupOffering, SiteContent, GroupType, BlogPost } from '../../types';
import { 
  LayoutDashboard, Users, FileText, Plus, Trash2, Edit2, Save, 
  LogOut, RefreshCw, Calendar, ExternalLink, BookOpen, Image as ImageIcon,
  ChevronRight, Search, BarChart3, Globe, Shield, PenTool, CheckCircle, XCircle,
  Menu, X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// -- UI Primitives --

const InputGroup: React.FC<{ label: string; children: React.ReactNode; subLabel?: string }> = ({ label, children, subLabel }) => (
  <div className="mb-5">
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      {label}
    </label>
    {children}
    {subLabel && <p className="text-xs text-slate-400 mt-1.5">{subLabel}</p>}
  </div>
);

const ModernInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    {...props}
    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-[#4DA3FF]/50 focus:border-[#4DA3FF] block p-3 transition-all outline-none hover:bg-white"
  />
);

const ModernTextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea 
    {...props}
    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-[#4DA3FF]/50 focus:border-[#4DA3FF] block p-3 transition-all outline-none hover:bg-white min-h-[120px]"
  />
);

const PrimaryButton: React.FC<{ onClick: () => void; children: React.ReactNode; icon?: React.ReactNode; disabled?: boolean }> = ({ onClick, children, icon, disabled }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-sm px-5 py-2.5 text-center transition-all shadow-lg shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {icon} {children}
  </button>
);

const SecondaryButton: React.FC<{ onClick: () => void; children: React.ReactNode; disabled?: boolean }> = ({ onClick, children, disabled }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center gap-2 text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 focus:ring-4 focus:outline-none focus:ring-slate-100 font-medium rounded-xl text-sm px-5 py-2.5 text-center transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {children}
  </button>
);

const StatsCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; trend?: string }> = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{value}</h3>
        {trend && <p className="text-emerald-500 text-xs font-medium mt-2 flex items-center gap-1">↑ {trend}</p>}
      </div>
      <div className="p-3 bg-slate-50 rounded-xl text-[#4DA3FF]">
        {icon}
      </div>
    </div>
  </div>
);

// -- Editors --

const GroupEditor: React.FC = () => {
  const [groups, setGroups] = useState<GroupOffering[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<GroupOffering>>({});
  const [saving, setSaving] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const fetchGroups = async () => {
    setLoading(true);
    const data = await DataService.getGroups();
    setGroups(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const startEdit = (group?: GroupOffering) => {
    if (group) {
      setEditingId(group.id);
      setForm(group);
    } else {
      setEditingId('new');
      setForm({
        id: crypto.randomUUID(),
        title: '',
        description: '',
        longDescription: '',
        benefits: [],
        active: true,
        type: GroupType.SUPPORT,
        image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80',
        focus: '',
        schedule: '',
        facilitator: ''
      });
    }
  };

  const saveGroup = async () => {
    if (!form.id || !form.title) return;
    setSaving(true);
    try {
      const groupToSave = form as GroupOffering;
      await DataService.upsertGroup(groupToSave);
      
      setGroups(prevGroups => {
        const existingIndex = prevGroups.findIndex(g => g.id === groupToSave.id);
        if (existingIndex >= 0) {
          const updated = [...prevGroups];
          updated[existingIndex] = groupToSave;
          return updated;
        } else {
          return [...prevGroups, groupToSave];
        }
      });
      
      setEditingId(null);
    } catch (e: any) {
      alert(e.message || "Failed to save group.");
    } finally {
      setSaving(false);
    }
  };

  const deleteGroup = async (id: string) => {
    if (confirm('Are you sure? This cannot be undone.')) {
      try {
        await DataService.deleteGroup(id);
        await fetchGroups();
      } catch (e: any) {
        alert(e.message || "Failed to delete group.");
      }
    }
  };

  const restoreDefaults = async () => {
    if (confirm("Restore default groups? This will overwrite changes to the original 4 groups but keep your custom groups.")) {
      setRestoring(true);
      try {
        await DataService.restoreDefaultGroups();
        await fetchGroups();
        alert('Default groups restored successfully.');
      } catch (e: any) {
        alert(e.message || "Failed to restore groups.");
      } finally {
        setRestoring(false);
      }
    }
  };

  const generateDescription = () => {
    setForm({
      ...form,
      description: "AI Generated: This group provides a structured, supportive environment for individuals to explore [Topic]. Through facilitated dialogue and psychoeducational modules, participants will learn practical tools for resilience. (Mock Output)"
    });
  };

  if (editingId) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-slate-100 gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{editingId === 'new' ? 'Create New Group' : 'Edit Group Details'}</h3>
            <p className="text-slate-400 text-sm">Configure the public facing details for this cohort.</p>
          </div>
          <SecondaryButton onClick={() => setEditingId(null)}>Cancel</SecondaryButton>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                 <InputGroup label="Group Title">
                   <ModernInput value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Navigating Transitions" />
                 </InputGroup>
              </div>
              <div className="w-full md:w-48">
                 <InputGroup label="Status">
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-[#4DA3FF]/50 focus:border-[#4DA3FF] block p-3 transition-all outline-none"
                      value={form.active ? 'true' : 'false'}
                      onChange={e => setForm({...form, active: e.target.value === 'true'})}
                    >
                      <option value="true">Active (Public)</option>
                      <option value="false">Draft (Hidden)</option>
                    </select>
                 </InputGroup>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <InputGroup label="Focus Area">
                  <ModernInput value={form.focus} onChange={e => setForm({...form, focus: e.target.value})} placeholder="e.g. Burnout" />
               </InputGroup>
               <InputGroup label="Facilitator">
                  <ModernInput value={form.facilitator} onChange={e => setForm({...form, facilitator: e.target.value})} placeholder="e.g. Jane Doe" />
               </InputGroup>
            </div>

            <InputGroup label="Short Description">
              <div className="relative">
                <ModernTextArea value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                <button onClick={generateDescription} className="absolute bottom-3 right-3 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded-md flex items-center gap-1 transition-colors">
                  <RefreshCw className="h-3 w-3" /> AI Assist
                </button>
              </div>
            </InputGroup>

             <InputGroup label="Long Description (Detail Page)">
              <ModernTextArea 
                value={form.longDescription || form.description} 
                onChange={e => setForm({...form, longDescription: e.target.value})} 
                rows={6}
              />
            </InputGroup>
            
            <InputGroup label="Key Takeaways (Benefits)" subLabel="Enter one benefit per line">
              <ModernTextArea 
                value={form.benefits?.join('\n') || ''} 
                onChange={e => setForm({...form, benefits: e.target.value.split('\n')})}
                placeholder="Understand the psychology...&#10;Develop a plan...&#10;Process grief..."
                rows={4}
              />
            </InputGroup>
          </div>

          <div className="space-y-6">
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <InputGroup label="Schedule">
                   <ModernInput value={form.schedule} onChange={e => setForm({...form, schedule: e.target.value})} placeholder="e.g. Tuesdays, 6 PM" />
                </InputGroup>
                <InputGroup label="Cover Image URL">
                   <ModernInput value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
                </InputGroup>
                {form.image && (
                  <div className="mt-4 rounded-xl overflow-hidden h-32 w-full relative">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                )}
             </div>
             
             <div className="flex flex-col gap-3">
               <PrimaryButton onClick={saveGroup} disabled={saving} icon={<Save className="h-4 w-4" />}>
                 {saving ? 'Saving...' : 'Save Changes'}
               </PrimaryButton>
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-10 text-center text-slate-500">Loading Groups...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h3 className="text-lg font-bold text-slate-900">Active Groups</h3>
           <p className="text-slate-500 text-sm">Manage your current offerings and cohorts.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <SecondaryButton onClick={restoreDefaults} disabled={restoring}>
            <RefreshCw className={`h-4 w-4 ${restoring ? 'animate-spin' : ''}`} />
            {restoring ? 'Restoring...' : 'Restore Defaults'}
          </SecondaryButton>
          <PrimaryButton onClick={() => startEdit()} icon={<Plus className="h-4 w-4" />}>Add Group</PrimaryButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {groups.map(group => (
          <div 
            key={group.id} 
            onClick={() => startEdit(group)}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#4DA3FF] transition-all group-card relative overflow-hidden cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full sm:w-20 h-32 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 relative">
                <img src={group.image} className={`w-full h-full object-cover ${!group.active && 'grayscale opacity-70'}`} alt="" />
                {!group.active && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                     <XCircle className="text-white h-6 w-6" />
                   </div>
                )}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider inline-block ${group.active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    {group.active ? 'Active' : 'Draft'}
                  </span>
                  <div className="flex gap-1">
                     <button 
                        onClick={(e) => { e.stopPropagation(); startEdit(group); }} 
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-[#4DA3FF] transition-colors"
                        title="Edit Group"
                     >
                        <Edit2 className="h-4 w-4" />
                     </button>
                     <button 
                        onClick={(e) => { e.stopPropagation(); deleteGroup(group.id); }} 
                        className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete Group"
                     >
                        <Trash2 className="h-4 w-4" />
                     </button>
                  </div>
                </div>
                <h4 className="font-bold text-slate-900 leading-tight">{group.title}</h4>
                <div className="text-xs text-slate-500 mt-2 flex items-center gap-2">
                   <Calendar className="h-3 w-3" /> {group.schedule}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogEditor: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({});
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const data = await DataService.getBlogPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const startEdit = (post?: BlogPost) => {
    if (post) {
      setEditingId(post.id);
      setForm(post);
    } else {
      setEditingId('new');
      setForm({
        id: crypto.randomUUID(),
        title: '',
        author: 'Reflective Sessions Team',
        publishDate: new Date().toLocaleDateString(),
        imageUrl: 'https://images.unsplash.com/photo-1499750310159-52f8f4347504?auto=format&fit=crop&q=80',
        excerpt: '',
        content: '',
        tags: []
      });
    }
  };

  const savePost = async () => {
    if (!form.id || !form.title) return;
    setSaving(true);
    try {
      await DataService.upsertPost(form as BlogPost);
      await fetchPosts();
      setEditingId(null);
    } catch (e: any) {
      alert(e.message || "Failed to save post.");
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id: string) => {
    if (confirm('Delete this post?')) {
      try {
        await DataService.deletePost(id);
        await fetchPosts();
      } catch (e: any) {
         alert(e.message || "Failed to delete post.");
      }
    }
  };

  if (editingId) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-slate-100 gap-4">
           <div>
             <h3 className="text-xl font-bold text-slate-900">Article Editor</h3>
             <p className="text-slate-400 text-sm">Write thoughts, updates, and psychoeducational content.</p>
           </div>
           <SecondaryButton onClick={() => setEditingId(null)}>Cancel</SecondaryButton>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          <InputGroup label="Article Title">
             <ModernInput value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="text-lg font-semibold" placeholder="Enter a catchy title..." />
          </InputGroup>

          <InputGroup label="Content" subLabel="Main article body. Supports basic line breaks.">
             <ModernTextArea value={form.content} onChange={e => setForm({...form, content: e.target.value})} style={{ minHeight: '400px', fontFamily: 'monospace'}} />
          </InputGroup>

          <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-400">
             Note: Author, Image, and Date are managed automatically or using defaults to ensure database compatibility.
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-end gap-3">
             <SecondaryButton onClick={() => setEditingId(null)}>Discard</SecondaryButton>
             <PrimaryButton onClick={savePost} disabled={saving} icon={<Save className="h-4 w-4" />}>
               {saving ? 'Saving...' : 'Publish Article'}
             </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-10 text-center text-slate-500">Loading Posts...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h3 className="text-lg font-bold text-slate-900">Blog Posts</h3>
           <p className="text-slate-500 text-sm">Manage your publication feed.</p>
        </div>
        <PrimaryButton onClick={() => startEdit()} icon={<PenTool className="h-4 w-4" />}>Write Post</PrimaryButton>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
         {posts.length === 0 && <div className="p-6 text-center text-slate-400">No posts found. Create one!</div>}
         {posts.map((post, idx) => (
           <div key={post.id} className={`p-5 flex flex-col sm:flex-row items-center justify-between hover:bg-slate-50 transition-colors gap-4 ${idx !== posts.length -1 ? 'border-b border-slate-50' : ''}`}>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                 <div className="h-12 w-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                    <img src={post.imageUrl} className="w-full h-full object-cover" alt="" />
                 </div>
                 <div className="min-w-0 flex-grow">
                    <h4 className="font-bold text-slate-900 truncate">{post.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                       <span>{post.publishDate}</span>
                       <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300"></span>
                       <span className="hidden sm:inline">{post.author}</span>
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                 <button onClick={() => startEdit(post)} className="text-sm font-medium text-slate-500 hover:text-[#4DA3FF] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">Edit</button>
                 <button onClick={() => deletePost(post.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

const ContentCMS: React.FC = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    DataService.getContent().then(c => {
      setContent(c);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    if (content) {
      setSaving(true);
      try {
        await DataService.saveContent(content);
        alert('Site content updated!');
      } catch (e: any) {
        alert(e.message || "Failed to save content.");
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading || !content) return <div className="p-10 text-center text-slate-500">Loading Content...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h3 className="text-lg font-bold text-slate-900">Content Management</h3>
           <p className="text-slate-500 text-sm">Update global site settings and text.</p>
        </div>
        <PrimaryButton onClick={handleSave} disabled={saving} icon={<Save className="h-4 w-4" />}>
           {saving ? 'Saving...' : 'Save Changes'}
        </PrimaryButton>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
           <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
             <Globe className="h-5 w-5 text-slate-400" /> General Settings
           </h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="md:col-span-2">
                <InputGroup label="Organization Name">
                    <ModernInput value={content.organizationName} onChange={e => setContent({...content, organizationName: e.target.value})} />
                </InputGroup>
             </div>
             <InputGroup label="Organization Logo URL">
                <ModernInput value={content.logoUrl || ''} onChange={e => setContent({...content, logoUrl: e.target.value})} />
             </InputGroup>
             <div className="hidden md:block"></div>
             <InputGroup label="Contact Email">
                 <ModernInput value={content.contactEmail} onChange={e => setContent({...content, contactEmail: e.target.value})} />
              </InputGroup>
              <InputGroup label="Contact Phone">
                 <ModernInput value={content.contactPhone} onChange={e => setContent({...content, contactPhone: e.target.value})} />
              </InputGroup>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
           <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
             <Shield className="h-5 w-5 text-slate-400" /> Hero & Messaging
           </h4>
           <InputGroup label="Hero Headline">
              <ModernInput value={content.heroTitle} onChange={e => setContent({...content, heroTitle: e.target.value})} />
           </InputGroup>
           <InputGroup label="Hero Subtitle">
              <ModernTextArea value={content.heroSubtitle} onChange={e => setContent({...content, heroSubtitle: e.target.value})} style={{ minHeight: '80px' }} />
           </InputGroup>
           <InputGroup label="Philosophy / About Text" subLabel="Appears in the 'Philosophy' section on the homepage.">
              <ModernTextArea value={content.aboutText} onChange={e => setContent({...content, aboutText: e.target.value})} style={{ minHeight: '120px' }} />
           </InputGroup>
           <InputGroup label="Methodology Text">
              <ModernTextArea value={content.methodologyText} onChange={e => setContent({...content, methodologyText: e.target.value})} style={{ minHeight: '120px' }} />
           </InputGroup>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-blue-100">
           <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
             <Calendar className="h-5 w-5 text-[#A855F7]" /> Global Schedule Override
           </h4>
           <p className="text-sm text-slate-600 mb-4">
             If text is present below, the "Schedule" page will display this message instead of the calendar grid. 
             Clear this field to show the active groups list.
           </p>
           <ModernInput 
             value={content.globalScheduleStatus || ''}
             onChange={e => setContent({...content, globalScheduleStatus: e.target.value})}
             placeholder="e.g. Enrollment Closed. New sessions begin March 2026."
             className="bg-white border-blue-200"
           />
        </div>
      </div>
    </div>
  );
};

// -- Main Admin Layout/Router --

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'groups' | 'blog' | 'cms'>('dashboard');
  const [stats, setStats] = useState({ groups: 0, posts: 0 });
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshSuccess, setRefreshSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        navigate('/admin/login', { replace: true });
      }
    });

    Promise.all([DataService.getGroups(), DataService.getBlogPosts()]).then(([g, p]) => {
      setStats({
        groups: g.filter(i => i.active).length,
        posts: p.length
      });
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    setRefreshSuccess(false);
    try {
      const [g, p] = await Promise.all([DataService.getGroups(), DataService.getBlogPosts()]);
      setStats({
        groups: g.filter(i => i.active).length,
        posts: p.length
      });
      
      setRefreshKey(prev => prev + 1);
      
      setRefreshSuccess(true);
      setTimeout(() => setRefreshSuccess(false), 2000);
    } catch (e) {
      console.error("Refresh failed", e);
      alert("Failed to refresh data.");
    } finally {
      setIsRefreshing(false);
    }
  };

  const SidebarItem: React.FC<{ 
    id: string; 
    label: string; 
    icon: React.ReactNode; 
    active: boolean; 
    onClick: () => void 
  }> = ({ label, icon, active, onClick }) => (
    <button 
      onClick={() => {
        onClick();
        setSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? 'bg-white text-slate-900 shadow-sm font-semibold' 
          : 'text-slate-500 hover:bg-white/50 hover:text-slate-700 font-medium'
      }`}
    >
      <div className={`${active ? 'text-[#4DA3FF]' : 'text-slate-400 group-hover:text-slate-600'}`}>{icon}</div>
      {label}
      {active && <ChevronRight className="ml-auto h-4 w-4 text-slate-300" />}
    </button>
  );

  if (!user) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 border-4 border-[#4DA3FF] border-t-transparent rounded-full animate-spin"></div>
      <div className="text-slate-500 font-medium">Loading Dashboard...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-100 border-r border-slate-200 flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:h-screen lg:flex-shrink-0
      `}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 bg-gradient-to-br from-[#4DA3FF] to-[#A855F7] rounded-lg flex items-center justify-center text-white">
                <Shield className="h-4 w-4" />
             </div>
             <h2 className="text-lg font-bold tracking-tight text-slate-900">Reflective Sessions</h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-grow space-y-2 px-4">
          <div className="px-4 pb-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Main Menu</p>
          </div>
          <SidebarItem 
            id="dashboard" 
            label="Dashboard" 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            id="groups" 
            label="Group Offerings" 
            icon={<Users className="h-5 w-5" />} 
            active={activeTab === 'groups'} 
            onClick={() => setActiveTab('groups')} 
          />
          <SidebarItem 
            id="blog" 
            label="Blog Posts" 
            icon={<BookOpen className="h-5 w-5" />} 
            active={activeTab === 'blog'} 
            onClick={() => setActiveTab('blog')} 
          />
          <SidebarItem 
            id="cms" 
            label="Site Content" 
            icon={<FileText className="h-5 w-5" />} 
            active={activeTab === 'cms'} 
            onClick={() => setActiveTab('cms')} 
          />

          <div className="px-4 pb-2 pt-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">External</p>
          </div>
          <a 
            href="https://sites.google.com/view/reflective-sessions-adm/home"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-white/50 hover:text-[#A855F7] transition-all font-medium group"
          >
            <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-[#A855F7]" />
            Admin Hub
          </a>
        </nav>

        <div className="p-6 border-t border-slate-200/60">
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors font-medium">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-10 min-w-0 transition-all duration-300">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-white rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 capitalize tracking-tight">
                {activeTab === 'cms' ? 'Content Management' : activeTab === 'blog' ? 'Blog Management' : activeTab}
              </h1>
              <p className="text-slate-500 mt-1 text-sm">Manage your platform's core content.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
             <button 
               onClick={handleRefreshData}
               disabled={isRefreshing}
               className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                 refreshSuccess 
                   ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                   : 'bg-white text-slate-600 border border-slate-200 hover:border-[#4DA3FF] hover:text-[#4DA3FF]'
               }`}
             >
               <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
               <span className="hidden sm:inline">{isRefreshing ? 'Loading...' : refreshSuccess ? 'Refreshed' : 'Refresh Data'}</span>
             </button>

             <div className="flex items-center gap-3">
               <div className="text-right hidden sm:block">
                  <div className="text-sm font-bold text-slate-900 truncate max-w-[120px]">Admin</div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[120px]">{user?.email}</div>
               </div>
               <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-500 font-bold overflow-hidden">
                 {user?.email ? user.email[0].toUpperCase() : 'A'}
               </div>
             </div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'dashboard' && (
            <div key={refreshKey} className="space-y-8">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatsCard title="Active Groups" value={stats.groups} icon={<Users className="h-6 w-6" />} trend="Current" />
                <StatsCard title="Published Posts" value={stats.posts} icon={<BookOpen className="h-6 w-6" />} trend="Total" />
                <StatsCard title="Total Views" value="--" icon={<BarChart3 className="h-6 w-6" />} trend="--" />
              </div>
              
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-8 rounded-3xl text-white shadow-xl shadow-slate-300/50 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Inquiry Management</h3>
                    <p className="text-slate-300 max-w-lg leading-relaxed text-sm md:text-base">
                      All participant inquiries are currently routed through the Google Forms integration. 
                      Please access the Master Sheet to review and approve new applicants.
                    </p>
                  </div>
                  <a 
                    href="https://docs.google.com/spreadsheets/u/0/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative z-10 w-full md:w-auto px-6 py-3 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors shadow-lg"
                  >
                    Open Master Sheet <ExternalLink className="h-4 w-4" />
                  </a>
              </div>
            </div>
          )}

          {activeTab === 'groups' && <GroupEditor key={refreshKey} />}
          {activeTab === 'blog' && <BlogEditor key={refreshKey} />}
          {activeTab === 'cms' && <ContentCMS key={refreshKey} />}
        </div>
      </main>
    </div>
  );
};