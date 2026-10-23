import React, { useState } from 'react';
import { UserProfile, LocationScope, LocationInfo } from '../../types';
import { DateCard } from './DateCard';
import { UserAvatar } from '../common/VisualFallback';
import { 
  Heart, 
  Sparkles, 
  Globe, 
  MapPin, 
  Compass, 
  LayoutGrid, 
  Layers, 
  Send, 
  X, 
  CheckCircle2, 
  RotateCcw,
  Zap
} from 'lucide-react';

interface DatingViewProps {
  users: UserProfile[];
  currentUser: UserProfile;
  locationScope: LocationScope;
  currentLocation: LocationInfo;
  onOpenLocationModal: () => void;
  onRecordSwipe: (targetUserId: string, action: 'like' | 'pass' | 'superlike') => { isMatch: boolean };
  onStartChat: (targetUserId: string, initialMessage: string, itemId?: string) => void;
}

export const DatingView: React.FC<DatingViewProps> = ({
  users,
  currentUser,
  locationScope,
  currentLocation,
  onOpenLocationModal,
  onRecordSwipe,
  onStartChat,
}) => {
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck');
  const [selectedIntent, setSelectedIntent] = useState<string>('All');
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [matchedUser, setMatchedUser] = useState<UserProfile | null>(null);
  const [superVibeUser, setSuperVibeUser] = useState<UserProfile | null>(null);
  const [superVibeNote, setSuperVibeNote] = useState('');

  // Potential matches: all active dating profiles except current user
  const candidates = users.filter(u => {
    if (u.id === currentUser.id) return false;
    if (!u.datingProfile.active) return false;

    if (selectedIntent !== 'All' && u.datingProfile.intent !== selectedIntent) {
      return false;
    }

    if (locationScope === 'local') {
      const isSameCity = u.location.city.toLowerCase() === currentLocation.city.toLowerCase();
      const isNear = (u.location.distanceKm || 0) < 50;
      return isSameCity || isNear;
    }

    if (locationScope === 'national') {
      return u.location.country.toLowerCase() === currentLocation.country.toLowerCase();
    }

    return true; // global: show everyone
  });

  const currentCandidate = candidates[activeDeckIndex];

  const handlePass = (userId: string) => {
    onRecordSwipe(userId, 'pass');
    setActiveDeckIndex(prev => prev + 1);
  };

  const handleLike = (userId: string) => {
    const result = onRecordSwipe(userId, 'like');
    if (result.isMatch) {
      const candidate = users.find(u => u.id === userId);
      if (candidate) setMatchedUser(candidate);
    }
    setActiveDeckIndex(prev => prev + 1);
  };

  const handleSuperVibe = (userId: string) => {
    const candidate = users.find(u => u.id === userId);
    if (candidate) setSuperVibeUser(candidate);
  };

  const submitSuperVibe = () => {
    if (!superVibeUser) return;
    const msg = superVibeNote.trim() || `Hey ${superVibeUser.name}! Saw your profile on Vibe and had to send a Super Vibe.`;
    onRecordSwipe(superVibeUser.id, 'superlike');
    onStartChat(superVibeUser.id, `[⚡ Super Vibe] ${msg}`);
    setSuperVibeUser(null);
    setSuperVibeNote('');
    setActiveDeckIndex(prev => prev + 1);
  };

  const handleSelectDateIdea = (user: UserProfile) => {
    const msg = `Hey ${user.name}, loved your date idea: "${user.datingProfile.dateIdea}". Would love to plan something like that!`;
    onStartChat(user.id, msg);
  };

  const resetDeck = () => {
    setActiveDeckIndex(0);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner & Filters */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
            <span className="font-semibold text-neutral-900">Vibe Dating Lounge</span>
            <span>·</span>
            <span>Singles & Curators</span>
            <span>·</span>
            <span>{candidates.length} Profiles Available</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Meet Genuine Connections in {currentLocation.city} {currentLocation.flag}
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Location Scope Switcher button */}
          <button
            type="button"
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-colors"
          >
            {locationScope === 'local' ? <MapPin className="w-3.5 h-3.5 text-rose-500" /> : <Globe className="w-3.5 h-3.5 text-emerald-500" />}
            <span className="capitalize">{locationScope} Passport</span>
          </button>

          {/* View Mode Toggle: Deck vs Grid */}
          <div className="flex items-center p-1 bg-neutral-100 rounded-xl border border-neutral-200/60">
            <button
              type="button"
              onClick={() => setViewMode('deck')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'deck' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
              }`}
              title="Deck Focus Mode"
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
              }`}
              title="Browse Grid Mode"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Intent Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {['All', 'Long-term relationship', 'Casual dating', 'Travel & explore buddy', 'Creative partner'].map(intent => (
          <button
            key={intent}
            type="button"
            onClick={() => {
              setSelectedIntent(intent);
              setActiveDeckIndex(0);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedIntent === intent
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300'
            }`}
          >
            {intent === 'All' ? 'All Intentions' : intent}
          </button>
        ))}
      </div>

      {/* Main View: Deck or Grid */}
      {viewMode === 'deck' ? (
        <div className="py-2">
          {currentCandidate ? (
            <div className="animate-in fade-in zoom-in-95 duration-200">
              <DateCard
                user={currentCandidate}
                onPass={handlePass}
                onLike={handleLike}
                onSuperLike={handleSuperVibe}
                onSelectDateIdea={handleSelectDateIdea}
              />
              <div className="text-center mt-3 text-xs text-neutral-400">
                Profile {activeDeckIndex + 1} of {candidates.length} · Tap sides of photo to browse prompts
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-12 text-center max-w-md mx-auto my-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 fill-rose-500" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">You're All Caught Up!</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                You've reviewed the available profiles in this filter set. Switch to Global Passport mode to discover vibrant curators and singles worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                <button
                  type="button"
                  onClick={resetDeck}
                  className="px-4 py-2 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Review Profiles Again</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenLocationModal}
                  className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Switch to Global Mode
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Browse Grid Mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map(candidate => (
            <div
              key={candidate.id}
              className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-neutral-900 flex items-center justify-center p-4">
                <UserAvatar name={candidate.name} avatarBg={candidate.avatarBg} size="xl" verified={candidate.verified} />
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-baseline justify-between">
                  <span className="font-bold text-base drop-shadow">{candidate.name}, {candidate.age}</span>
                  <span className="text-xs text-white/80 drop-shadow">{candidate.location.city} {candidate.location.flag}</span>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-rose-600 mb-1">
                    {candidate.datingProfile.intent}
                  </div>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {candidate.bio}
                  </p>
                  <div className="mt-2 text-[11px] text-neutral-400 italic line-clamp-1">
                    Date: "{candidate.datingProfile.dateIdea}"
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleLike(candidate.id)}
                    className="flex-1 py-2 bg-neutral-900 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Send Vibe</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSuperVibe(candidate.id)}
                    className="p-2 border border-sky-200 bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white rounded-xl transition-colors"
                    title="Super Vibe"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mutual Match Celebration Dialog */}
      {matchedUser && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setMatchedUser(null)}
        >
          <div 
            className="w-full max-w-md bg-white rounded-3xl p-6 text-center space-y-5 shadow-2xl border border-neutral-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-center -space-x-3 pt-2">
              <UserAvatar name={currentUser.name} avatarBg={currentUser.avatarBg} size="lg" />
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg z-10 ring-4 ring-white">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <UserAvatar name={matchedUser.name} avatarBg={matchedUser.avatarBg} size="lg" verified={matchedUser.verified} />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Mutual Connection</span>
              <h2 className="text-2xl font-black text-neutral-900">It's a Vibe!</h2>
              <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                You and {matchedUser.name} have liked each other. Start a conversation or suggest a date spot.
              </p>
            </div>

            {/* Date Idea suggestion card */}
            <div className="p-3.5 bg-neutral-50 rounded-2xl text-left border border-neutral-200/80 text-xs space-y-1">
              <div className="font-semibold text-neutral-800">Suggested by {matchedUser.name}:</div>
              <p className="text-neutral-600 italic">"{matchedUser.datingProfile.dateIdea}"</p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onStartChat(matchedUser.id, `Hey ${matchedUser.name}! So glad we matched on Vibe. What's your week looking like?`);
                  setMatchedUser(null);
                }}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
              >
                Start Chatting with {matchedUser.name}
              </button>
              <button
                type="button"
                onClick={() => setMatchedUser(null)}
                className="w-full py-2.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Keep Browsing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Super Vibe Icebreaker Dialog */}
      {superVibeUser && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSuperVibeUser(null)}
        >
          <div 
            className="w-full max-w-md bg-white rounded-3xl p-6 space-y-4 shadow-2xl border border-neutral-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-100 text-sky-600">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-base">Send a Super Vibe</h3>
                  <p className="text-xs text-neutral-500">To {superVibeUser.name} in {superVibeUser.location.city}</p>
                </div>
              </div>
              <button onClick={() => setSuperVibeUser(null)} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-600">
              Attach a personal intro note that will appear right at the top of {superVibeUser.name}'s inbox.
            </p>

            <textarea
              rows={3}
              value={superVibeNote}
              onChange={e => setSuperVibeNote(e.target.value)}
              placeholder={`Hi ${superVibeUser.name}, loved your prompt about "${superVibeUser.datingProfile.prompts[0]?.question || 'music'}"!`}
              className="w-full px-3.5 py-2.5 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <button
              type="button"
              onClick={submitSuperVibe}
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Send Super Vibe with Note</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
