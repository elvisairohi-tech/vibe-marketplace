import React, { useState } from 'react';
import { MarketplaceItem, UserProfile, ItemCategory, ItemCondition } from '../../types';
import { ItemVisual } from '../common/VisualFallback';
import { X, Sparkles, Tag, DollarSign, Truck, MapPin } from 'lucide-react';

interface CreateListingModalProps {
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onItemCreated: (item: MarketplaceItem) => void;
}

const CATEGORIES: ItemCategory[] = [
  'Electronics & Tech',
  'Vintage & Fashion',
  'Home, Furniture & Living',
  'Art & Collectibles',
  'Vehicles & Mobility',
  'Services & Skills',
  'Digital & Remote'
];

const CONDITIONS: ItemCondition[] = ['Brand New', 'Like New', 'Good', 'Fair / Vintage'];

export const CreateListingModal: React.FC<CreateListingModalProps> = ({
  currentUser,
  isOpen,
  onClose,
  onItemCreated,
}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState<ItemCategory>('Electronics & Tech');
  const [condition, setCondition] = useState<ItemCondition>('Like New');
  const [shippingOption, setShippingOption] = useState<'Local Pickup Only' | 'Local Delivery' | 'National Shipping' | 'Worldwide Shipping'>('Local Pickup Only');
  const [description, setDescription] = useState('');
  const [visualType, setVisualType] = useState<MarketplaceItem['visualType']>('camera');
  const [tagInput, setTagInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    const tags = tagInput
      .split(',')
      .map(t => t.trim().toLowerCase().replace('#', ''))
      .filter(Boolean);

    const newItem: MarketplaceItem = {
      id: `item_${Date.now()}`,
      title,
      price: Number(price),
      currency: 'USD',
      category,
      condition,
      location: currentUser.location,
      shippingOption,
      description: description || 'No detailed description provided.',
      tags: tags.length ? tags : [category.toLowerCase()],
      sellerId: currentUser.id,
      createdAt: 'Just now',
      saved: false,
      views: 1,
      offersReceived: 0,
      status: 'available',
      themeColor: 'stone',
      visualType
    };

    onItemCreated(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-white shrink-0">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">List an Item on Vibe</h2>
            <p className="text-xs text-neutral-500">Reach buyers in {currentUser.location.city} and globally across 40+ countries.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-column layout: Form left, Live preview right */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
          {/* Left: Input Form */}
          <form onSubmit={handleSubmit} className="md:col-span-7 p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Item Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. 1970s Braun Analog Wall Clock by Dieter Rams"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Price (USD) *
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="number"
                    required
                    min={1}
                    value={price}
                    onChange={e => setPrice(e.target.value ? Number(e.target.value) : '')}
                    placeholder="250"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as ItemCategory)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Condition *
                </label>
                <select
                  value={condition}
                  onChange={e => setCondition(e.target.value as ItemCondition)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900"
                >
                  {CONDITIONS.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Shipping & Reach *
                </label>
                <select
                  value={shippingOption}
                  onChange={e => setShippingOption(e.target.value as any)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900"
                >
                  <option value="Local Pickup Only">Local Pickup Only</option>
                  <option value="Local Delivery">Local Delivery</option>
                  <option value="National Shipping">National Shipping</option>
                  <option value="Worldwide Shipping">Worldwide Shipping (Global)</option>
                </select>
              </div>
            </div>

            {/* Visual Type Selector */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Visual Aesthetic Artwork
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['camera', 'chair', 'audio', 'fashion', 'art', 'tech', 'bike', 'watch'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setVisualType(type)}
                    className={`py-1.5 px-2 rounded-lg text-xs capitalize border text-center transition-all ${
                      visualType === type
                        ? 'border-neutral-900 bg-neutral-900 text-white font-medium shadow-sm'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Mention condition details, dimensions, original packaging, or pickup neighborhood."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                placeholder="analog, design, vintage, collector"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!title || !price}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white font-semibold text-sm rounded-xl shadow-sm transition-all"
              >
                Publish Listing to Vibe
              </button>
            </div>
          </form>

          {/* Right: Live Preview */}
          <div className="md:col-span-5 p-6 bg-neutral-50/70 flex flex-col justify-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 text-center">
              Buyer Card Preview
            </div>

            <div className="max-w-sm mx-auto w-full bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-md">
              <ItemVisual
                type={visualType}
                title={title || 'Your Item Title'}
                aspectRatio="4:3"
              />
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>{category}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-neutral-400" />
                    {currentUser.location.city} {currentUser.location.flag}
                  </span>
                </div>
                <h4 className="font-semibold text-neutral-900 text-sm leading-snug line-clamp-1">
                  {title || 'Untiled Item Listing'}
                </h4>
                <div className="flex items-baseline justify-between pt-1">
                  <div className="text-base font-bold text-neutral-900 tabular-nums">
                    ${price ? Number(price).toLocaleString() : '0'} USD
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-500">
                    <Truck className="w-3 h-3" />
                    <span>{shippingOption}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 text-center mt-4">
              Your listing will be instantly discoverable by nearby buyers and international collectors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
