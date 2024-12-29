function ScrambleText({ text, progress }) {
    const [displayText, setDisplayText] = React.useState('');
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
    const containerRef = React.useRef(null);
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/1234567890';
    
    // Calculate text dimensions on mount
    React.useEffect(() => {
        const container = containerRef.current;
        if (container) {
            // Create temporary element to measure text
            const temp = document.createElement('div');
            temp.style.position = 'absolute';
            temp.style.visibility = 'hidden';
            temp.style.whiteSpace = 'pre-wrap';
            temp.style.width = container.offsetWidth + 'px';
            temp.style.fontSize = window.getComputedStyle(container).fontSize;
            temp.style.fontFamily = window.getComputedStyle(container).fontFamily;
            temp.style.lineHeight = window.getComputedStyle(container).lineHeight;
            temp.textContent = text;
            document.body.appendChild(temp);
            
            // Store dimensions
            setDimensions({
                width: temp.offsetWidth,
                height: temp.offsetHeight
            });
            
            document.body.removeChild(temp);
        }
    }, [text]);

    // Generate scrambled text while maintaining length
    React.useEffect(() => {
        const adjustedProgress = progress < 0.45 ? 0 : (progress - 0.45) * 2.5;
        const revealLength = Math.floor(text.length * Math.min(adjustedProgress, 1));
        
        // Keep character count consistent
        const scrambledText = text
            .split('')
            .map((char, index) => {
                if (index < revealLength || adjustedProgress >= 1) {
                    return char;
                }
                // Replace spaces with spaces to maintain word breaks
                if (char === ' ') return ' ';
                // Use character with similar width for scrambling
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
            
        setDisplayText(scrambledText);
    }, [progress, text]);

    return (
        <div 
            ref={containerRef} 
            className="inline-block font-mono"
            style={{
                width: dimensions.width || 'auto',
                height: dimensions.height || 'auto',
                minHeight: dimensions.height || 'auto',
                overflow: 'hidden'
            }}
        >
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-rainbow">
                {displayText || text.replace(/./g, char => 
                    char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
                )}
            </span>
        </div>
    );
}

function Section({ id, title, content, layout = 'default' }) {
    const [scrollProgress, setScrollProgress] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);
    const [isBetaModalOpen, setIsBetaModalOpen] = React.useState(false);
    const sectionRef = React.useRef(null);

    // Check if this is the home section
    const isHome = id === 'home';

    const HomeHeader = ({ onBetaClick }) => (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center gap-4 mb-6">
                <span className="text-8xl font-bold text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    Nuvola
                </span>
                <span 
                    onClick={onBetaClick}
                    className="text-8xl font-bold text-white cursor-pointer hover:text-gray-200 
                        transition-colors duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                    Beta
                </span>
            </div>
            <p className="text-orange-500 text-xl font-mono tracking-wide mt-4">
                A Minecraft: Bedrock Edition utility mod from the future
            </p>
        </div>
    );

    const RegularHeader = ({ title }) => (
        <h1 className="text-6xl font-bold text-white text-center">
            {title}
        </h1>
    );

    const BetaModal = ({ isOpen, onClose }) => {
        if (!isOpen) return null;
        
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
                <div className="relative bg-gray-900/90 rounded-xl p-8 max-w-lg w-full mx-4">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-lg" />
                    <div className="relative">
                        <h3 className="text-2xl font-bold text-white mb-4">Beta Information</h3>
                        <p className="text-gray-300 mb-4">
                            This is a beta version of Nuvola. Features and functionality may change.
                            Current version includes:
                        </p>
                        <ul className="space-y-2 text-gray-300 mb-6">
                            <li className="flex items-center gap-2">
                                <span className="text-cyan-400">•</span>
                                Early access to new features
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-cyan-400">•</span>
                                Regular updates and improvements
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-cyan-400">•</span>
                                Community feedback integration
                            </li>
                        </ul>
                        <button 
                            onClick={onClose}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    React.useEffect(() => {
        const calculateProgress = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            const elementTop = rect.top;
            const elementBottom = rect.bottom;
            const elementHeight = rect.height;
            
            const visibleHeight = Math.min(elementBottom, viewportHeight) - Math.max(elementTop, 0);
            const visibleRatio = visibleHeight / elementHeight;
            
            const elementCenter = elementTop + (elementHeight / 2);
            const viewportCenter = viewportHeight / 2;
            const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
            const maxDistance = viewportHeight / 2;
            const centerAlignment = 1 - Math.min(distanceFromCenter / maxDistance, 1);
            
            const progress = Math.min(visibleRatio * centerAlignment * 1.5, 1);
            
            setScrollProgress(progress);
            setIsVisible(progress > 0.1);
        };

        window.addEventListener('scroll', calculateProgress);
        calculateProgress();

        return () => window.removeEventListener('scroll', calculateProgress);
    }, []);

    return (
        <section 
            ref={sectionRef}
            id={id} 
            className="min-h-screen flex items-center justify-center relative"
        >
            {/* Unified background effect */}
            <div className="absolute inset-0">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
                
                {/* Animated accent gradients */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 via-transparent to-purple-900/20 animate-gradient-shift"></div>
                    <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/20 via-transparent to-indigo-900/20 animate-gradient-shift-reverse"></div>
                </div>

                {/* Subtle grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
                
                {/* Floating orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-96 h-96 rounded-full opacity-20 animate-float"
                            style={{
                                background: `radial-gradient(circle, ${
                                    ['rgba(6,182,212,0.15)', 'rgba(99,102,241,0.15)', 'rgba(167,139,250,0.15)'][i]
                                } 0%, transparent 70%)`,
                                left: `${30 * i}%`,
                                top: `${20 * (i + 1)}%`,
                                animationDelay: `${i * 2}s`,
                                filter: 'blur(40px)'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto w-full relative z-10">
                <div className={`transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}>
                    {isHome ? (
                        <HomeHeader onBetaClick={() => setIsBetaModalOpen(true)} />
                    ) : (
                        <RegularHeader title={title} />
                    )}
                </div>

                {!isHome && content && (
                    <div className="mt-8 text-center text-gray-300 max-w-2xl mx-auto">
                        <ScrambleText text={content} progress={scrollProgress} />
                    </div>
                )}
            </div>

            <BetaModal 
                isOpen={isBetaModalOpen}
                onClose={() => setIsBetaModalOpen(false)}
            />
        </section>
    );
}

export { Section };