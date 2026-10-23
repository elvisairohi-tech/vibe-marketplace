import React, { useState } from 'react';
import { MarketplaceItem, UserProfile } from '../../types';
import { ItemVisual, UserAvatar } from '../common/VisualFallback';
import { 
  X, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Eye, 
  Tag, 
  MessageCircle, 
  Star, 
  Clock, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

interface ItemDetailModalProps {
  item: MarketplaceItem | null;
  seller: UserProfile | undefined;
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onToggleSave: (itemId: string) => void;
  onStartChat: (sellerId: string, initialMessage: string, itemId?: string, offerAmount?: number) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  seller,
  currentUser,
  isOpen,
  onClose,
  onToggleSave,
  onStartChat,
}) => {
  const [offerMode, setOfferMode] = useState(false);
  const [offerPrice, setOfferPrice] = useState<number>(0);
  const [customMessage, setCustomMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !item) return null;

  const currentSeller = seller || {
    id: item.sellerId,
    name: 'Verified Seller',
    handle: '@seller',
    avatar: 'VS',
    avatarBg: 'bg-neutral-800 text-white',
    age: 30,
    location: item.location,
    bio: 'Collector on Vibe',
    occupation: 'Member',
    verified: true,
    joinedDate: 'Joined 2024',
    stats: { vibesScore: 98, followers: 400, itemsSold: 12, sellerRating: 4.9, reviewsCount: 15 },
    datingProfile: { active: false, gender: '', interestedIn: '', intent: 'Open to anything', height: '', languages: [], passions: [], prompts: [], dateIdea: '' }
  };

  const isOwnItem = currentUser.id === item.sellerId;

  const handleQuickOffer = (discountPercent: number) => {
    const discounted = Math.round(item.price * (1 - discountPercent / 100));
    setOfferPrice(discounted);
    setOfferMode(true);
  };

  const handleSendOffer = () => {
    const amount = offerPrice || Math.round(item.price * 0.9);
    const msg = `Hi ${currentSeller.name}, I would like to make an offer of $${amount} for your "${item.title}".`;
    onStartChat(currentSeller.id, msg, item.id, amount);
    onClose();
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || customMessage || `Hi ${currentSeller.name}, is this still available?`;
    onStartChat(currentSeller.id, text, item.id);
    onClose();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="font-semibold text-neutral-900">Vibe Marketplace</span>
            <span>·</span>
            <span className="capitalize">{item.category}</span>
            <span>·</span>
            <span>Listed {item.createdAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors relative"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -bottom-7 right-0 text-[10px] bg-neutral-900 text-white px-2 py-0.5 rounded shadow whitespace-nowrap">
                  Link copied!
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => onToggleSave(item.id)}
              className={`p-2 rounded-xl transition-colors ${
                item.saved
                  ? 'text-rose-500 bg-rose-50'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
              title={item.saved ? 'Saved' : 'Save item'}
            >
              <Heart className={`w-4 h-4 ${item.saved ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: 2-column split */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
          {/* Left Column: Product Visual Showcase */}
          <div className="md:col-span-7 p-6 bg-neutral-50/50 flex flex-col justify-between">
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
              <ItemVisual
                type={item.visualType}
                title={item.title}
                aspectRatio="4:3"
              />
            </div>

            {/* Quick stats under visual */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="p-3 bg-white rounded-xl border border-neutral-100">
                <div className="text-xs text-neutral-400 flex items-center justify-center gap-1">
                  <Eye className="w-3 h-3" /> Views
                </div>
                <div className="font-semibold text-neutral-800 text-sm mt-0.5 tabular-nums">
                  {item.views}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-neutral-100">
                <div className="text-xs text-neutral-400 flex items-center justify-center gap-1">
                  <Tag className="w-3 h-3" /> Offers
                </div>
                <div className="font-semibold text-neutral-800 text-sm mt-0.5 tabular-nums">
                  {item.offersReceived}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-neutral-100">
                <div className="text-xs text-neutral-400 flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" /> Condition
                </div>
                <div className="font-semibold text-neutral-800 text-sm mt-0.5 truncate">
                  {item.condition}
                </div>
              </div>
            </div>

            {/* Buyer Protection Guarantee */}
            <div className="mt-4 p-4 rounded-xl bg-white border border-neutral-200/80 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-600">
                <span className="font-semibold text-neutral-900 block mb-0.5">Vibe Protection & Safe Trade</span>
                Local meetups in verified public safe zones. International shipments include tracked courier coverage and escrow release upon inspection.
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase / Inquiry Module */}
          <div className="md:col-span-5 p-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Location & category header */}
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{item.location.city}, {item.location.country} {item.location.flag}</span>
                {item.location.distanceKm !== undefined && (
                  <>
                    <span>·</span>
                    <span className="text-neutral-700 font-medium">
                      {item.location.distanceKm < 50 ? `${item.location.distanceKm} km away` : 'International Shipping'}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
                {item.title}
              </h1>

              {/* Price & Delivery */}
              <div className="mt-4 pb-4 border-b border-neutral-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-neutral-900 tabular-nums">
                    ${item.price.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-neutral-400 uppercase">
                    {item.currency}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-600 mt-1">
                  <Truck className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="font-medium">{item.shippingOption}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  About This Item
                </h2>
                <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs text-neutral-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Seller Trust Card */}
              <div className="mt-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserAvatar 
                      name={currentSeller.name} 
                      avatarBg={currentSeller.avatarBg} 
                      size="md" 
                      verified={currentSeller.verified} 
                    />
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm flex items-center gap-1">
                        {currentSeller.name}
                        {currentSeller.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                        )}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {currentSeller.occupation} · {currentSeller.location.city}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600 justify-end">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{currentSeller.stats.sellerRating.toFixed(1)}</span>
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {currentSeller.stats.itemsSold} sales
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Module */}
            <div className="pt-4 border-t border-neutral-100 space-y-3">
              {isOwnItem ? (
                <div className="p-3 bg-neutral-100 text-center text-xs font-medium text-neutral-600 rounded-xl">
                  You are the seller of this listing. View incoming offers in your inbox.
                </div>
              ) : (
                <>
                  {/* Quick message shortcuts */}
                  {!offerMode && (
                    <div className="space-y-2">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        Quick Inquiries
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => handleSendMessage('Hi, is this still available for pickup?')}
                          className="px-3 py-2 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 text-neutral-700 text-left transition-colors truncate"
                        >
                          Is this available?
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSendMessage('Can you do worldwide insured shipping?')}
                          className="px-3 py-2 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 text-neutral-700 text-left transition-colors truncate"
                        >
                          Worldwide shipping?
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Make an offer drawer */}
                  {offerMode ? (
                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                        <span>Make an Offer</span>
                        <button
                          type="button"
                          onClick={() => setOfferMode(false)}
                          className="text-neutral-400 hover:text-neutral-700"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-neutral-700">$</span>
                        <input
                          type="number"
                          value={offerPrice || ''}
                          onChange={e => setOfferPrice(Number(e.target.value))}
                          placeholder={Math.round(item.price * 0.9).toString()}
                          className="w-full px-3 py-2 text-base font-semibold border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setOfferPrice(Math.round(item.price * 0.95))}
                          className="flex-1 py-1 text-xs border rounded-lg bg-white hover:bg-neutral-100"
                        >
                          -5% (${Math.round(item.price * 0.95)})
                        </button>
                        <button
                          type="button"
                          onClick={() => setOfferPrice(Math.round(item.price * 0.9))}
                          className="flex-1 py-1 text-xs border rounded-lg bg-white hover:bg-neutral-100"
                        >
                          -10% (${Math.round(item.price * 0.9)})
                        </button>
                        <button
                          type="button"
                          onClick={() => setOfferPrice(Math.round(item.price * 0.85))}
                          className="flex-1 py-1 text-xs border rounded-lg bg-white hover:bg-neutral-100"
                        >
                          -15% (${Math.round(item.price * 0.85)})
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleSendOffer}
                        className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Send Offer of ${offerPrice || Math.round(item.price * 0.9)}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setOfferPrice(Math.round(item.price * 0.9));
                          setOfferMode(true);
                        }}
                        className="flex-1 py-3 px-4 border border-neutral-300 hover:border-neutral-900 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors"
                      >
                        Make an Offer
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendMessage()}
                        className="flex-1 py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Message Seller
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
