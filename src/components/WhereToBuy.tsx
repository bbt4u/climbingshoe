"use client";

import { onlineStores, retailTips, getShoeSearchUrl } from "@/data/buyLinks";

interface Props {
  brand: string;
  shoeName: string;
  shoeId: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function WhereToBuy({ brand, shoeName, isExpanded, onToggle }: Props) {
  return (
    <div>
      <button onClick={onToggle}
        className="flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-light transition-colors">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Where to buy / try on
        <svg className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="mt-2 p-3 bg-surface/60 border border-surface-border rounded-lg animate-fade-in-up">
          <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Shop Online</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {["REI", "Backcountry", "EVO"].map((store) => (
              <a key={store} href={getShoeSearchUrl(store, brand, shoeName)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-lg hover:bg-accent/20 transition-all">
                {store}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            ))}
            <a href={getShoeSearchUrl("google", brand, shoeName)} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-text-muted bg-surface-overlay border border-surface-border px-3 py-1.5 rounded-lg hover:bg-surface-border/50 transition-all">
              Search All
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </a>
          </div>
          <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5">Try In Person</p>
          <p className="text-[11px] text-text-muted leading-relaxed">Visit your local climbing gym pro shop or REI store. Many gyms host demo days.</p>
        </div>
      )}
    </div>
  );
}

export function RetailerGrid() {
  return (
    <>
      <div className="bg-surface-overlay/50 border border-surface-border rounded-xl p-4 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs font-bold text-text-secondary">Fitting Tips</p>
        </div>
        <ul className="space-y-1">
          {retailTips.slice(0, 3).map((tip, i) => (
            <li key={i} className="text-[11px] text-text-muted flex items-start gap-1.5">
              <span className="text-accent mt-0.5">•</span>{tip}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-surface-overlay/30 border border-surface-border rounded-xl p-4 mb-6">
        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Major Retailers</p>
        <div className="grid grid-cols-2 gap-2">
          {onlineStores.slice(0, 4).map((store) => (
            <a key={store.name} href={store.url} target="_blank" rel="noopener noreferrer"
              className="flex flex-col p-2.5 bg-surface-overlay/50 border border-surface-border rounded-lg hover:border-accent/30 transition-all group">
              <span className="text-xs font-semibold text-text-secondary group-hover:text-accent flex items-center gap-1">
                {store.name}
                <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </span>
              <span className="text-[10px] text-text-muted mt-0.5">{store.description}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
