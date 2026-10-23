import React, { useState, useMemo } from 'react';
import { MarketplaceItem, UserProfile, ItemCategory, LocationScope, LocationInfo } from '../../types';
import { ItemCard } from './ItemCard';
import { ItemDetailModal } from './ItemDetailModal';
import { CreateListingModal } from './CreateListingModal';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Globe, 
  Compass, 
  Plus, 
  ArrowUpDown,
  Filter,
  PackageOpen
} from 'lucide-react';

interface MarketplaceViewProps {
  items: MarketplaceItem[];
  users: UserProfile[];
  currentUser: UserProfile;
  locationScope: LocationScope;
  currentLocation: LocationInfo;
  onOpenLocationModal: () => void;
  onToggleSaveItem: (itemId: string) => void;
  onItemCreated: (item: MarketplaceItem) => void;
  onStartChat: (sellerId: string, initialMessage: string, itemId?: string, offerAmount?: number) => void;
}

const CATEGORIES: ItemCategory[] = [
  'All',
  'Electronics & Tech',
  'Vintage & Fashion',
  'Home, Furniture & Living',
  'Art & Collectibles',
  'Vehicles & Mobility',
  'Services & Skills',
  'Digital & Remote'
];

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  items,
  users,
  currentUser,
  locationScope,
  currentLocation,
  onOpenLocationModal,
  onToggleSaveItem,
  onItemCreated,
  onStartChat,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');
  const [shippingFilter, setShippingFilter] = useState<'all' | 'local_only' | 'worldwide'>('all');
  const [savedOnly, setSavedOnly] = useState(false);
  const [activeItem, setActiveItem] = useState<MarketplaceItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Map user profiles by id for fast seller lookup
  const userMap = useMemo(() => {
    const map = new Map<string, UserProfile>();
    users.forEach(u => map.set(u.id, u));
    return map;
  }, [users]);

  // Filter items based on Category, Scope, Search, and Shipping
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Saved only filter
      if (savedOnly && !item.saved) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTag = item.tags.some(t => t.toLowerCase().includes(query));
        const matchesCity = item.location.city.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesTag && !matchesCity) {
          return false;
        }
      }

      // Shipping option filter
      if (shippingFilter === 'local_only' && item.shippingOption.includes('Worldwide')) {
        return false;
      }
      if (shippingFilter === 'worldwide' && !item.shippingOption.includes('Worldwide')) {
        return false;
      }

      // Location scope filter
      if (locationScope === 'local') {
        // Items in same city or within 50km
        const isSameCity = item.location.city.toLowerCase() === currentLocation.city.toLowerCase();
        const isNearby = (item.location.distanceKm || 0) < 50;
        return isSameCity || isNearby;
      }

      if (locationScope === 'national') {
        // Same country or worldwide
        const isSameCountry = item.location.country.toLowerCase() === currentLocation.country.toLowerCase();
        const hasWorldwide = item.shippingOption === 'Worldwide Shipping';
        return isSameCountry || hasWorldwide;
      }

      // Global scope: show everything
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0; // default newest
    });
  }, [items, selectedCategory, searchQuery, sortBy, shippingFilter, savedOnly, locationScope, currentLocation]);

  const activeSeller = activeItem ? userMap.get(activeItem.sellerId) : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner & Location Scope Status */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Vibe Peer-To-Peer Marketplace
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs text-neutral-500">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} available
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
            <span>Explore Goods & Rarities in</span>
            <span className="underline decoration-neutral-300 underline-offset-4">{currentLocation.city}</span>
            <span>{currentLocation.flag}</span>
          </h1>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {/* Scope indicator button */}
          <button
            type="button"
            onClick={onOpenLocationModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors border border-neutral-200"
          >
            {locationScope === 'local' && <MapPin className="w-3.5 h-3.5 text-rose-500" />}
            {locationScope === 'national' && <Compass className="w-3.5 h-3.5 text-sky-500" />}
            {locationScope === 'global' && <Globe className="w-3.5 h-3.5 text-emerald-500" />}
            <span>Scope: {locationScope.toUpperCase()}</span>
            <span className="text-neutral-400 font-normal">· Change</span>
          </button>

          {/* Sell an item CTA */}
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Sell on Vibe</span>
          </button>
        </div>
      </div>

      {/* Category Segmented Tabs (Functional Buttons) */}
      <div className="overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100/90 rounded-xl border border-neutral-200/60 w-max min-w-full">
          {CATEGORIES.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === category
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Secondary Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search items, cameras, audio, furniture, denim..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-neutral-400 hover:text-neutral-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {/* Saved wishlist filter */}
          <button
            type="button"
            onClick={() => setSavedOnly(!savedOnly)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap ${
              savedOnly
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300'
            }`}
          >
            Saved Items
          </button>

          {/* Worldwide shipping filter toggle */}
          <button
            type="button"
            onClick={() => setShippingFilter(shippingFilter === 'worldwide' ? 'all' : 'worldwide')}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap ${
              shippingFilter === 'worldwide'
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300'
            }`}
          >
            Worldwide Shipping
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-neutral-200 bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 pr-7 cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Catalog Grid (3-columns desktop, 2-columns tablet) */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              seller={userMap.get(item.sellerId)}
              onSelect={selectedItem => setActiveItem(selectedItem)}
              onToggleSave={(itemId, e) => {
                e.stopPropagation();
                onToggleSaveItem(itemId);
              }}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-12 text-center max-w-md mx-auto my-8">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
            <PackageOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 mb-1">No items found</h3>
          <p className="text-xs text-neutral-500 mb-6">
            We couldn't find items matching your active scope ({locationScope}) or filter in {currentLocation.city}.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              type="button"
              onClick={onOpenLocationModal}
              className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors"
            >
              Expand to Global Scope
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setShippingFilter('all');
                setSavedOnly(false);
              }}
              className="px-4 py-2 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={activeItem}
        seller={activeSeller}
        currentUser={currentUser}
        isOpen={!!activeItem}
        onClose={() => setActiveItem(null)}
        onToggleSave={itemId => onToggleSaveItem(itemId)}
        onStartChat={onStartChat}
      />

      {/* Create Listing Modal */}
      <CreateListingModal
        currentUser={currentUser}
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onItemCreated={newItem => {
          onItemCreated(newItem);
        }}
      />
    </div>
  );
};
