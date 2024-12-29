const Management = ({ onClose }) => {
    const [selectedCategory, setSelectedCategory] = React.useState('windows');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isSearchFocused, setIsSearchFocused] = React.useState(false);

    const categories = [
        { id: 'windows', label: 'Windows', icon: 'window' },
        { id: 'settings', label: 'Settings', icon: 'settings' },
        { id: 'config', label: 'Config', icon: 'config' },
        { id: 'friends', label: 'Friends', icon: 'friends' },
        { id: 'chat', label: 'Chat', icon: 'chat' }
    ];

    const modulesByCategory = {
        windows: [
            { name: 'Coordinate HUD', description: 'Show position information', enabled: true },
            { name: 'Armor Status', description: 'Display armor durability', enabled: false },
            { name: 'Minimap', description: 'Show minimap overlay', enabled: true },
            { name: 'Inventory View', description: 'Display inventory status', enabled: false },
            { name: 'Player List', description: 'Show online players', enabled: true }
        ],
        settings: [
            { name: 'Performance Mode', description: 'Optimize for performance', enabled: false },
            { name: 'Dark Theme', description: 'Toggle dark mode interface', enabled: true },
            { name: 'Notifications', description: 'Enable popup notifications', enabled: true },
            { name: 'Sound Effects', description: 'Toggle UI sound effects', enabled: false }
        ],
        config: [
            { name: 'Auto Save', description: 'Save settings automatically', enabled: true },
            { name: 'Import Config', description: 'Import settings from file', type: 'button' },
            { name: 'Export Config', description: 'Export current settings', type: 'button' },
            { name: 'Reset Default', description: 'Reset to default settings', type: 'button' }
        ],
        friends: [
            { name: 'Friend Alerts', description: 'Notify when friends join', enabled: true },
            { name: 'Auto Accept', description: 'Accept friend requests', enabled: false },
            { name: 'Online Status', description: 'Show as online to friends', enabled: true },
            { name: 'Friend List', description: 'View and manage friends', type: 'button' }
        ],
        chat: [
            { name: 'Chat History', description: 'Store chat messages', enabled: true },
            { name: 'Auto Reply', description: 'Automatic responses', enabled: false },
            { name: 'Chat Filters', description: 'Filter unwanted messages', enabled: true },
            { name: 'Notifications', description: 'Chat message alerts', enabled: true }
        ]
    };

    const CategoryIcon = ({ icon }) => {
        const icons = {
            window: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
                </svg>
            ),
            settings: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            config: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            ),
            friends: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            chat: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            )
        };
        return icons[icon] || null;
    };

    const filteredModules = React.useMemo(() => {
        if (!searchQuery) return modulesByCategory[selectedCategory] || [];
        
        const query = searchQuery.toLowerCase();
        const allModules = Object.values(modulesByCategory).flat();
        return allModules.filter(module => 
            module.name.toLowerCase().includes(query) ||
            module.description.toLowerCase().includes(query)
        );
    }, [selectedCategory, searchQuery]);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="max-w-6xl w-full h-[80vh] bg-gray-800/50 rounded-xl backdrop-blur-xl 
                shadow-2xl border border-gray-700/50 overflow-hidden animate-fadeIn">
                
                {/* Header with search */}
                <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 
                        bg-clip-text text-transparent">
                        Management Panel
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search settings..."
                                className="bg-gray-900/50 rounded-lg px-4 py-2 w-64 border border-gray-700/50
                                    focus:outline-none focus:border-purple-500/50 transition-colors text-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                            <div className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-300
                                ${isSearchFocused ? 'scale-90' : 'scale-100'}`}>
                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex h-[calc(80vh-4rem)]">
                    {/* Sidebar */}
                    <div className="w-48 border-r border-gray-700/50">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setSelectedCategory(category.id);
                                    setSearchQuery('');
                                }}
                                className={`w-full px-4 py-3 flex items-center gap-3 transition-colors text-left
                                    ${selectedCategory === category.id 
                                        ? 'bg-purple-500/20 text-purple-400 border-r-2 border-purple-500' 
                                        : 'text-gray-400 hover:bg-gray-700/30'}`}
                            >
                                <CategoryIcon icon={category.icon} />
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        <div className="grid grid-cols-1 gap-4">
                            {filteredModules.map((module) => (
                                <div key={module.name} className="bg-gray-800/30 rounded-lg p-4 
                                    hover:bg-gray-700/30 transition-colors border border-gray-700/30">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium text-white">{module.name}</h3>
                                            <p className="text-sm text-gray-400">{module.description}</p>
                                        </div>
                                        {module.type === 'button' ? (
                                            <button 
                                                className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg
                                                    hover:bg-purple-500/30 transition-colors"
                                            >
                                                Open
                                            </button>
                                        ) : (
                                            <button 
                                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out
                                                    ${module.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                                                onClick={() => {
                                                    module.enabled = !module.enabled;
                                                }}
                                            >
                                                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200
                                                    ${module.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    
                    .animate-fadeIn {
                        animation: fadeIn 0.3s ease-out forwards;
                    }
                `}
            </style>
        </div>
    );
};

// Make Management component available globally
window.Management = Management;