function Header({ toggleDarkMode, isDark }: { toggleDarkMode: () => void, isDark: boolean }) {


    return (
        <>
            <header className={`${isDark ? "dark" : ""} px-6 py-6 bg-white dark:bg-gray-900 relative flex justify-center items-center`}>
                {/* Barra superior */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-white to-teal-500 dark:from-gray-900 dark:to-teal-400 rounded-full"></div>

                {/* Título centrado */}
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 text-center tracking-tighter uppercase flex items-center space-x-1 z-10">
                    <span className="relative">
                        Pics
                        <span className="absolute -top-2 -right-2 w-2 h-2 bg-teal-500 dark:bg-teal-400 rounded-full"></span>
                    </span>
                    <span className="text-teal-500 dark:text-teal-400">Vibe</span>
                </h1>

                {/* Botón de alternancia (a la derecha) */}
                <button
                    onClick={toggleDarkMode}
                    className="absolute right-6 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
                    aria-label="Toggle dark mode"
                >
                    {isDark ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                    )}
                </button>
            </header>
        </>
    );
}

export default Header;