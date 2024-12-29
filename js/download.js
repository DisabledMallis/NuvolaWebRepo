function RetroRadioButton({ option, href, description, onClick, selected }) {
    const buttonRef = React.useRef(null);
    const rects1 = React.useRef([]);
    const rects2 = React.useRef([]);
    const textRef = React.useRef(null);
    
    // Pre-create GSAP timelines for better performance
    const timeline1 = React.useRef(gsap.timeline({ paused: true }));
    const timeline2 = React.useRef(gsap.timeline({ paused: true }));
    const textTimeline = React.useRef(gsap.timeline({ paused: true }));

    React.useEffect(() => {
        // Setup animations once on mount
        timeline1.current
            .to(rects1.current, {
                duration: 0.8,
                ease: "power2.out",
                xPercent: 100,
                stagger: 0.02,
                overwrite: true
            })
            .reverse();

        timeline2.current
            .to(rects2.current, {
                duration: 0.8,
                ease: "power2.out",
                xPercent: 100,
                stagger: 0.02,
                overwrite: true
            })
            .reverse();

        textTimeline.current
            .to(textRef.current, {
                duration: 0.3,
                color: '#ff6bd3',
                textShadow: '0 0 10px #ff6bd3, 0 0 20px #ff6bd3',
                scale: 1.05,
                ease: "power2.out"
            })
            .reverse();
    }, []);

    React.useEffect(() => {
        if (selected) {
            timeline1.current.play();
            timeline2.current.play();
            textTimeline.current.play();
        } else {
            timeline1.current.reverse();
            timeline2.current.reverse();
            textTimeline.current.reverse();
        }
    }, [selected]);

    const handleHover = (isHovered) => {
        if (!selected) {
            timeline1.current[isHovered ? 'play' : 'reverse']();
            timeline2.current[isHovered ? 'play' : 'reverse']();
            textTimeline.current[isHovered ? 'play' : 'reverse']();
        }
    };

    return (
        <div className="radio-btn-group w-full max-w-md">
            <input
                type="radio"
                name="download-option"
                value={option}
                id={`input-${option}`}
                className="opacity-0 absolute"
                onChange={() => onClick()}
                checked={selected}
            />
            <label
                htmlFor={`input-${option}`}
                className="retro-label"
                ref={buttonRef}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
            >
                <span 
                    ref={textRef}
                    className="text-white font-ibm-mono text-xl font-medium italic relative z-10 transition-colors duration-300"
                >
                    {option}
                </span>
                <svg 
                    height="100%" 
                    width="100%" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="absolute inset-0"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                    style={{ 
                        borderRadius: '12px',
                        overflow: 'hidden',
                        transform: 'skew(-15deg)',
                    }}
                >
                    <defs>
                        <linearGradient id="fillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#05eafa', stopOpacity: 0.6 }} />
                            <stop offset="100%" style={{ stopColor: '#ff6bd3', stopOpacity: 0.6 }} />
                        </linearGradient>
                    </defs>
                    <g className="blue">
                        {[...Array(10)].map((_, i) => (
                            <rect
                                key={`blue-${i}`}
                                ref={el => rects1.current[i] = el}
                                x="-100"
                                y={i * 10}
                                width="100"
                                height="10"
                                style={{ 
                                    fill: 'url(#fillGradient)', 
                                    shapeRendering: 'crispEdges',
                                    mixBlendMode: 'color-dodge',
                                    filter: 'drop-shadow(0 0 2px #05eafa)'
                                }}
                            />
                        ))}
                    </g>
                    <g className="pink">
                        {[...Array(10)].map((_, i) => (
                            <rect
                                key={`pink-${i}`}
                                ref={el => rects2.current[i] = el}
                                x="-100"
                                y={i * 10}
                                width="100"
                                height="10"
                                style={{ 
                                    fill: '#ff6bd3', 
                                    shapeRendering: 'crispEdges',
                                    opacity: 0.4,
                                    filter: 'drop-shadow(0 0 2px #ff6bd3)'
                                }}
                            />
                        ))}
                    </g>
                </svg>
            </label>
            <style jsx>{`
                .retro-label {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 64px;
                    padding: 0 40px;
                    position: relative;
                    font-family: 'IBM Plex Mono', monospace;
                    border-radius: 12px;
                    overflow: hidden;
                }

                .retro-label::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-color: rgba(20, 21, 26, 0.8);
                    background-image: repeating-linear-gradient(0deg, #181a29, #181a29 1px, #202436 1px, #202436 2px);
                    border-radius: 12px;
                    transform: skew(-15deg);
                    transition: all 0.3s;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(8px);
                    z-index: -1;
                }

                .retro-label:hover::before {
                    background-color: rgba(25, 26, 32, 0.9);
                    border-color: rgba(255, 255, 255, 0.2);
                    box-shadow: 
                        0 0 20px rgba(5, 234, 250, 0.3),
                        inset 0 0 20px rgba(5, 234, 250, 0.1);
                }
            `}</style>
        </div>
    );
}
function DownloadModal({ isOpen, onClose }) {
    const [selectedOption, setSelectedOption] = React.useState(null);

    if (!isOpen) return null;

    const handleOptionSelect = (option, href) => {
        setSelectedOption(option);
        setTimeout(() => {
            window.location.href = href;
        }, 1000);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@1,500&display=swap');
                
                .retro-label {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 64px;
                    padding: 0 40px;
                    position: relative;
                    font-family: 'IBM Plex Mono', monospace;
                    overflow: hidden;
                }

                .retro-label::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-color: rgba(20, 21, 26, 0.8);
                    background-image: repeating-linear-gradient(0deg, #181a29, #181a29 1px, #202436 1px, #202436 2px);
                    border-radius: 12px;
                    transform: skew(-15deg);
                    transition: all 0.4s;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(8px);
                    z-index: -1;
                }

                .retro-label:hover::before {
                    background-color: rgba(25, 26, 32, 0.9);
                    border-color: rgba(255, 255, 255, 0.2);
                    box-shadow: 
                        0 0 20px rgba(5, 234, 250, 0.3),
                        inset 0 0 20px rgba(5, 234, 250, 0.1);
                }

                input[type="radio"]:checked + .retro-label::before {
                    box-shadow: 
                        0 0 25px rgba(7, 99, 247, 0.4),
                        0 0 50px rgba(7, 99, 247, 0.2),
                        inset 0 0 20px rgba(7, 99, 247, 0.2);
                    border-color: rgba(7, 99, 247, 0.3);
                }
            `}</style>

            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
            
            <div className="relative bg-[#14151a]/90 rounded-3xl w-full max-w-2xl mx-4 p-12 backdrop-blur-xl border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-transparent rounded-3xl" />
                
                <div className="relative">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
                            bg-clip-text text-transparent animate-gradient-x">
                            Choose Download Method
                        </h2>
                    </div>

                    <div className="flex flex-col gap-8 items-center">
                        <RetroRadioButton
                            option="Custom Injector"
                            href="https://github.com/DisabledMallis/NuvolaWebRepo/releases"
                            selected={selectedOption === 'Custom Injector'}
                            onClick={() => handleOptionSelect('Custom Injector', 'https://github.com/DisabledMallis/NuvolaWebRepo/releases')}
                        />

                        <RetroRadioButton
                            option="Jiayi Import"
                            href="jiayi://addmod/https://github.com/DisabledMallis/NuvolaWebRepo/releases/latest/download/Nuvola.dll"
                            selected={selectedOption === 'Jiayi Import'}
                            onClick={() => handleOptionSelect('Jiayi Import', 'jiayi://addmod/https://github.com/DisabledMallis/NuvolaWebRepo/releases/latest/download/Nuvola.dll')}
                        />
                    </div>
                </div>

                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white/60 hover:text-white transition-all duration-300 
                        hover:rotate-90 hover:scale-110"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

function DownloadSection() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,0)_0%,_rgba(17,24,39,1)_100%)]" />
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center">
                <h1 className="text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
                    bg-clip-text text-transparent mb-12">
                    DOWNLOAD NUVOLA BETA
                </h1>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="group relative px-8 py-4 text-xl font-medium text-white"
                >
                    {/* Button glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 
                        rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300" />
                    
                    {/* Button content */}
                    <div className="relative bg-gray-900 rounded-lg px-8 py-4 ring-1 ring-white/10 
                        group-hover:ring-white/20 transition-all duration-300">
                        Download Now
                    </div>
                </button>
            </div>

            {/* Download options modal */}
            <DownloadModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </section>
    );
}

export default DownloadSection;