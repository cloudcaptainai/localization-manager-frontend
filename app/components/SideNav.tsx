'use client';

interface SideNavProps {
  currentPage: 'editor' | 'localization';
  onPageChange: (page: 'editor' | 'localization') => void;
}

export default function SideNav({ currentPage, onPageChange }: SideNavProps) {
  return (
    <nav className="w-80 h-screen fixed left-0 top-0 p-6 bg-gradient-to-b from-stone-50 via-amber-50 to-orange-50">
      <div className="h-full bg-white/40 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 p-8 flex flex-col">
        {/* Brand */}
        <div className="mb-12">
          <h1 className="text-3xl font-light text-stone-800 mb-2">Vibe</h1>
          <p className="text-stone-600 text-sm font-light">Creative Development Studio</p>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-3 flex-1">
          <button
            onClick={() => onPageChange('editor')}
            className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
              currentPage === 'editor'
                ? 'bg-stone-800/90 text-stone-50 shadow-lg border border-stone-700/50'
                : 'bg-white/50 text-stone-700 hover:bg-white/70 hover:shadow-md border border-white/30 backdrop-blur-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                currentPage === 'editor' 
                  ? 'bg-white/20' 
                  : 'bg-stone-100/80 group-hover:bg-stone-200/80'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Editor</div>
                <div className={`text-xs opacity-60 ${
                  currentPage === 'editor' ? 'text-stone-200' : 'text-stone-500'
                }`}>
                  Build with AI
                </div>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => onPageChange('localization')}
            className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
              currentPage === 'localization'
                ? 'bg-stone-800/90 text-stone-50 shadow-lg border border-stone-700/50'
                : 'bg-white/50 text-stone-700 hover:bg-white/70 hover:shadow-md border border-white/30 backdrop-blur-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                currentPage === 'localization' 
                  ? 'bg-white/20' 
                  : 'bg-stone-100/80 group-hover:bg-stone-200/80'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Localization</div>
                <div className={`text-xs opacity-60 ${
                  currentPage === 'localization' ? 'text-stone-200' : 'text-stone-500'
                }`}>
                  Manage translations
                </div>
              </div>
            </div>
          </button>
        </nav>
        
        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="text-xs text-stone-600 font-light leading-relaxed">
              <div className="font-medium text-stone-700 mb-1">Vibe Studio</div>
              Creative development tools for modern teams
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}