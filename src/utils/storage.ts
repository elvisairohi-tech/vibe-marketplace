import { 
  UserProfile, 
  MarketplaceItem, 
  SocialPost, 
  StoryPulse, 
  Conversation, 
  LocationScope, 
  LocationInfo 
} from '../types';
import { 
  MOCK_USERS, 
  MOCK_ITEMS, 
  MOCK_POSTS, 
  MOCK_STORIES, 
  MOCK_CONVERSATIONS, 
  CURRENT_USER 
} from '../data/mockData';

const STORAGE_KEYS = {
  USERS: 'vibe_users_v1',
  CURRENT_USER_ID: 'vibe_current_user_id_v1',
  ITEMS: 'vibe_items_v1',
  POSTS: 'vibe_posts_v1',
  STORIES: 'vibe_stories_v1',
  CONVERSATIONS: 'vibe_conversations_v1',
  SAVED_ITEMS: 'vibe_saved_items_v1',
  DATING_MATCHES: 'vibe_dating_matches_v1',
  DATING_LIKED_IDS: 'vibe_dating_liked_v1',
  DATING_PASSED_IDS: 'vibe_dating_passed_v1',
  LOCATION_SCOPE: 'vibe_location_scope_v1',
  CURRENT_LOCATION: 'vibe_current_location_v1',
};

export const getStoredUsers = (): UserProfile[] => {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MOCK_USERS));
    return MOCK_USERS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return MOCK_USERS;
  }
};

export const getCurrentUser = (): UserProfile => {
  const users = getStoredUsers();
  const currentId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) || CURRENT_USER.id;
  const user = users.find(u => u.id === currentId);
  return user || users[0] || CURRENT_USER;
};

export const setCurrentUser = (userId: string): void => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, userId);
};

export const getStoredItems = (): MarketplaceItem[] => {
  const data = localStorage.getItem(STORAGE_KEYS.ITEMS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(MOCK_ITEMS));
    return MOCK_ITEMS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return MOCK_ITEMS;
  }
};

export const saveItemToList = (item: MarketplaceItem): MarketplaceItem[] => {
  const items = getStoredItems();
  const updated = [item, ...items];
  localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(updated));
  return updated;
};

export const toggleSaveItem = (itemId: string): MarketplaceItem[] => {
  const items = getStoredItems();
  const updated = items.map(item => {
    if (item.id === itemId) {
      return { ...item, saved: !item.saved };
    }
    return item;
  });
  localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(updated));
  return updated;
};

export const getStoredPosts = (): SocialPost[] => {
  const data = localStorage.getItem(STORAGE_KEYS.POSTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(MOCK_POSTS));
    return MOCK_POSTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return MOCK_POSTS;
  }
};

export const savePost = (post: SocialPost): SocialPost[] => {
  const posts = getStoredPosts();
  const updated = [post, ...posts];
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updated));
  return updated;
};

export const toggleLikePost = (postId: string): SocialPost[] => {
  const posts = getStoredPosts();
  const updated = posts.map(post => {
    if (post.id === postId) {
      const hasLiked = !post.hasLiked;
      return {
        ...post,
        hasLiked,
        likes: hasLiked ? post.likes + 1 : Math.max(0, post.likes - 1)
      };
    }
    return post;
  });
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updated));
  return updated;
};

export const addCommentToPost = (postId: string, text: string, authorId: string): SocialPost[] => {
  const posts = getStoredPosts();
  const updated = posts.map(post => {
    if (post.id === postId) {
      const newComment = {
        id: `comm_${Date.now()}`,
        authorId,
        text,
        createdAt: 'Just now',
        likes: 0
      };
      return {
        ...post,
        comments: [...post.comments, newComment]
      };
    }
    return post;
  });
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updated));
  return updated;
};

export const getStoredConversations = (): Conversation[] => {
  const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(MOCK_CONVERSATIONS));
    return MOCK_CONVERSATIONS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return MOCK_CONVERSATIONS;
  }
};

