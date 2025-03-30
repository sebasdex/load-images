function Header() {
    return (
        <header className="px-6 py-6 bg-white relative flex justify-center items-center">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-white to-teal-500 rounded-full"></div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 text-center tracking-tighter uppercase flex items-center space-x-1">
                <span className="relative">
                    Pics
                    <span className="absolute -top-2 -right-2 w-2 h-2 bg-teal-500 rounded-full"></span>
                </span>
                <span className="text-teal-500">Vibe</span>
            </h1>
        </header>
    )
}

export default Header