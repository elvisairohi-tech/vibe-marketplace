import React, { useState } from 'react';
import { Conversation, UserProfile, MarketplaceItem } from '../../types';
import { UserAvatar, ItemVisual } from '../common/VisualFallback';
import { 
  X, 
  Send, 
  ShoppingBag, 
  Heart, 
  Users, 
  Check, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  Sparkles 
} from 'lucide-react';

interface MessagesModalProps {
  conversations: Conversation[];
  users: UserProfile[];
  items: MarketplaceItem[];
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (conversationId: string, text: string, offerAmount?: number) => void;
  activeConversationId?: string;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({
  conversations,
  users,
  items,
  currentUser,
  isOpen,
  onClose,
  onSendMessage,
  activeConversationId,
}) => {
  const [selectedId, setSelectedId] = useState<string>(activeConversationId || conversations[0]?.id || '');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'marketplace' | 'dating' | 'social'>('all');
  const [inputText, setInputText] = useState('');
  const [offerInput, setOfferInput] = useState('');
  const [showOfferBox, setShowOfferBox] = useState(false);

  if (!isOpen) return null;

  const userMap = new Map<string, UserProfile>();
  users.forEach(u => userMap.set(u.id, u));

  const itemMap = new Map<string, MarketplaceItem>();
  items.forEach(i => itemMap.set(i.id, i));

  // Filter conversations
  const filteredConvs = conversations.filter(c => {
    if (categoryFilter === 'all') return true;
    return c.category === categoryFilter;
  });

  const activeConv = conversations.find(c => c.id === selectedId) || filteredConvs[0];
  const participant = activeConv ? userMap.get(activeConv.participantId) : undefined;
  const relatedItem = activeConv?.relatedItemId ? itemMap.get(activeConv.relatedItemId) : undefined;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConv) return;
    if (!inputText.trim() && !offerInput) return;

    const offerAmount = offerInput ? Number(offerInput) : undefined;
    const text = inputText.trim() || (offerAmount ? `Made an offer of $${offerAmount}` : '');

    onSendMessage(activeConv.id, text, offerAmount);
    setInputText('');
    setOfferInput('');
    setShowOfferBox(false);

