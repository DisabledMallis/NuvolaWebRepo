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
        {
            name: "Lê Thị Kim Xuyến",
            role: "Motivation",
            description: "Động lực lớn cho tony làm Web và UI/UX",
            icon: "xuyen.jpg",
            contributions: [
                "Tại vì thích:)",
                "Nói chuyện mỗi ngày nên mát mát tẻn tẻn:>",
                "Rảnh quá nên bỏ cho vui."
            ]
        },
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
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900 py-20 px-4">
            {/* Header Section */}
            <div className="text-center mb-20">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-6">
                    Meet Our Team
                </h1>
                <p className="text-xl text-white/80 max-w-2xl mx-auto">
                    The brilliant minds behind Nuvola, working together to create something extraordinary.
                </p>
            </div>

            {/* Credits Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-4">
                {teamMembers.map((member, index) => (
                    <CreditCard 
                        key={index} 
                        member={member} 
                        onSelect={setSelectedMember}
                    />
                ))}
            </div>

            {/* Modal */}
            <Modal 
                isOpen={selectedMember !== null}
                onClose={() => setSelectedMember(null)}
                member={selectedMember}
            />

            {/* Notification Popup */}
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
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CreditsPage />
    </React.StrictMode>
);