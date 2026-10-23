import React, { useState, useEffect } from 'react';
import { 
  MainTab, 
  LocationScope, 
  LocationInfo, 
  UserProfile, 
  MarketplaceItem, 
  SocialPost, 
  Conversation 
} from './types';
import { 
  getStoredUsers, 
  getCurrentUser, 
  setCurrentUser, 
  getStoredItems, 
  saveItemToList, 
  toggleSaveItem, 
  getStoredPosts, 
  savePost, 
  toggleLikePost, 
  addCommentToPost, 
  getStoredConversations, 
  sendChatMessage, 
  createOrGetConversation, 
  recordDatingSwipe, 
  getStoredLocationScope, 
  setStoredLocationScope, 
  getStoredCurrentLocation, 
  setStoredCurrentLocation 
} from './utils/storage';
import { MOCK_STORIES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { SocialFeedView } from './components/social/SocialFeedView';
import { DatingView } from './components/dating/DatingView';
import { LocationScopeSelector } from './components/LocationScopeSelector';
import { MessagesModal } from './components/messages/MessagesModal';
import { ProfileView } from './components/profile/ProfileView';
import { CreateActionModal } from './components/common/CreateActionModal';
import { CreateListingModal } from './components/marketplace/CreateListingModal';
import { ShieldCheck, Globe, MapPin, Heart, ShoppingBag } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('marketplace');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentUser, setCurrentUserState] = useState<UserProfile | null>(null);
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [locationScope, setLocationScope] = useState<LocationScope>('local');
  const [currentLocation, setCurrentLocation] = useState<LocationInfo>({
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    areaName: 'Brooklyn / Manhattan'
  });

  // Modal open states
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [activeChatConvId, setActiveChatConvId] = useState<string | undefined>(undefined);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreateActionOpen, setIsCreateActionOpen] = useState(false);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [selectedListingItem, setSelectedListingItem] = useState<MarketplaceItem | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Initial load
  useEffect(() => {
    const loadedUsers = getStoredUsers();
    const activeUser = getCurrentUser();
    const loadedItems = getStoredItems();
    const loadedPosts = getStoredPosts();
    const loadedConvs = getStoredConversations();
    const savedScope = getStoredLocationScope();
    const savedLoc = getStoredCurrentLocation();

    setUsers(loadedUsers);
    setCurrentUserState(activeUser);
    setItems(loadedItems);
    setPosts(loadedPosts);
    setConversations(loadedConvs);
    setLocationScope(savedScope);
    setCurrentLocation(savedLoc);
  }, []);

  if (!currentUser) {
    return <div className="min-h-screen bg-neutral-100 flex items-center justify-center">Loading Vibe...</div>;
  }

  // Location handlers
  const handleScopeChange = (scope: LocationScope) => {
    setLocationScope(scope);
    setStoredLocationScope(scope);
    showToast(`Reach scope updated to ${scope.toUpperCase()}`);
  };

  const handleLocationChange = (loc: LocationInfo) => {
    setCurrentLocation(loc);
    setStoredCurrentLocation(loc);
    showToast(`Active base city switched to ${loc.city} ${loc.flag}`);
  };

  // Persona switcher
  const handleSwitchUser = (userId: string) => {
    setCurrentUser(userId);
    const newActive = users.find(u => u.id === userId);
    if (newActive) {
      setCurrentUserState(newActive);
      setCurrentLocation(newActive.location);
      setStoredCurrentLocation(newActive.location);
      showToast(`Switched active persona to ${newActive.name} (${newActive.location.city})`);
    }
  };

  // Marketplace handlers
  const handleToggleSaveItem = (itemId: string) => {
    const updated = toggleSaveItem(itemId);
    setItems(updated);
    const it = updated.find(i => i.id === itemId);
    showToast(it?.saved ? 'Item saved to your Wishlist' : 'Item removed from Wishlist');
  };

  const handleItemCreated = (newItem: MarketplaceItem) => {
    const updated = saveItemToList(newItem);
    setItems(updated);
    showToast(`"${newItem.title}" has been published to Marketplace!`);
  };

  // Social handlers
  const handleLikePost = (postId: string) => {
    const updated = toggleLikePost(postId);
    setPosts(updated);
  };

  const handleAddComment = (postId: string, text: string) => {
    const updated = addCommentToPost(postId, text, currentUser.id);
    setPosts(updated);
    showToast('Comment posted!');
  };

  const handleCreatePost = (newPost: SocialPost) => {
    const updated = savePost(newPost);
    setPosts(updated);
    showToast('Your vibe has been shared to the feed!');
  };

  // Dating swipe handlers
  const handleRecordSwipe = (targetUserId: string, action: 'like' | 'pass' | 'superlike') => {
    const result = recordDatingSwipe(targetUserId, action);
    if (action === 'like' && !result.isMatch) {
      showToast('Vibe sent! We will notify you when they vibe back.');
    }
    return result;
  };

  // Chat initiation handler (used across Marketplace, Dating, and Social)
  const handleStartChat = (
    recipientId: string, 
    initialMessage: string, 
    itemId?: string, 
    offerAmount?: number
  ) => {
    let category: 'marketplace' | 'dating' | 'social' = 'social';
    if (itemId || offerAmount) {
      category = 'marketplace';
    } else if (activeTab === 'dating') {
      category = 'dating';
    }

    const { conversation, allConversations } = createOrGetConversation(
      recipientId,
      category,
      initialMessage,
      currentUser.id,
      itemId,
      offerAmount
    );

    setConversations(allConversations);
    setActiveChatConvId(conversation.id);
    setIsMessagesOpen(true);
    showToast(offerAmount ? `Offer of $${offerAmount} sent!` : 'Message sent!');
  };

  const handleSendMessageInModal = (convId: string, text: string, offerAmount?: number) => {
    const updated = sendChatMessage(convId, text, currentUser.id, offerAmount);
    setConversations(updated);
  };

  // Total unread calculation
  const totalUnread = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans selection:bg-rose-500 selection:text-white text-neutral-900">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={tab => setActiveTab(tab)}
        currentUser={currentUser}
        locationScope={locationScope}
        currentLocation={currentLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenMessages={() => {
          setActiveChatConvId(undefined);
          setIsMessagesOpen(true);
        }}
        unreadCount={totalUnread}
        onOpenCreate={() => setIsCreateActionOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'marketplace' && (
          <MarketplaceView
            items={items}
            users={users}
            currentUser={currentUser}
            locationScope={locationScope}
            currentLocation={currentLocation}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            onToggleSaveItem={handleToggleSaveItem}
            onItemCreated={handleItemCreated}
            onStartChat={handleStartChat}
          />
        )}

        {activeTab === 'social' && (
          <SocialFeedView
            posts={posts}
            stories={MOCK_STORIES}
            users={users}
            currentUser={currentUser}
            currentLocation={currentLocation}
            items={items}
            onLikePost={handleLikePost}
            onAddComment={handleAddComment}
            onCreatePost={handleCreatePost}
            onSelectItem={item => {
              setSelectedListingItem(item);
              setActiveTab('marketplace');
            }}
            onStartChat={handleStartChat}
          />
        )}

        {activeTab === 'dating' && (
          <DatingView
            users={users}
            currentUser={currentUser}
            locationScope={locationScope}
            currentLocation={currentLocation}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            onRecordSwipe={handleRecordSwipe}
            onStartChat={handleStartChat}
          />
        )}
      </main>

      {/* Subtle Bottom Trust & Scope Footer */}
      <footer className="border-t border-neutral-200 bg-white py-6 px-4 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900">Vibe</span>
            <span>—</span>
            <span>Global & Local Marketplace, Social Feed & Dating Connections</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Escrow & Safe Meetups
            </span>
            <span>·</span>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="text-neutral-700 hover:text-neutral-900 underline underline-offset-2 flex items-center gap-1"
            >
              <Globe className="w-3 h-3" />
              <span>Scope: {currentLocation.city} ({locationScope.toUpperCase()})</span>
            </button>
            <span>·</span>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="text-neutral-700 hover:text-neutral-900 underline underline-offset-2"
            >
              Active: {currentUser.name}
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-neutral-900 text-white text-xs font-semibold shadow-xl border border-neutral-800 animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Location & Scope Modal */}
      <LocationScopeSelector
        currentScope={locationScope}
        currentLocation={currentLocation}
        onScopeChange={handleScopeChange}
        onLocationChange={handleLocationChange}
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      {/* Messages / Inbox Drawer */}
      <MessagesModal
        conversations={conversations}
        users={users}
        items={items}
        currentUser={currentUser}
        isOpen={isMessagesOpen}
        onClose={() => setIsMessagesOpen(false)}
        onSendMessage={handleSendMessageInModal}
        activeConversationId={activeChatConvId}
      />

      {/* User Profile & Persona Switcher */}
      <ProfileView
        currentUser={currentUser}
        allUsers={users}
        items={items}
        posts={posts}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onSwitchUser={handleSwitchUser}
        onSelectItem={item => {
          setSelectedListingItem(item);
          setActiveTab('marketplace');
        }}
      />

      {/* Universal Create Action Picker */}
      <CreateActionModal
        isOpen={isCreateActionOpen}
        onClose={() => setIsCreateActionOpen(false)}
        onSelectListListing={() => setIsCreateListingOpen(true)}
        onSelectCreatePost={() => setActiveTab('social')}
        onSelectDatingAction={() => setActiveTab('dating')}
      />

      {/* Create Marketplace Listing Modal */}
      <CreateListingModal
        currentUser={currentUser}
        isOpen={isCreateListingOpen}
        onClose={() => setIsCreateListingOpen(false)}
        onItemCreated={handleItemCreated}
      />
    </div>
  );
}
