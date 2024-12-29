
const Game = ({ onClose }) => {
    const [currentView, setCurrentView] = React.useState('main'); // main, trivia, memes, triviaGame
    const [selectedLanguage, setSelectedLanguage] = React.useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [score, setScore] = React.useState(0);

    // Sample questions - In a real app, these would come from a backend
    const questions = {
        english: [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                correct: 2,
                timeLimit: 20
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correct: 1,
                timeLimit: 20
            }
            // Add more questions...
        ],
        vietnamese: [
            {
                question: "Thủ đô của Việt Nam là gì?",
                options: ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Huế"],
                correct: 1,
                timeLimit: 20
            },
            {
                question: "Con sông nào dài nhất Việt Nam?",
                options: ["Sông Hồng", "Sông Mê Kông", "Sông Đà", "Sông Cửu Long"],
                correct: 1,
                timeLimit: 20
            }
            // Add more questions...
        ]
    };

    // Sample memes data
    const memes = [
        {
            id: 1,
            title: "anbatukam",
            thumbnail: "https://media.discordapp.net/attachments/1131979935691579485/1322068258232205312/anbatukam.jpg?ex=676f8783&is=676e3603&hm=bf0618c03db58a5060e8407584bb6bf5f8407fd72d680b853aa53d4093b06696&=&format=webp&width=337&height=337",
            video: "https://cdn.discordapp.com/attachments/1131979935691579485/1322068258651897929/anbatukam.mp4?ex=676f8783&is=676e3603&hm=489a03a64ef8ac28c06c91041887bac4a67263ce9d972deed3b33f65f23040df&"
        },
        {
            id: 2,
            title: "Nhi ơi",
            thumbnail: "https://media.discordapp.net/attachments/1286411340109582418/1322068761364398080/image.png?ex=676f87fb&is=676e367b&hm=82921706f8a6e963d3beb64fc91d6481e2c83340b46755d0fa230af732c66733&=&format=webp&quality=lossless&width=498&height=888",
            video: "https://cdn.discordapp.com/attachments/1286411340109582418/1322068797955244043/nhioi.mov?ex=676f8804&is=676e3684&hm=c6eff1c83133c46dae8ba94f316123d7b2968625d2c7ac0d7b987175f3f67961&"
        },
        {
            id: 3,
            title: "Boobs",
            thumbnail: "https://cdn.discordapp.com/attachments/1286411340109582418/1322092827127316570/image.png?ex=676f9e65&is=676e4ce5&hm=110238da0ff8c76d2d7f82f2dd90b025f586a7b11985f60b932a88f329afefb8&",
            video: "https://cdn.discordapp.com/attachments/1131979935691579485/1322091517673869383/ED128CBE-0683-4007-9315-2F2D44E2F20A.mp4?ex=676f9d2d&is=676e4bad&hm=18927f6ceb0360263c1f1e8d2b0dde7780cf14115b642ad87558dfa6d76dd230&"
        }
        // Add more memes...
    ];

    const MainMenu = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <button 
                onClick={() => setCurrentView('triviaSelect')}
                className="p-8 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 
                    hover:from-purple-500/30 hover:to-indigo-500/30 border border-purple-500/20
                    transition-all duration-300 group"
            >
                <div className="flex flex-col items-center gap-4">
                    <svg className="w-16 h-16 text-purple-400 group-hover:scale-110 transition-transform" 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-purple-400">Trivia Game</h3>
                    <p className="text-gray-400 text-center">Test your knowledge with fun questions!</p>
                </div>
            </button>

            <button 
                onClick={() => setCurrentView('memes')}
                className="p-8 rounded-xl bg-gradient-to-br from-pink-500/20 to-red-500/20 
                    hover:from-pink-500/30 hover:to-red-500/30 border border-pink-500/20
                    transition-all duration-300 group"
            >
                <div className="flex flex-col items-center gap-4">
                    <svg className="w-16 h-16 text-pink-400 group-hover:scale-110 transition-transform" 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-pink-400">Meme Zone</h3>
                    <p className="text-gray-400 text-center">Watch and enjoy funny meme videos!</p>
                </div>
            </button>
        </div>
    );

    const LanguageSelect = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <button 
                onClick={() => {
                    setSelectedLanguage('english');
                    setCurrentView('triviaGame');
                }}
                className="p-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 
                    hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-500/20
                    transition-all duration-300 group"
            >
                <div className="flex flex-col items-center gap-4">
                    <span className="text-6xl">🇬🇧</span>
                    <h3 className="text-2xl font-bold text-blue-400">English</h3>
                    <p className="text-gray-400 text-center">Play trivia in English</p>
                </div>
            </button>

            <button 
                onClick={() => {
                    setSelectedLanguage('vietnamese');
                    setCurrentView('triviaGame');
                }}
                className="p-8 rounded-xl bg-gradient-to-br from-red-500/20 to-yellow-500/20 
                    hover:from-red-500/30 hover:to-yellow-500/30 border border-red-500/20
                    transition-all duration-300 group"
            >
                <div className="flex flex-col items-center gap-4">
                    <span className="text-6xl">🇻🇳</span>
                    <h3 className="text-2xl font-bold text-red-400">Vietnamese</h3>
                    <p className="text-gray-400 text-center">Chơi câu đố bằng tiếng Việt</p>
                </div>
            </button>
        </div>
    );

    const TriviaGame = () => {
        const [timeLeft, setTimeLeft] = React.useState(questions[selectedLanguage][currentQuestionIndex].timeLimit);
        const [selectedAnswer, setSelectedAnswer] = React.useState(null);
        const [showResult, setShowResult] = React.useState(false);

        React.useEffect(() => {
            if (timeLeft > 0 && !showResult) {
                const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
                return () => clearTimeout(timer);
            }
        }, [timeLeft, showResult]);

        const currentQuestion = questions[selectedLanguage][currentQuestionIndex];

        const handleAnswerClick = (index) => {
            if (showResult) return;
            
            setSelectedAnswer(index);
            setShowResult(true);
            
            if (index === currentQuestion.correct) {
                setScore(score + 1);
            }

            setTimeout(() => {
                if (currentQuestionIndex < questions[selectedLanguage].length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedAnswer(null);
                    setShowResult(false);
                    setTimeLeft(questions[selectedLanguage][currentQuestionIndex + 1].timeLimit);
                } else {
                    // Game over
                    setCurrentView('gameOver');
                }
            }, 2000);
        };

        return (
            <div className="p-8 max-w-4xl mx-auto">
                {/* Timer and Score */}
                <div className="flex justify-between items-center mb-8">
                    <div className="text-2xl font-bold text-purple-400">
                        Score: {score}
                    </div>
                    <div className="text-2xl font-bold text-red-400">
                        Time: {timeLeft}s
                    </div>
                </div>

                {/* Question */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        {currentQuestion.question}
                    </h2>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerClick(index)}
                            className={`p-6 rounded-xl text-xl font-medium transition-all duration-300 
                                ${showResult 
                                    ? index === currentQuestion.correct 
                                        ? 'bg-green-500/30 border-green-500'
                                        : index === selectedAnswer 
                                            ? 'bg-red-500/30 border-red-500'
                                            : 'bg-gray-800/30 border-gray-700'
                                    : 'bg-gray-800/30 hover:bg-gray-700/30 border-gray-700'
                                } border`}
                            disabled={showResult}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const VideoPlayer = ({ video, thumbnail, title }) => {
        const videoRef = React.useRef(null);
        const [isPlaying, setIsPlaying] = React.useState(false);
        const [isLoaded, setIsLoaded] = React.useState(false);
    
        const handlePlay = () => {
            if (videoRef.current) {
                videoRef.current.play();
                setIsPlaying(true);
            }
        };
    
        const handlePause = () => {
            if (videoRef.current) {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        };
    
        const handleLoadedData = () => {
            setIsLoaded(true);
        };
    
        return (
            <div className="relative group">
                {/* Video container */}
                <div className="aspect-video bg-gray-900 relative overflow-hidden rounded-lg">
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                            <div className="w-8 h-8 border-4 border-purple-500/50 border-t-purple-500 rounded-full animate-spin" />
                        </div>
                    )}
                    <video
                        ref={videoRef}
                        className="w-full h-full object-contain"
                        poster={thumbnail}
                        onLoadedData={handleLoadedData}
                        onClick={() => isPlaying ? handlePause() : handlePlay()}
                        playsInline
                    >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
    
                    {/* Play/Pause overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/30 
                        transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'} 
                        group-hover:opacity-100 cursor-pointer`}
                        onClick={() => isPlaying ? handlePause() : handlePlay()}
                    >
                        {isPlaying ? (
                            <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                            </svg>
                        ) : (
                            <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            </svg>
                        )}
                    </div>
                </div>
    
                {/* Video title */}
                <div className="p-4">
                    <h3 className="text-lg font-medium text-white">{title}</h3>
                </div>
            </div>
        );
    };
    
    // Update the MemeZone component to use the new VideoPlayer
    const MemeZone = () => (
        <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {memes.map(meme => (
                    <div key={meme.id} className="bg-gray-800/30 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
                        <VideoPlayer
                            video={meme.video}
                            thumbnail={meme.thumbnail}
                            title={meme.title}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    const GameOver = () => (
        <div className="flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl font-bold text-white mb-4">Game Over!</h2>
            <p className="text-2xl text-gray-400 mb-8">Final Score: {score}</p>
            <div className="flex gap-4">
                <button 
                    onClick={() => {
                        setCurrentQuestionIndex(0);
                        setScore(0);
                        setCurrentView('triviaSelect');
                    }}
                    className="px-6 py-3 rounded-lg bg-purple-500/20 text-purple-400 
                        hover:bg-purple-500/30 transition-colors"
                >
                    Play Again
                </button>
                <button 
                    onClick={() => setCurrentView('main')}
                    className="px-6 py-3 rounded-lg bg-gray-700/20 text-gray-400 
                        hover:bg-gray-700/30 transition-colors"
                >
                    Main Menu
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="max-w-6xl w-full h-[80vh] bg-gray-800/50 rounded-xl backdrop-blur-xl 
                shadow-2xl border border-gray-700/50 overflow-hidden animate-fadeIn">
                
                {/* Header */}
                <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 
                        bg-clip-text text-transparent">
                        Game Zone
                    </h1>
                    <div className="flex items-center gap-4">
                        {currentView !== 'main' && (
                            <button 
                                onClick={() => setCurrentView('main')}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </button>
                        )}
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

                {/* Content */}
                <div className="h-[calc(80vh-4rem)] overflow-y-auto">
                    {currentView === 'main' && <MainMenu />}
                    {currentView === 'triviaSelect' && <LanguageSelect />}
                    {currentView === 'triviaGame' && <TriviaGame />}
                    {currentView === 'memes' && <MemeZone />}
                    {currentView === 'gameOver' && <GameOver />}
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
                    
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                    
                    .animate-pulse {
                        animation: pulse 2s infinite;
                    }

                    .trivia-option {
                        transition: all 0.3s ease;
                    }

                    .trivia-option:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    }

                    .video-container {
                        position: relative;
                        padding-top: 56.25%; /* 16:9 Aspect Ratio */
                    }

                    .video-container video {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                `}
            </style>
        </div>
    );
};

// Make Game component available globally
window.Game = Game;