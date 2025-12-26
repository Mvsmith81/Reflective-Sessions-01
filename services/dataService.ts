import { GroupOffering, SiteContent, BlogPost } from '../types';
import { INITIAL_CONTENT, INITIAL_GROUPS, INITIAL_BLOG_POSTS } from '../constants';

const STORAGE_KEYS = {
  CONTENT: 'rs_content',
  GROUPS: 'rs_groups',
  BLOG: 'rs_blog_posts'
};

export const DataService = {
  getContent: (): SiteContent => {
    const stored = localStorage.getItem(STORAGE_KEYS.CONTENT);
    return stored ? JSON.parse(stored) : INITIAL_CONTENT;
  },

  saveContent: (content: SiteContent): void => {
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(content));
  },

  getGroups: (): GroupOffering[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.GROUPS);
    return stored ? JSON.parse(stored) : INITIAL_GROUPS;
  },

  getGroupById: (id: string): GroupOffering | undefined => {
    const groups = DataService.getGroups();
    return groups.find(g => g.id === id);
  },

  saveGroups: (groups: GroupOffering[]): void => {
    localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
  },

  getBlogPosts: (): BlogPost[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.BLOG);
    return stored ? JSON.parse(stored) : INITIAL_BLOG_POSTS;
  },

  getBlogPostById: (id: string): BlogPost | undefined => {
    const posts = DataService.getBlogPosts();
    return posts.find(p => p.id === id);
  },

  saveBlogPosts: (posts: BlogPost[]): void => {
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(posts));
  },

  resetData: () => {
    localStorage.clear();
    window.location.reload();
  }
};