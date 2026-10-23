import React from 'react';
import { LocationScope, LocationInfo } from '../types';
import { POPULAR_LOCATIONS } from '../data/mockData';
import { MapPin, Globe, Compass, Check, X } from 'lucide-react';

interface LocationScopeSelectorProps {
  currentScope: LocationScope;
  currentLocation: LocationInfo;
  onScopeChange: (scope: LocationScope) => void;
  onLocationChange: (location: LocationInfo) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const LocationScopeSelector: React.FC<LocationScopeSelectorProps> = ({
  currentScope,
  currentLocation,
  onScopeChange,
  onLocationChange,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Location & Reach Scope</h2>
            <p className="text-xs text-neutral-500 mt-0.5">Control where you discover marketplace deals, social stories, and dating vibes.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Scope selection buttons */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-3">
              Audience & Discovery Scope
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => onScopeChange('local')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  currentScope === 'local'
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <MapPin className={`w-4 h-4 ${currentScope === 'local' ? 'text-rose-400' : 'text-neutral-600'}`} />
                  {currentScope === 'local' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <div className="font-semibold text-sm">Near Me</div>
                <div className={`text-[11px] mt-0.5 ${currentScope === 'local' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  Within 25 km
                </div>
              </button>

              <button
                type="button"
                onClick={() => onScopeChange('national')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  currentScope === 'national'
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Compass className={`w-4 h-4 ${currentScope === 'national' ? 'text-sky-400' : 'text-neutral-600'}`} />
                  {currentScope === 'national' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <div className="font-semibold text-sm">National</div>
                <div className={`text-[11px] mt-0.5 ${currentScope === 'national' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {currentLocation.country}
                </div>
              </button>

              <button
                type="button"
                onClick={() => onScopeChange('global')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  currentScope === 'global'
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Globe className={`w-4 h-4 ${currentScope === 'global' ? 'text-emerald-400' : 'text-neutral-600'}`} />
                  {currentScope === 'global' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <div className="font-semibold text-sm">Global</div>
                <div className={`text-[11px] mt-0.5 ${currentScope === 'global' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  Worldwide / All
                </div>
              </button>
            </div>
          </div>

          {/* Quick city switcher */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Change Active Base City
              </label>
              <span className="text-xs text-neutral-400">Current: {currentLocation.city}, {currentLocation.country} {currentLocation.flag}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {POPULAR_LOCATIONS.map(loc => {
                const isSelected = currentLocation.city === loc.city;
                return (
                  <button
                    key={loc.city}
                    type="button"
                    onClick={() => {
                      onLocationChange(loc);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left border text-xs transition-all ${
                      isSelected
                        ? 'border-neutral-900 bg-neutral-100 font-semibold text-neutral-900'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base">{loc.flag}</span>
                      <div className="truncate">
                        <div className="font-medium text-neutral-900 truncate">{loc.city}</div>
                        <div className="text-[10px] text-neutral-500 truncate">{loc.areaName}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
          <div className="text-xs text-neutral-500">
            Current active: <span className="font-semibold text-neutral-800">{currentLocation.city}</span> ({currentScope.toUpperCase()})
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Apply Location
          </button>
        </div>
      </div>
    </div>
  );
};