    // Auto-reply simulation for dynamic realism
    setTimeout(() => {
      let reply = "Sounds great! Let's arrange that.";
      if (activeConv.category === 'marketplace') {
        reply = offerAmount 
          ? `Thanks for the offer of $${offerAmount}! That works for me, I accept.` 
          : "Yes, it is available! Let me know if you want local pickup or shipping.";
      } else if (activeConv.category === 'dating') {
        reply = "Love that! Let's definitely meet up this week. Send me your favorite cafe or time!";
      }

      onSendMessage(activeConv.id, reply);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col h-[85vh] max-h-[750px]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-neutral-900">Vibe Inbox</h2>
            <span className="text-xs text-neutral-400">· Marketplace, Dating & Social Chats</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column Chat Layout: Inbox List left, Active Conversation right */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
          {/* Left Column: Conversation List */}
          <div className="md:col-span-5 flex flex-col h-full bg-neutral-50/50">
            {/* Category tabs */}
            <div className="p-3 border-b border-neutral-200/80 flex items-center gap-1 overflow-x-auto bg-white">
              {(['all', 'marketplace', 'dating', 'social'] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setCategoryFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                    categoryFilter === tab
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-neutral-100">
              {filteredConvs.length > 0 ? (
                filteredConvs.map(conv => {
                  const otherUser = userMap.get(conv.participantId);
                  const isSelected = activeConv?.id === conv.id;
                  const item = conv.relatedItemId ? itemMap.get(conv.relatedItemId) : undefined;

                  return (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => setSelectedId(conv.id)}
                      className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                        isSelected
                          ? 'bg-white border-l-4 border-neutral-900 shadow-xs'
                          : 'hover:bg-neutral-100/70'
                      }`}
                    >
                      <UserAvatar
                        name={otherUser?.name || 'Member'}
                        avatarBg={otherUser?.avatarBg}
                        size="md"
                        verified={otherUser?.verified}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-semibold text-xs sm:text-sm text-neutral-900 truncate">
                            {otherUser?.name}
                          </span>
                          <span className="text-[10px] text-neutral-400 shrink-0">
                            {conv.lastMessageTime}
                          </span>
                        </div>

                        {/* Category badge */}
                        <div className="flex items-center gap-1 text-[10px] text-neutral-500 mb-1">
                          {conv.category === 'marketplace' && (
                            <span className="flex items-center gap-0.5 text-blue-600 font-medium">
                              <ShoppingBag className="w-2.5 h-2.5" /> Item Inquiry
                            </span>
                          )}
                          {conv.category === 'dating' && (
                            <span className="flex items-center gap-0.5 text-rose-600 font-medium">
                              <Heart className="w-2.5 h-2.5 fill-current" /> Dating Match
                            </span>
                          )}
                          {conv.category === 'social' && (
                            <span className="flex items-center gap-0.5 text-neutral-600 font-medium">
                              <Users className="w-2.5 h-2.5" /> Social Vibe
                            </span>
                          )}
                          {item && (
                            <>
                              <span>·</span>
                              <span className="truncate max-w-[120px]">{item.title}</span>
                            </>
                          )}
                        </div>

                        <p className="text-xs text-neutral-600 truncate">
                          {conv.lastMessage}
                        </p>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-xs text-neutral-400">
                  No conversations in this tab yet.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Chat Window */}
          <div className="md:col-span-7 flex flex-col h-full bg-white">
            {activeConv && participant ? (
              <>
                {/* Active Chat Header */}
                <div className="px-6 py-3 border-b border-neutral-100 flex items-center justify-between bg-white shrink-0">
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      name={participant.name}
                      avatarBg={participant.avatarBg}
                      size="sm"
                      verified={participant.verified}
                    />
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-neutral-900 flex items-center gap-1">
                        {participant.name}
                        <span className="text-[10px] font-normal text-neutral-400">
                          {participant.location.city} {participant.location.flag}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        {activeConv.category === 'marketplace' ? 'Marketplace Transaction' : activeConv.category === 'dating' ? 'Dating Match' : 'Community Discussion'}
                      </div>
                    </div>
                  </div>

                  {/* Trust tip */}
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Encrypted Vibe Chat</span>
                  </div>
                </div>

                {/* Optional Related Item Header Bar */}
                {relatedItem && (
                  <div className="px-6 py-2.5 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <ShoppingBag className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-semibold text-neutral-900 truncate">{relatedItem.title}</span>
                      <span className="font-bold text-neutral-900 tabular-nums">${relatedItem.price}</span>
                    </div>
                    <span className="text-[10px] text-neutral-500 shrink-0">{relatedItem.shippingOption}</span>
                  </div>
                )}

                {/* Messages stream */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50/30">
                  {activeConv.messages.map(msg => {
                    const isMe = msg.senderId === currentUser.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                            isMe
                              ? 'bg-neutral-900 text-white rounded-br-xs shadow-xs'
                              : 'bg-white border border-neutral-200/90 text-neutral-800 rounded-bl-xs shadow-xs'
                          }`}
                        >
                          {/* Offer card styling if offer message */}
                          {msg.isOffer && (
                            <div className="mb-2 p-2 rounded-xl bg-white/10 border border-white/20 text-xs space-y-1">
                              <div className="font-bold flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                <span>Official Offer: ${msg.offerAmount}</span>
                              </div>
                              <div className="text-[10px] opacity-80">
                                Status: {msg.offerStatus || 'Accepted'}
                              </div>
                            </div>
                          )}
                          <p>{msg.text}</p>
                        </div>
                        <span className="text-[10px] text-neutral-400 mt-1 px-1">
                          {msg.timestamp}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Chat Input Form */}
                <form onSubmit={handleSend} className="p-4 border-t border-neutral-100 bg-white space-y-2">
                  {/* Make an offer input trigger */}
                  {activeConv.category === 'marketplace' && relatedItem && (
                    <div className="flex items-center justify-between text-xs pb-1">
                      <button
                        type="button"
                        onClick={() => setShowOfferBox(!showOfferBox)}
                        className="text-neutral-600 hover:text-neutral-900 font-semibold flex items-center gap-1"
                      >
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{showOfferBox ? 'Hide Offer Field' : 'Make / Counter Offer'}</span>
                      </button>
                      <span className="text-[11px] text-neutral-400">
                        Item price: ${relatedItem.price}
                      </span>
                    </div>
                  )}

                  {showOfferBox && (
                    <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-xl border border-neutral-200">
                      <span className="text-xs font-semibold text-neutral-500 pl-1">Offer: $</span>
                      <input
                        type="number"
                        value={offerInput}
                        onChange={e => setOfferInput(e.target.value)}
                        placeholder={Math.round(relatedItem?.price ? relatedItem.price * 0.9 : 100).toString()}
                        className="w-24 text-xs font-bold px-2 py-1 bg-white border border-neutral-300 rounded-lg focus:outline-none"
                      />
                      <span className="text-[11px] text-neutral-400">Press send to submit offer</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder={
                        activeConv.category === 'marketplace'
                          ? 'Ask about item condition, pickup location, or shipping...'
                          : activeConv.category === 'dating'
                          ? 'Reply with a date spot or icebreaker...'
                          : 'Write a message...'
                      }
                      className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim() && !offerInput}
                      className="p-2.5 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-neutral-400 text-xs">
                Select a conversation on the left to start chatting.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