export const sendChatMessage = (
  conversationId: string, 
  text: string, 
  senderId: string, 
  offerAmount?: number
): Conversation[] => {
  const convs = getStoredConversations();
  const updated = convs.map(conv => {
    if (conv.id === conversationId) {
      const newMsg = {
        id: `msg_${Date.now()}`,
        senderId,
        text,
        timestamp: 'Just now',
        isOffer: !!offerAmount,
        offerAmount,
        offerStatus: offerAmount ? ('pending' as const) : undefined
      };
      return {
        ...conv,
        lastMessage: text,
        lastMessageTime: 'Just now',
        messages: [...conv.messages, newMsg]
      };
    }
    return conv;
  });
  localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(updated));
  return updated;
};

export const createOrGetConversation = (
  participantId: string,
  category: 'marketplace' | 'dating' | 'social',
  initialMessage: string,
  senderId: string,
  relatedItemId?: string,
  offerAmount?: number
): { conversation: Conversation; allConversations: Conversation[] } => {
  const convs = getStoredConversations();
  let existing = convs.find(c => c.participantId === participantId && c.category === category && c.relatedItemId === relatedItemId);

  if (existing) {
    const updated = sendChatMessage(existing.id, initialMessage, senderId, offerAmount);
    return {
      conversation: updated.find(c => c.id === existing!.id)!,
      allConversations: updated
    };
  }

  const newConv: Conversation = {
    id: `conv_${Date.now()}`,
    participantId,
    category,
    relatedItemId,
    lastMessage: initialMessage,
    lastMessageTime: 'Just now',
    unreadCount: 0,
    messages: [
      {
        id: `msg_${Date.now()}`,
        senderId,
        text: initialMessage,
        timestamp: 'Just now',
        isOffer: !!offerAmount,
        offerAmount,
        offerStatus: offerAmount ? 'pending' : undefined
      }
    ]
  };

  const updatedConvs = [newConv, ...convs];
  localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(updatedConvs));
  return { conversation: newConv, allConversations: updatedConvs };
};

export const getDatingSwipes = (): { liked: string[]; passed: string[]; matches: string[] } => {
  try {
    const liked = JSON.parse(localStorage.getItem(STORAGE_KEYS.DATING_LIKED_IDS) || '["user_maya"]');
    const passed = JSON.parse(localStorage.getItem(STORAGE_KEYS.DATING_PASSED_IDS) || '[]');
    const matches = JSON.parse(localStorage.getItem(STORAGE_KEYS.DATING_MATCHES) || '["user_maya"]');
    return { liked, passed, matches };
  } catch {
    return { liked: ['user_maya'], passed: [], matches: ['user_maya'] };
  }
};

export const recordDatingSwipe = (targetUserId: string, action: 'like' | 'pass' | 'superlike'): { isMatch: boolean } => {
  const { liked, passed, matches } = getDatingSwipes();
  if (action === 'pass') {
    if (!passed.includes(targetUserId)) passed.push(targetUserId);
    localStorage.setItem(STORAGE_KEYS.DATING_PASSED_IDS, JSON.stringify(passed));
    return { isMatch: false };
  }

  if (!liked.includes(targetUserId)) liked.push(targetUserId);
  localStorage.setItem(STORAGE_KEYS.DATING_LIKED_IDS, JSON.stringify(liked));

  // In demo, Maya, Kenji, and Amina match back!
  const willMatch = ['user_maya', 'user_kenji', 'user_amina', 'user_elena'].includes(targetUserId);
  if (willMatch && !matches.includes(targetUserId)) {
    matches.push(targetUserId);
    localStorage.setItem(STORAGE_KEYS.DATING_MATCHES, JSON.stringify(matches));
  }
  return { isMatch: willMatch };
};

export const getStoredLocationScope = (): LocationScope => {
  const scope = localStorage.getItem(STORAGE_KEYS.LOCATION_SCOPE);
  return (scope as LocationScope) || 'local';
};

export const setStoredLocationScope = (scope: LocationScope): void => {
  localStorage.setItem(STORAGE_KEYS.LOCATION_SCOPE, scope);
};

export const getStoredCurrentLocation = (): LocationInfo => {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_LOCATION);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      // fallback
    }
  }
  return {
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    areaName: 'Brooklyn / Manhattan'
  };
};

export const setStoredCurrentLocation = (loc: LocationInfo): void => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_LOCATION, JSON.stringify(loc));
};
