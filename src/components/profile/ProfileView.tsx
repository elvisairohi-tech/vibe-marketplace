import React, { useState } from 'react';
import { UserProfile, MarketplaceItem, SocialPost } from '../../types';
import { UserAvatar, ItemVisual } from '../common/VisualFallback';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Coffee, 
  UserCheck, 
  ExternalLink 
} from 'lucide-react';

interface ProfileViewProps {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  items: MarketplaceItem[];
  posts: SocialPost[];
  isOpen: boolean;
  onClose: () => void;
  onSwitchUser: (userId: string) => void;
  onSelectItem: (item: MarketplaceItem) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  allUsers,
  items,
  posts,
  isOpen,
  onClose,
  onSwitchUser,
  onSelectItem,
}) => {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'dating' | 'social'>('marketplace');

  if (!isOpen) return null;

  const userItems = items.filter(i => i.sellerId === currentUser.id);
  const userPosts = posts.filter(p => p.authorId === currentUser.id);
  const dating = currentUser.datingProfile;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-white shrink-0">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">User Profile & Persona</h2>
            <p className="text-xs text-neutral-500">View your cross-domain profile and switch demo accounts.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Identity Card */}
          <div className="p-6 rounded-3xl bg-neutral-900 text-white relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-lg">
            <UserAvatar 
              name={currentUser.name} 
              avatarBg={currentUser.avatarBg} 
              size="xl" 
              verified={currentUser.verified} 
            />

            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 justify-center sm:justify-start">
                <h3 className="text-xl font-bold tracking-tight">{currentUser.name}</h3>
                <span className="text-xs text-neutral-400 font-mono">{currentUser.handle}</span>
                {currentUser.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-sky-400 font-semibold px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-800">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Identity
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-neutral-300">
                <span>{currentUser.occupation}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  {currentUser.location.city}, {currentUser.location.country} {currentUser.location.flag}
                </span>
              </div>

              <p className="text-xs text-neutral-300 max-w-lg leading-relaxed pt-1">
                {currentUser.bio}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-4 gap-2 pt-3 border-t border-neutral-800 text-center">
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase">Vibe Score</div>
                  <div className="text-sm font-bold text-white tabular-nums">{currentUser.stats.vibesScore}/100</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase">Followers</div>
                  <div className="text-sm font-bold text-white tabular-nums">{currentUser.stats.followers}</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase">Items Sold</div>
                  <div className="text-sm font-bold text-white tabular-nums">{currentUser.stats.itemsSold}</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase">Rating</div>
                  <div className="text-sm font-bold text-amber-400 tabular-nums flex items-center justify-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{currentUser.stats.sellerRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Persona Switcher Strip */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-800 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-neutral-600" />
                Switch Active Persona (Try different hubs & perspectives)
              </span>
              <span className="text-neutral-400">Click to switch</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {allUsers.map(user => {
                const isCurrent = user.id === currentUser.id;
                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => onSwitchUser(user.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2.5 ${
                      isCurrent
                        ? 'border-neutral-900 bg-neutral-900 text-white font-semibold shadow-xs'
                        : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                    }`}
                  >
                    <UserAvatar name={user.name} avatarBg={user.avatarBg} size="sm" />
                    <div className="truncate">
                      <div className="truncate">{user.name}</div>
                      <div className={`text-[10px] truncate ${isCurrent ? 'text-neutral-300' : 'text-neutral-400'}`}>
                        {user.location.city} {user.location.flag}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cross-Domain Profile Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-neutral-200">
            <button
              type="button"
              onClick={() => setActiveTab('marketplace')}
              className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'marketplace'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Marketplace Listings ({userItems.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dating')}
              className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'dating'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Dating Card & Vibe</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('social')}
              className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'social'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Social Posts ({userPosts.length})</span>
            </button>
          </div>

          {/* Tab 1: User's Marketplace Listings */}
          {activeTab === 'marketplace' && (
            <div className="space-y-3">
              {userItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {userItems.map(item => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectItem(item);
                        onClose();
                      }}
                      className="p-3 bg-white rounded-xl border border-neutral-200 hover:border-neutral-400 transition-all cursor-pointer flex items-center gap-3"
                    >
                      <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0">
                        <ItemVisual type={item.visualType} aspectRatio="4:3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-neutral-900 truncate">
                          {item.title}
                        </h4>
                        <div className="text-xs font-bold text-neutral-900 tabular-nums">
                          ${item.price} {item.currency}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          {item.shippingOption} · {item.views} views
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-400 text-center py-6">
                  No active marketplace listings yet. Click "+ Create" to sell something.
                </p>
              )}
            </div>
          )}

          {/* Tab 2: User's Dating Vibe */}
          {activeTab === 'dating' && (
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-800">Dating Card Status:</span>
                  <span className="font-bold text-emerald-600">Active & Discoverable</span>
                </div>
                <div>
                  <span className="font-medium text-neutral-500">Relationship Intent:</span>
                  <div className="font-semibold text-neutral-900 mt-0.5">{dating.intent}</div>
                </div>
                <div>
                  <span className="font-medium text-neutral-500">Proposed First Date Idea:</span>
                  <p className="text-neutral-800 italic mt-0.5">"{dating.dateIdea}"</p>
                </div>
                <div>
                  <span className="font-medium text-neutral-500">Featured Prompts:</span>
                  <div className="space-y-2 mt-1">
                    {dating.prompts.map((p, idx) => (
                      <div key={idx} className="p-2.5 bg-white rounded-xl border border-neutral-100">
                        <div className="font-semibold text-neutral-500 text-[11px]">{p.question}</div>
                        <div className="text-neutral-900 mt-0.5">"{p.answer}"</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Social Posts */}
          {activeTab === 'social' && (
            <div className="space-y-3">
              {userPosts.length > 0 ? (
                userPosts.map(post => (
                  <div key={post.id} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs space-y-2">
                    <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                      <span>#{post.vibeTag}</span>
                      <span>{post.createdAt}</span>
                    </div>
                    <p className="text-neutral-800 leading-relaxed">{post.content}</p>
                    <div className="flex items-center gap-3 text-neutral-500 text-[11px] pt-1">
                      <span>{post.likes} likes</span>
                      <span>·</span>
                      <span>{post.comments.length} comments</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-neutral-400 text-center py-6">
                  No social posts yet. Share your first vibe from the Social Feed!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
