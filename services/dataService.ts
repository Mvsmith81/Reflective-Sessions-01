import { supabase } from './supabaseClient';
import { GroupOffering, SiteContent, BlogPost } from '../types';
import { INITIAL_CONTENT, INITIAL_GROUPS, BLOG_RSS_URL } from '../constants';
import { DEFAULT_GROUPS } from './defaultGroups';

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
      // Ensure we fetch ALL groups and order them consistently (by title)
      const { data, error } = await supabase
        .from('group_offerings')
        .select('*')
        .order('title', { ascending: true });

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

    // FIX: Explicitly define onConflict to ensure update vs insert behavior is stable based on ID.
    // This ensures we ONLY update the specific row with this ID, never wiping the table.
    const { error } = await supabase
      .from('group_offerings')
      .upsert(dbPayload, { onConflict: 'id' });

    if (error) {
      console.error("Error saving group:", error.message);
      throw new Error(`Failed to save group: ${error.message}`);
    }
  },

  // ADMIN WRITE ACTION: Upsert all default groups. 
  // This will overwrite the 4 default groups if they have been modified, 
  // but will leave any other custom groups intact.
  restoreDefaultGroups: async (): Promise<void> => {
    const payloads = DEFAULT_GROUPS.map(group => ({
      id: group.id,
      title: group.title || 'Untitled Group',
      description: group.description || '',
      long_description: group.longDescription || group.description || '',
      benefits: group.benefits || [],
      type: group.type,
      schedule: group.schedule || '',
      facilitator: group.facilitator || '',
      image: group.image || '',
      active: group.active ?? false,
      focus: group.focus || ''
    }));

    const { error } = await supabase
      .from('group_offerings')
      .upsert(payloads, { onConflict: 'id' });

    if (error) {
      console.error("Error restoring default groups:", error.message);
      throw new Error(`Failed to restore default groups: ${error.message}`);
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

  // -- BLOG POSTS (RSS) --
  getBlogPosts: async (): Promise<BlogPost[]> => {
    try {
      // Use AllOrigins proxy to bypass CORS restrictions on client-side fetch
      const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(BLOG_RSS_URL);
      const response = await fetch(proxyUrl);
      
      if (!response.ok) throw new Error('Failed to fetch RSS feed');
      
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const items = Array.from(xml.querySelectorAll("item"));

      // Helper to clean HTML text
      const stripHtml = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
      };

      // Helper to extract first image
      const extractImage = (html: string): string => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const img = doc.querySelector('img');
        return img ? img.src : 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80';
      };

      return items.slice(0, 10).map((item) => {
        const title = item.querySelector("title")?.textContent || "Untitled Post";
        const link = item.querySelector("link")?.textContent || "#";
        const pubDateStr = item.querySelector("pubDate")?.textContent || "";
        const descriptionHtml = item.querySelector("description")?.textContent || "";
        
        // Try content:encoded if description is empty or short, though standard RSS usually puts full content in description for Blogger
        const content = descriptionHtml; 
        
        return {
          id: link, // Use URL as unique ID
          title: title,
          content: content,
          publishDate: pubDateStr ? new Date(pubDateStr).toLocaleDateString() : 'Recent',
          excerpt: stripHtml(content).substring(0, 200) + '...',
          author: 'Reflective Sessions Team',
          imageUrl: extractImage(content),
          tags: [],
          externalLink: link
        };
      });

    } catch (e) {
      console.error('Error fetching RSS feed:', e);
      return [];
    }
  },

  getBlogPostById: async (id: string): Promise<BlogPost | null> => {
    try {
      const posts = await DataService.getBlogPosts();
      const decodedId = decodeURIComponent(id);
      return posts.find(p => p.id === id || p.id === decodedId) || null;
    } catch (e) {
      console.error('Error fetching blog post by id:', e);
      return null;
    }
  },

  resetData: () => {
    alert("This function is disabled in Cloud Mode.");
  }
};