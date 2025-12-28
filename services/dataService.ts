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
        // If table is empty or error, use fallback without throwing
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

  saveContent: async (content: SiteContent): Promise<void> => {
    const dbPayload = {
      id: 1, // Singleton row
      hero_title: content.heroTitle,
      hero_subtitle: content.heroSubtitle,
      about_text: content.aboutText,
      methodology_text: content.methodologyText,
      contact_email: content.contactEmail,
      contact_phone: content.contactPhone,
      organization_name: content.organizationName,
      logo_url: content.logoUrl,
      global_schedule_status: content.globalScheduleStatus
    };

    const { error } = await supabase
      .from('site_content')
      .upsert(dbPayload);

    if (error) {
      console.error('Error saving content:', error.message);
      throw error;
    }
  },

  // -- GROUPS --
  getGroups: async (): Promise<GroupOffering[]> => {
    try {
      // NOTE: Changed table name to 'group_offerings' to avoid Postgres reserved keyword 'groups'
      const { data, error } = await supabase
        .from('group_offerings')
        .select('*');

      if (error) {
        console.warn('Error fetching groups (using fallback):', error.message);
        return INITIAL_GROUPS;
      }

      if (!data || data.length === 0) {
        return INITIAL_GROUPS;
      }

      return data.map((g: any) => ({
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
        // Fallback to local search if DB fetch fails
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

  upsertGroup: async (group: GroupOffering): Promise<void> => {
    const dbPayload = {
      id: group.id,
      title: group.title,
      description: group.description,
      long_description: group.longDescription,
      benefits: group.benefits,
      type: group.type,
      schedule: group.schedule,
      facilitator: group.facilitator,
      image: group.image,
      active: group.active,
      focus: group.focus
    };

    const { error } = await supabase
      .from('group_offerings')
      .upsert(dbPayload);

    if (error) {
      console.error("Error saving group:", error.message);
      throw error;
    }
  },

  deleteGroup: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('group_offerings')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // -- BLOG POSTS --
  getBlogPosts: async (): Promise<BlogPost[]> => {
    try {
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
        excerpt: p.excerpt,
        content: p.content,
        author: p.author,
        publishDate: p.publish_date,
        imageUrl: p.image_url,
        tags: p.tags || []
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
        excerpt: data.excerpt,
        content: data.content,
        author: data.author,
        publishDate: data.publish_date,
        imageUrl: data.image_url,
        tags: data.tags || []
      };
    } catch (e) {
      return INITIAL_BLOG_POSTS.find(p => p.id === id) || null;
    }
  },

  upsertPost: async (post: BlogPost): Promise<void> => {
    const dbPayload = {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      publish_date: post.publishDate,
      image_url: post.imageUrl,
      tags: post.tags
    };

    const { error } = await supabase
      .from('posts')
      .upsert(dbPayload);

    if (error) {
       console.error("Error saving post:", error.message);
       throw error;
    }
  },

  deletePost: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  resetData: () => {
    alert("This function is disabled in Cloud Mode.");
  }
};