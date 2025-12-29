import { supabase } from './supabaseClient';
import { GroupOffering, SiteContent, BlogPost } from '../types';
import { INITIAL_CONTENT, INITIAL_GROUPS, INITIAL_BLOG_POSTS } from '../constants';

export const DataService = {
  // -- SITE CONTENT --
  getContent: async (): Promise<SiteContent> => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .single();

      if (error) {
        // If table is empty or error, use fallback without throwing (Resilience for public view)
        console.warn('Supabase content fetch failed, using fallback:', error.message);
        return INITIAL_CONTENT;
      }
      
      if (!data) return INITIAL_CONTENT;

      return {
        heroTitle: data.hero_title || INITIAL_CONTENT.heroTitle,
        heroSubtitle: data.hero_subtitle || INITIAL_CONTENT.heroSubtitle,
        aboutText: data.about_text || INITIAL_CONTENT.aboutText,
        methodologyText: data.methodology_text || INITIAL_CONTENT.methodologyText,
        contactEmail: data.contact_email || INITIAL_CONTENT.contactEmail,
        contactPhone: data.contact_phone || INITIAL_CONTENT.contactPhone,
        organizationName: data.organization_name || INITIAL_CONTENT.organizationName,
        logoUrl: data.logo_url || INITIAL_CONTENT.logoUrl,
        globalScheduleStatus: data.global_schedule_status || ''
      };
    } catch (e) {
      console.warn('DataService: using fallback content due to exception.', e);
      return INITIAL_CONTENT;
    }
  },

  // ADMIN WRITE ACTION: Must propagate errors for UI handling
  saveContent: async (content: SiteContent): Promise<void> => {
    const dbPayload = {
      id: 1, // Singleton row
      hero_title: content.heroTitle ?? '',
      hero_subtitle: content.heroSubtitle ?? '',
      about_text: content.aboutText ?? '',
      methodology_text: content.methodologyText ?? '',
      contact_email: content.contactEmail ?? '',
      contact_phone: content.contactPhone ?? '',
      organization_name: content.organizationName ?? '',
      logo_url: content.logoUrl ?? '',
      global_schedule_status: content.globalScheduleStatus ?? ''
    };

    // Explicit onConflict for safety
    const { error } = await supabase
      .from('site_content')
      .upsert(dbPayload, { onConflict: 'id' });

    if (error) {
      console.error('Error saving content:', error.message);
      throw new Error(`Failed to save site content: ${error.message}`);
    }
  },

  // -- GROUPS --
  getGroups: async (): Promise<GroupOffering[]> => {
    try {
      const { data, error } = await supabase
        .from('group_offerings')
        .select('*');

      if (error) {
        console.warn('Error fetching groups (using fallback):', error.message);
        return INITIAL_GROUPS;
      }

      // FIX: If connection succeeds but is empty, return empty array instead of fallback.
      // This prevents the "deletion" confusion where the first real write hides the mock data.
      return (data || []).map((g: any) => ({
        id: g.id,
        title: g.title,
        description: g.description,
        longDescription: g.long_description,
        benefits: g.benefits || [],
        type: g.type,
        schedule: g.schedule,
        facilitator: g.facilitator,
        image: g.image,
        active: g.active,
        focus: g.focus
      }));
    } catch (e) {
      console.warn('DataService: using fallback groups due to exception.', e);
      return INITIAL_GROUPS;
    }
  },

  getGroupById: async (id: string): Promise<GroupOffering | null> => {
    try {
      const { data, error } = await supabase
        .from('group_offerings')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        return INITIAL_GROUPS.find(g => g.id === id) || null;
      }

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        longDescription: data.long_description,
        benefits: data.benefits || [],
        type: data.type,
        schedule: data.schedule,
        facilitator: data.facilitator,
        image: data.image,
        active: data.active,
        focus: data.focus
      };
    } catch (e) {
       return INITIAL_GROUPS.find(g => g.id === id) || null;
    }
  },

  // ADMIN WRITE ACTION: Must propagate errors for UI handling
  upsertGroup: async (group: GroupOffering): Promise<void> => {
    const dbPayload = {
      id: group.id,
      title: group.title || 'Untitled Group',
      description: group.description || '',
      long_description: group.longDescription || group.description || '', // Fallback to short desc if missing
      benefits: group.benefits || [],
      type: group.type,
      schedule: group.schedule || '',
      facilitator: group.facilitator || '',
      image: group.image || '',
      active: group.active ?? false,
      focus: group.focus || ''
    };

    // FIX: Explicitly define onConflict to ensure update vs insert behavior is stable based on ID
    const { error } = await supabase
      .from('group_offerings')
      .upsert(dbPayload, { onConflict: 'id' });

    if (error) {
      console.error("Error saving group:", error.message);
      throw new Error(`Failed to save group: ${error.message}`);
    }
  },

  // ADMIN WRITE ACTION: Must propagate errors for UI handling
  deleteGroup: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('group_offerings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting group:", error.message);
      throw new Error(`Failed to delete group: ${error.message}`);
    }
  },

  // -- BLOG POSTS --
  getBlogPosts: async (): Promise<BlogPost[]> => {
    try {
      // Schema: id, title, body, published, created_at, updated_at
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Error fetching posts (using fallback):', error.message);
        return INITIAL_BLOG_POSTS;
      }

      if (!data || data.length === 0) return INITIAL_BLOG_POSTS;

      return data.map((p: any) => ({
        id: p.id,
        title: p.title,
        // Map DB 'body' to UI 'content'
        content: p.body || '',
        // Map 'created_at' to 'publishDate'
        publishDate: p.created_at ? new Date(p.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
        // Derived or default values for fields not in DB schema
        excerpt: p.body ? p.body.substring(0, 150) + '...' : '', 
        author: 'Reflective Sessions Team', 
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80',
        tags: []
      }));
    } catch (e) {
      console.warn('DataService: using fallback posts due to exception.', e);
      return INITIAL_BLOG_POSTS;
    }
  },

  getBlogPostById: async (id: string): Promise<BlogPost | null> => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        return INITIAL_BLOG_POSTS.find(p => p.id === id) || null;
      }

      return {
        id: data.id,
        title: data.title,
        content: data.body || '',
        publishDate: data.created_at ? new Date(data.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
        excerpt: data.body ? data.body.substring(0, 150) + '...' : '',
        author: 'Reflective Sessions Team',
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80',
        tags: []
      };
    } catch (e) {
      return INITIAL_BLOG_POSTS.find(p => p.id === id) || null;
    }
  },

  // ADMIN WRITE ACTION: Must propagate errors for UI handling
  upsertPost: async (post: BlogPost): Promise<void> => {
    // Schema alignment: Only use fields present in Supabase 'posts' table
    // Removing: excerpt, publish_date, image_url, tags, author
    // Mapping: content -> body
    const dbPayload = {
      id: post.id,
      title: post.title || 'Untitled Post',
      body: post.content || '',
      published: true // Default to published
    };

    const { error } = await supabase
      .from('posts')
      .upsert(dbPayload, { onConflict: 'id' });

    if (error) {
       console.error("Error saving post:", error.message);
       throw new Error(`Failed to save post: ${error.message}`);
    }
  },

  // ADMIN WRITE ACTION: Must propagate errors for UI handling
  deletePost: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting post:", error.message);
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  },

  resetData: () => {
    alert("This function is disabled in Cloud Mode.");
  }
};