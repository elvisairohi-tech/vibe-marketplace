export type LocationScope = 'local' | 'national' | 'global';

export interface LocationInfo {
  city: string;
  country: string;
  flag: string;
  distanceKm?: number;
  areaName?: string;
  isLocal?: boolean;
}

export type MainTab = 'marketplace' | 'social' | 'dating';

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  avatarBg: string;
  age: number;
  location: LocationInfo;
  bio: string;
  occupation: string;
  verified: boolean;
  joinedDate: string;
  stats: {
    vibesScore: number;
    followers: number;
    itemsSold: number;
    sellerRating: number;
    reviewsCount: number;
  };
  datingProfile: {
    active: boolean;
    gender: string;
    interestedIn: string;
    intent: 'Long-term relationship' | 'Casual dating' | 'Travel & explore buddy' | 'Creative partner' | 'Open to anything';
    height: string;
    languages: string[];
    passions: string[];
    prompts: {
      question: string;
      answer: string;
    }[];
    dateIdea: string;
    vibeAudioSnippet?: {
      title: string;
      duration: string;
    };
  };
}

export type ItemCategory = 
  | 'All'
  | 'Electronics & Tech'
  | 'Vintage & Fashion'
  | 'Home, Furniture & Living'
  | 'Art & Collectibles'
  | 'Vehicles & Mobility'
  | 'Services & Skills'
  | 'Digital & Remote';

export type ItemCondition = 'Brand New' | 'Like New' | 'Good' | 'Fair / Vintage';

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: ItemCategory;
  condition: ItemCondition;
  location: LocationInfo;
  shippingOption: 'Local Pickup Only' | 'Local Delivery' | 'National Shipping' | 'Worldwide Shipping';
  description: string;
  tags: string[];
  sellerId: string;
  createdAt: string;
  saved: boolean;
  views: number;
  offersReceived: number;
  status: 'available' | 'pending' | 'sold';
  themeColor: string;
  visualType: 'camera' | 'chair' | 'audio' | 'fashion' | 'art' | 'tech' | 'bike' | 'watch';
}

export interface SocialComment {
  id: string;
  authorId: string;
  text: string;
  createdAt: string;
  likes: number;
}

export interface SocialPost {
  id: string;
  authorId: string;
  content: string;
  location: LocationInfo;
  createdAt: string;
  likes: number;
  hasLiked: boolean;
  comments: SocialComment[];
  shares: number;
  vibeTag: string;
  themeGradient: string;
  linkedListingId?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isOffer?: boolean;
  offerAmount?: number;
  offerStatus?: 'pending' | 'accepted' | 'declined';
}

export interface Conversation {
  id: string;
  participantId: string;
  category: 'marketplace' | 'dating' | 'social';
  relatedItemId?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface StoryPulse {
  id: string;
  authorId: string;
  caption: string;
  location: string;
  gradient: string;
  timeAgo: string;
  views: number;
  hasViewed: boolean;
}
