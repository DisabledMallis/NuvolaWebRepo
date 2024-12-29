const ClickGUI = ({ onClose }) => {
    const [selectedCategory, setSelectedCategory] = React.useState('combat');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isSearchFocused, setIsSearchFocused] = React.useState(false);

    const categories = [
        { id: 'combat', label: 'Combat', icon: 'sword' },
        { id: 'movement', label: 'Movement', icon: 'boot' },
        { id: 'render', label: 'Render', icon: 'eye' },
        { id: 'misc', label: 'Misc', icon: 'sparkles' },
        { id: 'player', label: 'Player', icon: 'user' },
        { id: 'hud', label: 'HUD', icon: 'desktop' }
    ];

    const modulesByCategory = {
        combat: [
            { name: 'KillAura', description: 'Combat assistance', enabled: false },
            { name: 'Criticals', description: 'Enhanced critical hits', enabled: true },
            { name: 'AutoArmor', description: 'Automatic armor management', enabled: false },
            { name: 'TriggerBot', description: 'Automated targeting', enabled: false },
            { name: 'AntiKnockback', description: 'Reduces knockback effects', enabled: true }
        ],
        movement: [
            { name: 'Speed', description: 'Movement enhancement', enabled: true },
            { name: 'Flight', description: 'Aerial mobility', enabled: false },
            { name: 'Sprint', description: 'Automatic sprinting', enabled: true },
            { name: 'NoFall', description: 'Prevents fall damage', enabled: false },
            { name: 'Step', description: 'Enhanced step height', enabled: true }
        ],
        render: [
            { name: 'ESP', description: 'Entity highlighting', enabled: true },
            { name: 'Tracers', description: 'Entity tracking lines', enabled: false },
            { name: 'FullBright', description: 'Enhanced visibility', enabled: true },
            { name: 'Xray', description: 'See through blocks', enabled: false },
            { name: 'Nametags', description: 'Enhanced nametag display', enabled: true }
        ],
        misc: [
            { name: 'NoRotate', description: 'Prevents head rotation', enabled: false },
            { name: 'AntiAFK', description: 'Prevents AFK timeout', enabled: true },
            { name: 'Timer', description: 'Modifies game timing', enabled: false }
        ],
        player: [
            { name: 'ChestStealer', description: 'Auto-loots chests', enabled: false },
            { name: 'InventoryManager', description: 'Auto-manages inventory', enabled: true },
            { name: 'NoSlow', description: 'Prevents slowdown effects', enabled: false }
        ],
        hud: [
            { name: 'TabGUI', description: 'Visual module navigation', enabled: true },
            { name: 'Watermark', description: 'Client branding display', enabled: true },
            { name: 'Coordinates', description: 'Position display', enabled: false }
        ]
    };

    const CategoryIcon = ({ icon }) => {
        const icons = {
            sword: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
            ),
            boot: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            eye: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
            sparkles: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
            user: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            desktop: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                        Nuvola Client
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search modules..."
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

// Make ClickGUI component available globally
window.ClickGUI = ClickGUI;