import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";

function Header({ toggleDarkMode, isDark }: { toggleDarkMode: () => void, isDark: boolean }) {


    return (
        <>
            <header className={`${isDark ? "dark" : ""} px-6 py-6 bg-white dark:bg-gray-900 relative flex justify-center items-center min-w-80`}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-white to-teal-500 dark:from-gray-900 dark:to-teal-400 rounded-full"></div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 text-center tracking-tighter uppercase flex items-center space-x-1 z-10">
                    <span className="relative">
                        Pics
                        <span className="absolute -top-2 -right-2 w-2 h-2 bg-teal-500 dark:bg-teal-400 rounded-full"></span>
                    </span>
                    <span className="text-teal-500 dark:text-teal-400">Vibe</span>
                </h1>
                <button
                    onClick={toggleDarkMode}
                    className="absolute right-6 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
                    aria-label="Toggle dark mode"
                >
                    {isDark ? (
                        <SunIcon />
                    ) : (
                        <MoonIcon />
                    )}
                </button>
            </header>
        </>
    );
}

export default Header;