function SearchResult({ result, onClick, searchTerm }) {
    const highlightText = (text, term) => {
        if (!term) return text;
        const parts = text.split(new RegExp(`(${term})`, 'gi'));
        return parts.map((part, index) => 
            part.toLowerCase() === term.toLowerCase() ? (
                <span key={index} className="bg-indigo-500/30 px-1 rounded">
                    {part}
                </span>
            ) : part
        );
    };

    return (
        <button
            onClick={onClick}
            className="w-full text-left px-4 py-3 hover:bg-gray-800/50 transition-all duration-300 
                rounded-lg group relative overflow-hidden"
        >
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-purple-500/10 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-white font-medium text-lg">
                        {highlightText(result.page, searchTerm)}
                    </span>
                    <span className="text-white/40 text-xs bg-white/5 px-2 py-1 rounded">
                        Line {result.lineNumber}
                    </span>
                </div>
                <span className="text-white/60 text-sm line-clamp-2">
                    {highlightText(result.preview, searchTerm)}
                </span>
                
                {/* Match context */}
                <div className="mt-1 text-xs text-white/40 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Match found in {result.context || 'content'}</span>
                </div>
            </div>
        </button>
    );
}

function SearchBar({ onSearch }) {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const inputRef = React.useRef(null);
    const [searchHistory, setSearchHistory] = React.useState([]);

    const handleFocus = () => {
        setIsExpanded(true);
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (!inputRef.current.value) {
            setIsExpanded(false);
        }
        setIsFocused(false);
    };

    const handleSearch = (value) => {
        onSearch(value);
        if (value.trim() && !searchHistory.includes(value.trim())) {
            setSearchHistory(prev => [value.trim(), ...prev].slice(0, 5));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            inputRef.current.blur();
        }
    };

    return (
        <div className={`relative transition-all duration-300 ${
            isExpanded ? 'w-full' : 'w-56'
        }`}>
            <div className="field-wrapper relative">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search content..."
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className={`w-full bg-white/10 backdrop-blur-sm text-white 
                        placeholder-white/50 px-4 py-3 rounded-xl border transition-all duration-300
                        ${isFocused 
                            ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/20' 
                            : 'border-white/10 hover:border-white/20'
                        }
                        outline-none`}
                />
                
                {/* Search icon with pulse animation */}
                <div className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-300
                    ${isFocused ? 'scale-90' : 'scale-100'}`}>
                    <svg 
                        className="w-5 h-5 text-white/50"
                        fill="none" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            className={`transition-all duration-300 ${
                                isFocused ? 'stroke-indigo-400' : 'stroke-white/50'
                            }`}
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                    </svg>
                </div>

                {/* Search history dropdown */}
                {isFocused && searchHistory.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-sm 
                        rounded-lg border border-white/10 shadow-xl overflow-hidden">
                        {searchHistory.map((term, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    inputRef.current.value = term;
                                    handleSearch(term);
                                }}
                                className="w-full text-left px-4 py-2 text-white/70 hover:bg-white/5 
                                    transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {term}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
function HamburgerMenu({ isOpen, toggleMenu }) {
    return (
        <button 
            onClick={toggleMenu}
            className="fixed top-4 right-4 w-10 h-10 flex flex-col justify-center items-center z-50 focus:outline-none"
        >
            <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
            }`} />
            <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
            }`} />
            <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
            }`} />
        </button>
    );
}

function Dropdown({ isOpen, sections }) {
    const [searchResults, setSearchResults] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.willChange = isOpen ? 'transform' : 'auto';
        }
    }, [isOpen]);

    // Transform sections data into search results format
    const transformSectionsToResults = (query) => {
        return sections
            .map((section, index) => ({
                page: section.label,
                lineNumber: (index + 1) * 8, // Generate consistent line numbers
                preview: section.content,
                context: section.title,
                id: section.id
            }))
            .filter(result => 
                result.preview.toLowerCase().includes(query.toLowerCase()) ||
                result.page.toLowerCase().includes(query.toLowerCase()) ||
                result.context.toLowerCase().includes(query.toLowerCase())
            );
    };

    const searchContent = (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            setSearchQuery('');
            return;
        }

        setIsLoading(true);
        setSearchQuery(query);

        // Simulate search delay for smoother UX
        setTimeout(() => {
            const results = transformSectionsToResults(query);
            setSearchResults(results);
            setIsLoading(false);
        }, 150);
    };

    const handleResultClick = (result) => {
        const element = document.getElementById(result.id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div 
            ref={containerRef}
            className={`fixed top-0 right-0 h-screen bg-gray-900/95 
                transform transition-transform duration-300 ease-out z-40
                ${isOpen ? 'w-96 translate-x-0' : 'w-0 translate-x-full'}`}
        >
            <div className="absolute inset-0 bg-gray-900/80" />
            <div className="relative h-full flex flex-col pt-20 px-4 gap-6">
                <div className="backdrop-blur-sm bg-gray-900/30 rounded-2xl p-4 shadow-xl">
                    <SearchBar onSearch={searchContent} />
                </div>
                
                <div className="flex-1 overflow-hidden rounded-2xl bg-gray-900/50">
                    <div className="h-full overflow-auto">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="w-6 h-6 border-2 border-indigo-500/20 border-t-indigo-500 
                                    rounded-full animate-spin" />
                            </div>
                        ) : searchQuery ? (
                            <div className="space-y-4">
                                <div className="sticky top-0 bg-gray-900/90 text-white/50 text-sm px-4 py-2">
                                    {searchResults.length} results found for "{searchQuery}"
                                </div>
                                <div className="space-y-2 p-4">
                                    {searchResults.map((result, index) => (
                                        <SearchResult 
                                            key={index}
                                            result={result}
                                            searchTerm={searchQuery}
                                            onClick={() => handleResultClick(result)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-white/30">
                                Start typing to search...
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gray-900/50 rounded-2xl p-4">
                    <button 
                        onClick={() => window.location.href = '../CreditsPage/index.html'}
                        className="w-full text-white text-lg py-3 px-4 rounded-xl 
                            bg-gradient-to-r from-indigo-500/10 to-purple-500/10 
                            hover:from-indigo-500/20 hover:to-purple-500/20
                            transition-all duration-300 text-left flex items-center gap-3"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Credits
                    </button>
                    <button 
                        onClick={() => window.location.href = '../Nuvola client Design/index.html'}
                        className="w-full text-white text-lg py-3 px-4 rounded-xl 
                            bg-gradient-to-r from-indigo-500/10 to-purple-500/10 
                            hover:from-indigo-500/20 hover:to-purple-500/20
                            transition-all duration-300 text-left flex items-center gap-3"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
  Client Review
</button>
                </div>
            </div>
        </div>
    );
}