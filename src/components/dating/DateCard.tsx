import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { UserAvatar } from '../common/VisualFallback';
import { 
  Heart, 
  X, 
  Zap, 
  MapPin, 
  Compass, 
  MessageCircle, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Coffee, 
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface DateCardProps {
  user: UserProfile;
  onPass: (userId: string) => void;
  onLike: (userId: string) => void;
  onSuperLike: (userId: string) => void;
  onSelectDateIdea?: (user: UserProfile) => void;
}

export const DateCard: React.FC<DateCardProps> = ({
  user,
  onPass,
  onLike,
  onSuperLike,
  onSelectDateIdea,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const dating = user.datingProfile;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden flex flex-col relative transition-all duration-300">
      {/* Top Slide indicator dots */}
      <div className="absolute top-3 inset-x-4 z-20 flex gap-1.5 pointer-events-none">
        {[0, 1, 2].map(idx => (
          <div
            key={idx}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              activeSlide === idx ? 'bg-white shadow' : 'bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Visual Identity Hero Card */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-neutral-900 via-neutral-800 to-stone-900 flex flex-col justify-end p-6 select-none overflow-hidden">
        {/* Subtle decorative mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        {/* Center portrait badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full ring-4 ring-white/20 p-1 shadow-2xl flex items-center justify-center bg-white/5 backdrop-blur-md">
              <UserAvatar name={user.name} avatarBg={user.avatarBg} size="xl" verified={user.verified} />
            </div>
            {dating.vibeAudioSnippet && (
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-semibold flex items-center gap-1 shadow-md transition-all active:scale-95"
              >
                {isPlayingAudio ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 animate-pulse" />}
                <span>{isPlayingAudio ? 'Mute' : 'Voice Vibe'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Audio waveform simulator */}
        {isPlayingAudio && dating.vibeAudioSnippet && (
          <div className="absolute top-10 inset-x-6 z-10 p-2.5 rounded-xl bg-black/60 backdrop-blur-md text-white flex items-center justify-between text-xs animate-in fade-in">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[4, 12, 8, 16, 6, 14, 10, 4, 12].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px` }}
                    className="w-1 bg-rose-400 rounded-full animate-bounce"
                  />
                ))}
              </div>
              <span className="font-medium text-[11px] truncate max-w-[140px]">
                {dating.vibeAudioSnippet.title}
              </span>
            </div>
            <span className="text-[10px] text-neutral-300 font-mono">
              {dating.vibeAudioSnippet.duration}
            </span>
          </div>
        )}

        {/* Slide navigation tap targets */}
        <div 
          className="absolute inset-y-0 left-0 w-1/3 z-10 cursor-pointer" 
          onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
          title="Previous slide"
        />
        <div 
          className="absolute inset-y-0 right-0 w-1/3 z-10 cursor-pointer" 
          onClick={() => setActiveSlide(Math.min(2, activeSlide + 1))}
          title="Next slide"
        />

        {/* Hero bottom gradient scrim */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* Identity headline */}
        <div className="relative z-10 text-white">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold tracking-tight">
              {user.name}, <span className="font-normal text-white/90">{user.age}</span>
            </h3>
            {user.verified && (
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-white/80 mt-1">
            <span>{user.occupation}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-400" />
              {user.location.city} {user.location.flag}
            </span>
            {user.location.distanceKm !== undefined && (
              <>
                <span>·</span>
                <span>{user.location.distanceKm < 50 ? `${user.location.distanceKm} km` : 'Global'}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Slide Body Content */}
      <div className="p-6 space-y-4 flex-1">
        {/* Slide 0: Bio, Intent, and Passions */}
        {activeSlide === 0 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Relationship Intent (Quiet unboxed style) */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-600 bg-neutral-100/80 p-2.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="text-neutral-400">Looking for:</span>
              <span className="font-semibold text-neutral-900">{dating.intent}</span>
            </div>

            {/* Bio */}
            <p className="text-sm text-neutral-700 leading-relaxed">
              {user.bio}
            </p>

            {/* Passions list */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                Passions & Interests
              </div>
              <div className="flex flex-wrap gap-1.5">
                {dating.passions.map(passion => (
                  <span
                    key={passion}
                    className="px-2.5 py-1 text-xs rounded-lg bg-neutral-100 text-neutral-800 font-medium"
                  >
                    {passion}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Slide 1: Icebreaker Prompts */}
        {activeSlide === 1 && (
          <div className="space-y-3.5 animate-in fade-in duration-150">
            {dating.prompts.map((prompt, i) => (
              <div key={i} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-1.5">
                <div className="text-xs font-semibold text-neutral-500">
                  {prompt.question}
                </div>
                <div className="text-sm font-medium text-neutral-900 leading-snug">
                  "{prompt.answer}"
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Slide 2: Suggested Date Idea */}
        {activeSlide === 2 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase tracking-wide">
                <Coffee className="w-3.5 h-3.5 text-rose-600" />
                <span>Proposed First Date Idea</span>
              </div>
              <p className="text-sm text-neutral-800 font-medium leading-relaxed">
                "{dating.dateIdea}"
              </p>
              {onSelectDateIdea && (
                <button
                  type="button"
                  onClick={() => onSelectDateIdea(user)}
                  className="mt-2 text-xs font-semibold text-rose-700 hover:text-rose-900 underline underline-offset-2 flex items-center gap-1"
                >
                  <span>Accept or discuss this date idea in chat</span>
                </button>
              )}
            </div>

            {/* Languages & stats */}
            <div className="text-xs text-neutral-500 space-y-1 pt-1">
              <div><span className="font-medium text-neutral-700">Languages:</span> {dating.languages.join(', ')}</div>
              <div><span className="font-medium text-neutral-700">Height:</span> {dating.height}</div>
            </div>
          </div>
        )}
      </div>

      {/* Swipe / Decision Action Bar */}
      <div className="px-6 py-4 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-center gap-5">
        {/* Pass Button */}
        <button
          type="button"
          onClick={() => onPass(user.id)}
          className="w-13 h-13 rounded-full bg-white border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 hover:shadow-md flex items-center justify-center transition-all active:scale-95 shadow-sm"
          title="Pass"
        >
          <X className="w-6 h-6 stroke-[2]" />
        </button>

        {/* Super Vibe Button */}
        <button
          type="button"
          onClick={() => onSuperLike(user.id)}
          className="w-11 h-11 rounded-full bg-sky-50 border border-sky-200 text-sky-600 hover:bg-sky-500 hover:text-white hover:shadow-md flex items-center justify-center transition-all active:scale-95 shadow-sm"
          title="Super Vibe (Priority intro message)"
        >
          <Zap className="w-5 h-5 fill-current" />
        </button>

        {/* Like / Vibe Button */}
        <button
          type="button"
          onClick={() => onLike(user.id)}
          className="w-13 h-13 rounded-full bg-neutral-900 hover:bg-rose-600 text-white hover:shadow-lg flex items-center justify-center transition-all active:scale-95 shadow-md"
          title="Vibe / Like"
        >
          <Heart className="w-6 h-6 fill-current stroke-[1.5]" />
        </button>
      </div>
    </div>
  );
};
