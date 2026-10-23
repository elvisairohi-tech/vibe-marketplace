import React from 'react';
import { MarketplaceItem, UserProfile } from '../../types';
import { ItemVisual, UserAvatar } from '../common/VisualFallback';
import { Heart, MapPin, Truck, Star } from 'lucide-react';

interface ItemCardProps {
  item: MarketplaceItem;
  seller?: UserProfile;
  onSelect: (item: MarketplaceItem) => void;
  onToggleSave: (itemId: string, e: React.MouseEvent) => void;
  onQuickMessage?: (item: MarketplaceItem, seller: UserProfile, e: React.MouseEvent) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  seller,
  onSelect,
  onToggleSave,
}) => {
  return (
    <article
      onClick={() => onSelect(item)}
      className="group relative bg-white rounded-2xl border border-neutral-200/80 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col h-full"
    >
      {/* Product Image / Visual Hero */}
      <div className="relative w-full overflow-hidden bg-neutral-100">
        <ItemVisual
          type={item.visualType}
          title={item.title}
          aspectRatio="4:3"
          className="transition-transform duration-300 group-hover:scale-102"
        />

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => onToggleSave(item.id, e)}
          className={`absolute top-3 left-3 z-20 p-2 rounded-full backdrop-blur-md transition-all ${
            item.saved
              ? 'bg-rose-500 text-white shadow-sm'
              : 'bg-black/30 hover:bg-black/50 text-white'
          }`}
          title={item.saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${item.saved ? 'fill-current' : ''}`} />
        </button>

        {/* Condition label */}
        <div className="absolute bottom-3 left-3 z-10 text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
          {item.condition}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata: Category & Location Scope (No pills, unboxed clean text) */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1.5">
            <span className="truncate">{item.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 truncate shrink-0">
              <MapPin className="w-3 h-3 text-neutral-400" />
              {item.location.city} {item.location.flag}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-neutral-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-neutral-700 transition-colors">
            {item.title}
          </h3>
        </div>

        <div className="pt-3 mt-3 border-t border-neutral-100">
          <div className="flex items-baseline justify-between mb-2">
            {/* Price with tabular numbers */}
            <div className="text-lg font-bold text-neutral-900 tabular-nums">
              ${item.price.toLocaleString()}
              <span className="text-xs font-normal text-neutral-400 ml-1 uppercase">{item.currency}</span>
            </div>

            {/* Shipping badge */}
            <div className="flex items-center gap-1 text-[11px] font-medium text-neutral-600">
              <Truck className="w-3 h-3 text-neutral-400" />
              <span className="truncate max-w-[110px]">{item.shippingOption}</span>
            </div>
          </div>

          {/* Seller Trust Snippet */}
          {seller && (
            <div className="flex items-center justify-between pt-2 text-xs text-neutral-500">
              <div className="flex items-center gap-1.5 truncate">
                <UserAvatar name={seller.name} avatarBg={seller.avatarBg} size="sm" verified={seller.verified} />
                <span className="font-medium text-neutral-700 truncate">{seller.name}</span>
              </div>
              <div className="flex items-center gap-0.5 text-amber-600 font-semibold shrink-0">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span className="tabular-nums">{seller.stats.sellerRating.toFixed(1)}</span>
                <span className="text-neutral-400 font-normal">({seller.stats.reviewsCount})</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
