function Timeline() {
    const [progress, setProgress] = React.useState(0);
    const totalBalls = 50;
    const colors = ['#1d392f','#ef8764','#9dc1c3','#4a7a7d','#463d97','#a597e5'];
    
    React.useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;  
            const scrolled = (winScroll / height) * totalBalls;
            setProgress(Math.floor(scrolled)); 
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed left-6 top-1/2 transform -translate-y-1/2">
            <div className="flex flex-col gap-1">
                {Array.from({ length: totalBalls }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i <= progress 
                                ? 'scale-125 opacity-100 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-rainbow' 
                                : 'scale-100 opacity-30'
                        }`}
                        style={{
                            boxShadow: i <= progress 
                                ? `0 0 10px ${colors[i % colors.length]}, 0 0 20px ${colors[i % colors.length]}` 
                                : 'none'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}