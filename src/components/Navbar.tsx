import React from 'react';
import { MainTab, LocationScope, LocationInfo, UserProfile } from '../types';
import { UserAvatar } from './common/VisualFallback';
import { Plus, MessageCircle, MapPin, Globe, Compass } from 'lucide-react';

interface NavbarProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  currentUser: UserProfile;
  locationScope: LocationScope;
  currentLocation: LocationInfo;
  onOpenLocationModal: () => void;
  onOpenMessages: () => void;
  unreadCount: number;
  onOpenCreate: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  currentUser,
  locationScope,
  currentLocation,
  onOpenLocationModal,
  onOpenMessages,
  unreadCount,
  onOpenCreate,
  onOpenProfile,
}) => {
  const scopeIcon = {
    local: <MapPin className="w-3.5 h-3.5 text-rose-500" />,
    national: <Compass className="w-3.5 h-3.5 text-sky-500" />,
    global: <Globe className="w-3.5 h-3.5 text-emerald-500" />
  }[locationScope];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onTabChange('marketplace')}
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-neutral-900 whitespace-nowrap hover:opacity-90 transition-opacity"
          >
            <span className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-black text-lg shadow-sm">
              V
            </span>
            <span>Vibe</span>
          </button>

          {/* Quick Location Scope Indicator */}
          <button
            type="button"
            onClick={onOpenLocationModal}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg transition-colors border border-neutral-200/60"
            title="Change Location & Scope"
          >
            {scopeIcon}
            <span className="truncate max-w-[130px]">{currentLocation.city}</span>
            <span className="text-[10px] text-neutral-400 uppercase font-semibold">({locationScope})</span>
          </button>
        </div>

        {/* Zone 2: Primary Navigation Tabs (Single line, 1-2 word labels) */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onTabChange('marketplace')}
            className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'marketplace'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            Marketplace
          </button>

          <button
            onClick={() => onTabChange('social')}
            className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'social'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            Social Feed
          </button>

          <button
            onClick={() => onTabChange('dating')}
            className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'dating'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            Dating & Match
          </button>
        </nav>

        {/* Zone 3: Actions (Create action + Messages + Profile) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Inbox / Messages button */}
          <button
            type="button"
            onClick={onOpenMessages}
            className="relative p-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            title="Messages & Offers"
          >
            <MessageCircle className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Primary Create Button */}
          <button
            type="button"
            onClick={onOpenCreate}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-all shadow-sm whitespace-nowrap shrink-0 active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create</span>
          </button>

          {/* User Profile Avatar */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="p-0.5 rounded-full hover:ring-2 hover:ring-neutral-300 transition-all shrink-0"
            title={`Signed in as ${currentUser.name}`}
          >
            <UserAvatar name={currentUser.name} avatarBg={currentUser.avatarBg} size="sm" verified={currentUser.verified} />
          </button>
        </div>
      </div>
    </header>
  );
};
