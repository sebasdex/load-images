function Footer() {
    return (
        <footer className="py-4 bg-teal-50 border-t border-teal-200">
            <div className="max-w-4xl mx-auto text-center space-y-2">
                <p className="text-sm text-teal-700 font-light tracking-wide">
                    Creado con ❤️ por{" "}
                    <a
                        href="https://github.com/sebasdex"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="font-semibold text-teal-800 hover:text-teal-600 transition-colors duration-200"
                    >
                        SebastianDC
                    </a>
                </p>
                <p className="text-sm text-teal-700 font-light tracking-wide">
                    Imágenes cargadas desde{" "}
                    <a
                        href="https://unsplash.com/"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="font-semibold text-teal-800 hover:text-teal-600 transition-colors duration-200"
                    >
                        Unsplash
                    </a>
                </p>
            </div>
        </footer>
    )
}

export default Footer