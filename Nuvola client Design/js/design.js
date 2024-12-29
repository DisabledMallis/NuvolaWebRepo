const FeatureBox = ({ title, description, icon, onClick }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 
                rounded-lg blur opacity-25 transition-opacity duration-500 
                ${isHovered ? 'opacity-75' : 'group-hover:opacity-50'}`} />

            <div className="relative bg-gray-900/90 rounded-lg p-8 h-full 
                transition-transform duration-300 transform hover:scale-[1.02]">
                <div className="h-12 w-12 mb-4">
                    {icon}
                </div>
                
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 
                    bg-clip-text text-transparent mb-4">
                    {title}
                </h3>
                
                <p className="text-gray-300 text-lg">
                    {description}
                </p>
            </div>
        </div>
    );
};

const WelcomeMessage = () => {
    const welcomeMessages = [
        { text: "Welcome to Nuvola", lang: "English" },
        { text: "Bienvenido a Nuvola", lang: "Spanish" },
        { text: "Bienvenue à Nuvola", lang: "French" },
        { text: "Willkommen bei Nuvola", lang: "German" },
        { text: "Benvenuti a Nuvola", lang: "Italian" },
        { text: "Bem-vindo ao Nuvola", lang: "Portuguese" },
        { text: "Nuvola へようこそ", lang: "Japanese" },
        { text: "欢迎来到 Nuvola", lang: "Chinese" },
        { text: "Добро пожаловать в Nuvola", lang: "Russian" },
        { text: "Nuvola에 오신 것을 환영합니다", lang: "Korean" },
        { text: "Selamat datang di Nuvola", lang: "Indonesian" },
        { text: "Chào mừng đến với Nuvola", lang: "Vietnamese" },
        { text: "Nuvola मे आपका स्वागत है", lang: "Hindi" },
        { text: "Καλώς ήρθατε στο Nuvola", lang: "Greek" },
        { text: "Nuvola'ya hoş geldiniz", lang: "Turkish" },
        { text: "Välkommen till Nuvola", lang: "Swedish" },
        { text: "Tervetuloa Nuvolaan", lang: "Finnish" },
        { text: "Witamy w Nuvola", lang: "Polish" },
        { text: "Vítejte v Nuvola", lang: "Czech" },
        { text: "Velkommen til Nuvola", lang: "Danish" },
        { text: "Maligayang pagdating sa Nuvola", lang: "Filipino" },
        { text: "Nuvola لأهلا بك في", lang: "Arabic" },
        { text: "ברוכים הבאים ל-Nuvola", lang: "Hebrew" },
        { text: "Nuvola ยินดีต้อนรับสู่", lang: "Thai" },
        { text: "Welkom bij Nuvola", lang: "Dutch" },
        { text: "Velkomin í Nuvola", lang: "Icelandic" },
        { text: "Bun venit la Nuvola", lang: "Romanian" },
        { text: "Mirë se vini në Nuvola", lang: "Albanian" },
        { text: "Nuvola د ته ښه راغلاست", lang: "Pashto" },
        { text: "خوش آمدید به Nuvola", lang: "Persian" },
        { text: "Swaagat hai Nuvola mein", lang: "Hindi (Roman)" },
        { text: "Nuvola へいらっしゃいませ", lang: "Japanese (Keigo)" },
        { text: "Välkomna till Nuvola", lang: "Swedish" },
        { text: "Tere tulemast Nuvolasse", lang: "Estonian" },
        { text: "Laipni lūdzam Nuvola", lang: "Latvian" },
        { text: "Sveiki atvykę į Nuvola", lang: "Lithuanian" },
        { text: "Fáilte go Nuvola", lang: "Irish" },
        { text: "Croeso i Nuvola", lang: "Welsh" },
        { text: "Bienvenidos a Nuvola", lang: "Spanish (Formal)" },
        { text: "Bonvenon al Nuvola", lang: "Esperanto" },
        { text: "ยินดีต้อนรับสู่ Nuvola", lang: "Thai" },
        { text: "Nuvola-へようこそ", lang: "Japanese (Hiragana)" },
        { text: "Benvinguts a Nuvola", lang: "Catalan" },
        { text: "Добре дошли в Nuvola", lang: "Bulgarian" },
        { text: "Добродошли у Nuvola", lang: "Serbian" },
        { text: "Vítajte v Nuvola", lang: "Slovak" },
        { text: "Üdvözöljük a Nuvola", lang: "Hungarian" },
        { text: "Dobrodošli u Nuvola", lang: "Croatian" },
        { text: "Välkommen till Nuvola", lang: "Swedish" },
        { text: "Tervetuloa Nuvolaan", lang: "Finnish" }
    ];

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % welcomeMessages.length);
                setIsAnimating(false);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden h-32">
            <div className={`transform transition-all duration-500 text-center
                ${isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 
                    to-pink-300 bg-clip-text text-transparent mb-2">
                    {welcomeMessages[currentIndex].text}
                </h1>
                <p className="text-gray-500 text-sm">
                    {welcomeMessages[currentIndex].lang}
                </p>
            </div>
        </div>
    );
};

// Previous components remain the same (ClickGUI, FeatureBox, WelcomeMessage)

const FeatureGrid = () => {
    const [showClickGUI, setShowClickGUI] = React.useState(false);
    const [showManagement, setShowManagement] = React.useState(false);
    const [showGame, setShowGame] = React.useState(false);

    return (
        <div className="min-h-screen bg-gray-900 py-20 px-4 relative overflow-hidden">
            {/* Background elements remain the same */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-96 h-96 rounded-full opacity-30"
                        style={{
                            background: `radial-gradient(circle, ${
                                ['rgba(129,140,248,0.2)', 'rgba(167,139,250,0.2)', 'rgba(192,132,252,0.2)'][i]
                            } 0%, transparent 70%)`,
                            left: `${30 * i}%`,
                            top: `${20 * (i + 1)}%`,
                            filter: 'blur(40px)',
                            transform: 'translate3d(0, 0, 0)',
                            animation: `float ${8 + i * 2}s ease-in-out infinite alternate`
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <WelcomeMessage />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureBox
                        title="ClickGUI"
                        description="Customize your experience with our intuitive click-based graphical user interface."
                        icon={
                            <svg className="w-full h-full text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                            </svg>
                        }
                        onClick={() => setShowClickGUI(true)}
                    />
                    
                    <FeatureBox
                        title="Manage"
                        description="Efficiently organize and control all aspects of your system in one place."
                        icon={
                            <svg className="w-full h-full text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        }
                        onClick={() => setShowManagement(true)}
                    />
                    
                    <FeatureBox
                        title="Game"
                        description="Play trivia games and enjoy memes in our entertainment zone."
                        icon={
                            <svg className="w-full h-full text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                            </svg>
                        }
                        onClick={() => setShowGame(true)}
                    />
                </div>
            </div>

            <style>
                {`
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        100% { transform: translateY(-20px); }
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    
                    .animate-fadeIn {
                        animation: fadeIn 0.3s ease-out forwards;
                    }
                `}
            </style>

            {showClickGUI && <ClickGUI onClose={() => setShowClickGUI(false)} />}
            {showManagement && <Management onClose={() => setShowManagement(false)} />}
            {showGame && <Game onClose={() => setShowGame(false)} />}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FeatureGrid />);