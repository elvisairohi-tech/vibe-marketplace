import React from 'react';
import { ShoppingBag, Sparkles, Heart, X, ArrowRight } from 'lucide-react';

interface CreateActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectListListing: () => void;
  onSelectCreatePost: () => void;
  onSelectDatingAction: () => void;
}

export const CreateActionModal: React.FC<CreateActionModalProps> = ({
  isOpen,
  onClose,
  onSelectListListing,
  onSelectCreatePost,
  onSelectDatingAction,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-neutral-200 space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
          <div>
            <h3 className="font-bold text-neutral-900 text-base">Create on Vibe</h3>
            <p className="text-xs text-neutral-500">Choose what you want to share with your network.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {/* Option 1: Marketplace */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectListListing();
            }}
            className="w-full p-4 rounded-2xl border border-neutral-200 hover:border-neutral-900 bg-white hover:bg-neutral-50/60 transition-all text-left flex items-center gap-3.5 group shadow-xs"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-blue-600 transition-colors">
                List on Marketplace
              </div>
              <div className="text-[11px] text-neutral-500 truncate">
                Sell items locally or ship worldwide with buyer protection
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Option 2: Social Feed */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectCreatePost();
            }}
            className="w-full p-4 rounded-2xl border border-neutral-200 hover:border-neutral-900 bg-white hover:bg-neutral-50/60 transition-all text-left flex items-center gap-3.5 group shadow-xs"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-amber-600 transition-colors">
                Share a Social Vibe
              </div>
              <div className="text-[11px] text-neutral-500 truncate">
                Post studio updates, local events, or global discussions
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Option 3: Dating */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectDatingAction();
            }}
            className="w-full p-4 rounded-2xl border border-neutral-200 hover:border-neutral-900 bg-white hover:bg-neutral-50/60 transition-all text-left flex items-center gap-3.5 group shadow-xs"
          >
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-rose-600 transition-colors">
                Propose a Date Idea
              </div>
              <div className="text-[11px] text-neutral-500 truncate">
                Update dating card & invite potential matches to meetup
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
