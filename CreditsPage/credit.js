function Modal({ isOpen, onClose, member }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-8 max-w-lg w-full mx-4 relative">
                {/* Close button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Modal content */}
                <div className="mt-2">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                            <img 
                                src={member.icon} 
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                                {member.name}
                            </h2>
                            <p className="text-xl font-medium text-white/80 mt-2">{member.role}</p>
                        </div>
                    </div>
                    <div className="mt-6 space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                            <p className="text-gray-300">{member.description}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Contributions</h3>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                {member.contributions.map((contribution, index) => (
                                    <li key={index}>{contribution}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CreditCard({ member, onSelect }) { //not stealin the user credits card infomation LMAOOO
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div 
            className="relative group w-full max-w-sm mx-auto cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onSelect(member)}
        >
            <div className={`p-6 rounded-xl bg-gray-800/50 backdrop-blur-lg transform transition-all duration-500 
                ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100'}`}>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img 
                                src={member.icon} 
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                            {member.name}
                        </h3>
                    </div>
                    <p className="text-lg font-medium text-white/80 mt-2">{member.role}</p>
                    <p className="text-gray-400 mt-4">{member.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-xl transform transition-all duration-500 opacity-0 group-hover:opacity-100" />
            </div>
        </div>
    );
}

function NotificationPopup({ isOpen, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-gray-900/95 backdrop-blur-sm text-white px-8 py-4 rounded-lg shadow-xl transform transition-all duration-300 pointer-events-auto">
                <p className="text-lg">{message}</p>
            </div>
        </div>
    );
}
function Sparkles({ isHovered }) {
    const sparkleColors = ['#FF5F6D', '#FFC371', '#FFD700', '#FF69B4'];
    return (
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 
            ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-floating"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                    }}
                >
                    <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{
                            backgroundColor: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
                            animationDuration: `${0.5 + Math.random()}s`,
                            filter: 'blur(0.5px)'
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

function GlowingBorder({ isHovered }) {
    return (
        <div className={`absolute -inset-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
            rounded-2xl opacity-0 transition-opacity duration-300 blur-lg ${isHovered ? 'opacity-70' : ''}`} />
    );
}
function FeaturedCreditCard({ member, onSelect }) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <div 
            className="relative w-full cursor-pointer transform transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={() => onSelect(member)}
        >
            <GlowingBorder isHovered={isHovered} />
            <Sparkles isHovered={isHovered} />
            
            <div 
                className={`absolute pointer-events-none transition-opacity duration-300 ${
                    isHovered ? 'opacity-50' : 'opacity-0'
                }`}
                style={{
                    background: 'radial-gradient(circle 100px at center, rgba(255,255,255,0.1), transparent)',
                    width: '200px',
                    height: '200px',
                    transform: `translate(${mousePosition.x - 100}px, ${mousePosition.y - 100}px)`,
                    transition: 'transform 0.2s ease-out'
                }}
            />

            <div className={`p-8 rounded-2xl bg-gray-800/50 backdrop-blur-lg transform transition-all duration-500 
                relative overflow-hidden ${isHovered ? 'scale-[1.02] shadow-2xl' : 'scale-100'}`}>
                <div className="relative z-10 flex items-center gap-6">
                    <div className="relative group">
                        <div className={`absolute -inset-1 rounded-full transition-all duration-300 ${
                            isHovered ? 'blur-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500' : ''
                        }`} />
                        <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/20">
                            <img 
                                src={member.icon} 
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold">
                            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
                                bg-clip-text text-transparent">
                                {member.name}
                            </span>
                        </h3>
                        <p className="text-xl font-medium text-white/80 mt-2">{member.role}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="text-lg text-white/70 leading-relaxed">{member.description}</p>
                    <div className="mt-6 space-y-2">
                        {member.contributions.map((contribution, index) => (
                            <div 
                                key={index}
                                className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                                    isHovered ? 'bg-white/5' : ''
                                }`}
                            >
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center 
                                    ${isHovered ? 'bg-gradient-to-r from-pink-500 to-yellow-500' : 'bg-gray-700'}`}>
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                            d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-white/80">{contribution}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
function CreditsPage() {
    const [selectedMember, setSelectedMember] = React.useState(null);
    const [showNotification, setShowNotification] = React.useState(false);
    
    const handleReturn = () => {
        setShowNotification(true);
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1500); // Redirect after 1.5 seconds
    };

    const teamMembers = [
        //do not touch this person below here she's belong to mine!!!
        {
            name: "Lê Thị Kim Xuyến",
            role: "Motivation",
            description: "Động lực lớn cho tony làm Web và UI/UX",
            icon: "xuyen.jpg",
            contributions: [
                "Tại vì thích:)",
                "Nói chuyện mỗi ngày nên mát mát tẻn tẻn:>",
                "Rảnh quá nên bỏ cho vui."
            ],
            featured: true
        },
        {
            name: "Phạm Thị Ngọc Linh",
            role: "Đệp nhất đời của tony",
            description: "Nỗi nhớ mỗi ngày",
            icon: "linh.jpg",
            contributions: [
                "Nhớ quá nên phải bỏ đó",
                "Nói chuyện không nhiều nhưng thương nhất rồi",
                "Bỏ hết để lo cho em"
            ],
            featured: true
        },
        // do not touc this person part above because she's mineee!!
        {
            name: "ASM/disabledmallis",
            role: "Lead Developer",
            description: "OG Who made the whole base by himself!",
            icon: "ASM.png",
            contributions: [
                "Architected and implemented the core system",
                "Developed key features and functionality",
                "Established coding standards and best practices",
                "Mentored team members on technical challenges"
            ]
        },
        {
            name: "loud/loud2pro",
            role: "Professional reversing",
            description: "Reverse The game code so we can have an exploit:)",
            icon: "loud.png",
            contributions: [
                "Lead reverse engineering efforts",
                "Identified and documented game mechanics",
                "Developed exploit",
                "Optimized Client"
            ]
        },
        {
            name: "h-arvs/Harvey",
            role: "Module creator",
            description: "Help create usefull Modules",
            icon: "harv.jpg",
            contributions: [
                "Designed and implemented key modules",
                "Enhanced system functionality",
                "Created documentation for modules",
                "Collaborated on integration testing"
            ]
        },
        {
            name: "Muffin/Múp phin",
            role: "Người tịnh tâm",
            description: "Chill guy trong chat",
            icon: "mup.jpg",
            contributions: [
                "Người này đc rất nhiều gái theo",
                "Chơi game rất hay",
                "Có thể bị gay",
                "3 ae đi phá server"
            ]
        },
        {
            name: "Kubi/Bii",
            role: "Người vui vẻ:>",
            description: "Rất vui khi được làm bạn",
            icon: "khubi.jpg",
            contributions: [
                "Bỏ cho vui:)",
                "hmmm chơi game rất hay",
                "3 ae đi phá server",
                "Bựa"
            ]
        }
        
    ];

    const featuredMembers = teamMembers.filter(member => member.featured);
    const regularMembers = teamMembers.filter(member => !member.featured);

    return (
        <div className="min-h-screen bg-gray-900 py-20 px-4">
            {/* Header Section */}
            <div className="text-center mb-20">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 
                    bg-clip-text text-transparent mb-6">
                    Meet Our Team
                </h1>
                <p className="text-xl text-white/80 max-w-2xl mx-auto">
                    The brilliant minds behind Nuvola, working together to create something extraordinary.
                </p>
            </div>

            {/* Featured Members Grid - Now side by side */}
            <div className="mb-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredMembers.map((member, index) => (
                        <div key={member.name} className="w-full">
                            <FeaturedCreditCard 
                                member={member}
                                onSelect={setSelectedMember}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Regular Members Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                {regularMembers.map((member) => (
                    <CreditCard 
                        key={member.name}
                        member={member} 
                        onSelect={setSelectedMember}
                    />
                ))}
            </div>

            {/* Modal and Notification components */}
            <Modal 
                isOpen={selectedMember !== null}
                onClose={() => setSelectedMember(null)}
                member={selectedMember}
            />

            <NotificationPopup 
                isOpen={showNotification} 
                message="Redirecting to Nuvola Home Page..." 
            />

            {/* Footer Section */}
            <div className="text-center mt-20">
                <p className="text-white/60 text-lg">
                    Special thanks to our community and supporters
                </p>
                <div className="mt-6">
                    <button 
                        onClick={handleReturn}
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 
                            text-white font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
const styles = `
    @keyframes floating {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(5px, -5px) scale(1.2); }
        100% { transform: translate(0, 0) scale(1); }
    }

    .animate-floating {
        animation: floating 3s ease-in-out infinite;
    }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CreditsPage />
    </React.StrictMode>
);