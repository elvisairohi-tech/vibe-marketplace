import React from 'react';
import { Camera, Armchair, Headphones, Sparkles, Bike, Watch, Laptop, Palette, Compass, Heart, ShieldCheck } from 'lucide-react';

interface VisualCardProps {
  type: 'camera' | 'chair' | 'audio' | 'fashion' | 'art' | 'tech' | 'bike' | 'watch' | 'generic';
  title?: string;
  themeColor?: string;
  className?: string;
  aspectRatio?: '4:3' | '16:9' | '3:4' | '1:1';
}

export const ItemVisual: React.FC<VisualCardProps> = ({
  type,
  title,
  themeColor = 'stone',
  className = '',
  aspectRatio = '4:3'
}) => {
  const aspectClass = {
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-[16/9]',
    '3:4': 'aspect-[3/4]',
    '1:1': 'aspect-square'
  }[aspectRatio];

  const getVisualConfig = () => {
    switch (type) {
      case 'camera':
        return {
          bg: 'bg-gradient-to-br from-neutral-800 via-neutral-900 to-stone-950 text-stone-200',
          icon: Camera,
          label: 'Analog Optics · 35mm',
          accent: 'border-amber-500/30'
        };
      case 'chair':
        return {
          bg: 'bg-gradient-to-br from-stone-100 via-amber-50/70 to-neutral-200 text-stone-800',
          icon: Armchair,
          label: 'Sculptural Furniture · Walnut',
          accent: 'border-stone-300'
        };
      case 'audio':
        return {
          bg: 'bg-gradient-to-br from-zinc-900 via-slate-900 to-neutral-950 text-zinc-100',
          icon: Headphones,
          label: 'Acoustic Engineering · Hi-Res',
          accent: 'border-cyan-500/30'
        };
      case 'fashion':
        return {
          bg: 'bg-gradient-to-br from-slate-800 via-neutral-800 to-indigo-950 text-slate-100',
          icon: Sparkles,
          label: 'Archival Japanese Denim · Heavyweight',
          accent: 'border-indigo-400/30'
        };
      case 'art':
        return {
          bg: 'bg-gradient-to-br from-amber-100 via-rose-50 to-orange-100 text-stone-800',
          icon: Palette,
          label: 'Original Studio Ceramic & Canvas',
          accent: 'border-orange-200'
        };
      case 'tech':
        return {
          bg: 'bg-gradient-to-br from-slate-900 via-zinc-900 to-black text-slate-100',
          icon: Laptop,
          label: 'M-Series Studio Silicon · Pristine',
          accent: 'border-sky-500/30'
        };
      case 'bike':
        return {
          bg: 'bg-gradient-to-br from-emerald-950 via-slate-900 to-neutral-900 text-emerald-100',
          icon: Bike,
          label: 'Custom Gravel Frame · Hydraulic',
          accent: 'border-emerald-500/30'
        };
      case 'watch':
        return {
          bg: 'bg-gradient-to-br from-neutral-900 via-stone-900 to-stone-950 text-amber-100',
          icon: Watch,
          label: 'Mechanical Automatic · 40mm Sapphire',
          accent: 'border-amber-400/30'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-neutral-800 to-neutral-900 text-neutral-100',
          icon: Compass,
          label: 'Curated Global Marketplace Item',
          accent: 'border-neutral-700'
        };
    }
  };

  const config = getVisualConfig();
  const IconComponent = config.icon;

  return (
    <div className={`relative overflow-hidden ${aspectClass} ${config.bg} flex flex-col items-center justify-center p-6 select-none ${className}`}>
      {/* Subtle geometric grid backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Ambient center spotlight */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5 pointer-events-none" />

      {/* Main icon centerpiece */}
      <div className={`relative z-10 w-20 h-20 rounded-2xl border ${config.accent} bg-white/5 backdrop-blur-md flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105`}>
        <IconComponent className="w-10 h-10 stroke-[1.5]" />
      </div>

      {/* Quiet micro-caption */}
      <div className="relative z-10 mt-4 text-center">
        <p className="text-[11px] font-medium tracking-wide uppercase opacity-75">
          {config.label}
        </p>
      </div>

      {/* Corner verified inspection tag */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-black/40 text-white backdrop-blur-sm">
        <ShieldCheck className="w-3 h-3 text-emerald-400" />
        <span>Verified Listing</span>
      </div>
    </div>
  );
};

export const UserAvatar: React.FC<{
  name: string;
  avatarBg?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  verified?: boolean;
  className?: string;
}> = ({ name, avatarBg = 'bg-neutral-800 text-white', size = 'md', verified = false, className = '' }) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl'
  };

  const initials = name
    .split(' ')
    .map(p => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <div className={`${sizeMap[size]} ${avatarBg} rounded-full flex items-center justify-center font-semibold tracking-wide ring-2 ring-white shadow-sm`}>
        {initials}
      </div>
      {verified && (
        <span
          className="absolute -bottom-0.5 -right-0.5 bg-sky-500 text-white rounded-full p-0.5 ring-2 ring-white"
          title="Verified Vibe User"
        >
          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </span>
      )}
    </div>
  );
};
