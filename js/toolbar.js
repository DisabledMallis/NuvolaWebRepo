function DiscordButton() {
    return (
        <a 
            href="https://discord.gg/xgBsdSZNB7"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed top-4 right-20 z-50 px-4 py-2 rounded-lg 
                bg-indigo-600/90 hover:bg-indigo-500/90 backdrop-blur-sm
                transition-all duration-300 group flex items-center gap-2"
        >
            <svg 
                className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" 
                viewBox="0 0 24 24" 
                fill="currentColor"
            >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span className="text-white font-medium">Discord</span>
        </a>
    );
}
function App() {
    const [currentTool, setCurrentTool] = React.useState('home');
    const [prevTool, setPrevTool] = React.useState('home');
    const [isScrolling, setIsScrolling] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const highlightRef = React.useRef(null);
    const observerRef = React.useRef(null);
    const scrollTimeout = React.useRef(null);
    
    const sections = [
        {
            id: 'home',
            label: 'Home',
            title: 'Nuvola Beta',
            content: 'A Minecraft: Bedrock Edition utility mod from the future. Experience the next generation of Minecraft modding with our sophisticated toolset. Currently in beta stage, we are continuously improving to ensure the best possible experience.',
            color: 'bg-indigo-500',
            layout: 'wideLeft',
            accentColor: 'from-violet-500 via-purple-500 to-fuchsia-500'
        },
        {
            id: 'instructions',
            label: 'Instructions',
            title: 'GETTING STARTED WITH NUVOLA',
            content: 'To get started with Nuvola, you have two installation options: Use Fate Injector, a reliable injection tool available on GitHub, or Jiayi Launcher, our recommended launcher for seamless integration.',
            color: 'bg-indigo-600',
            layout: 'centered',
            accentColor: 'from-cyan-500 via-blue-500 to-indigo-500'
        },
        {
            id: 'download',
            label: 'Download',
            component: DownloadSection,
            color: 'bg-black'
        }
    ];

    const tools = sections.map(({ id, label, accentColor }) => ({ id, label, accentColor }));

    const getCurrentSection = () => sections.find(section => section.id === currentTool) || sections[0];

    React.useEffect(() => {
        const sectionEls = document.querySelectorAll('section[id]');
        
        observerRef.current = new IntersectionObserver((entries) => {
            if (isScrolling) return;
            
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
                    setCurrentTool(entry.target.id);
                }
            });
        }, {
            threshold: [0.7],
            rootMargin: '-20% 0px -20% 0px'
        });

        sectionEls.forEach(section => observerRef.current.observe(section));
        
        return () => {
            if (observerRef.current) {
                sectionEls.forEach(section => observerRef.current.unobserve(section));
            }
        };
    }, [isScrolling]);

    const animateSlider = React.useCallback((fromIndex, toIndex) => {
        if (!highlightRef.current) return;
        const moveIncrement = 4.5;
        const toPos = moveIncrement * toIndex;
        highlightRef.current.style.transform = `translateX(${toPos}em)`;
    }, []);

    React.useEffect(() => {
        if (prevTool !== currentTool) {
            const toolPrevIndex = tools.findIndex(t => t.id === prevTool);
            const toolIndex = tools.findIndex(t => t.id === currentTool);
            animateSlider(toolPrevIndex, toolIndex);
            setPrevTool(currentTool);
        }
    }, [currentTool, tools, animateSlider]);

    const scrollToSection = (id) => {
        setIsScrolling(true);
        const section = document.getElementById(id);
        const offset = document.querySelector('.toolbar-nav').offsetHeight;
        const sectionTop = section.offsetTop - offset;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
        
        setCurrentTool(id);

        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }
        
        scrollTimeout.current = setTimeout(() => {
            setIsScrolling(false);
        }, 1000);
    };

    return (
        <React.Fragment>
            <Timeline />
            <DiscordButton />
            <HamburgerMenu isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
            <Dropdown isOpen={isMenuOpen} sections={sections} />
            
            <div className="fixed top-0 left-0 right-0 flex justify-center p-4 z-30 toolbar-nav">
                <div className="relative bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 
                    shadow-lg shadow-black/20">
                    <div className="relative flex items-center gap-8">
                        {tools.map((tool, index) => (
                            <button
                                key={tool.id}
                                onClick={() => scrollToSection(tool.id)}
                                className="relative z-10 flex items-center justify-center group"
                            >
                                {/* Button background with gradient */}
                                <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                                    tool.id === currentTool 
                                        ? 'opacity-100' 
                                        : 'opacity-0 group-hover:opacity-50'
                                }`}>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20" />
                                </div>

                                {/* Button content */}
                                <span className={`relative px-4 py-2 text-xl font-medium transition-all duration-300 ${
                                    tool.id === currentTool 
                                        ? 'text-white scale-110' 
                                        : 'text-gray-400 group-hover:text-white'
                                }`}>
                                    {tool.label[0]}
                                </span>

                                {/* Tooltip */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 
                                    opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                    <div className="px-3 py-1 text-sm text-white bg-gray-900/90 rounded-lg 
                                        shadow-lg border border-white/10 whitespace-nowrap">
                                        {tool.label}
                                    </div>
                                </div>
                            </button>
                        ))}
                        
                        {/* Active indicator */}
                        <div 
                            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 
                                transition-all duration-300 rounded-full"
                            style={{
                                left: `${(tools.findIndex(t => t.id === currentTool) * 100) / tools.length}%`,
                                width: `${100 / tools.length}%`
                            }}
                        />
                    </div>
                </div>
            </div>
            <main className="overflow-hidden">
            {sections.map(section => 
    section.component ? 
        <section.component key={section.id} /> : 
        <Section key={section.id} {...section} />
)}
            </main>
        </React.Fragment>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);