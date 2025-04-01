import { useEffect } from "react";

interface ModalImageProps {
    imageURL: string;
    setIsImageOpen: React.Dispatch<React.SetStateAction<boolean>>;
    downloadCount: number;
    likeCount: number;
    viewCount: number;
    description: string;
    imageUser: string;
    profileImage: string;
    datePublished: string;
    dimensions: string;
    unsplashURL: string;
}

function ModalImage({ imageURL, setIsImageOpen, downloadCount, likeCount, viewCount, description, imageUser, profileImage, datePublished, dimensions, unsplashURL }: ModalImageProps) {
    useEffect(() => {
        const escFunction = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCloseModal();
            }
        };
        document.addEventListener('keydown', escFunction);
        return () => {
            document.removeEventListener('keydown', escFunction);
        };
    }, []);

    const handleCloseModal = () => {
        setIsImageOpen(false);
    }
    return (
        <dialog
            className="fixed z-10 inset-0 w-full h-full bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
        >
            {/* Botón de cerrar */}
            <button
                className="absolute top-3 right-3 p-1.5 bg-gray-900/50 text-white rounded-full hover:bg-white group transition-all duration-200 hover:cursor-pointer"
                onClick={handleCloseModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 group-hover:text-gray-800 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Contenedor principal */}
            <div className="rounded-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden shadow-2xl">
                {/* Imagen */}
                <div className="w-full md:w-2/3 h-64 md:h-[32rem] relative">
                    <img
                        src={imageURL}
                        alt={`Photo by ${imageUser}`}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Datos */}
                <div className="w-full md:w-1/3 p-4 md:p-5 bg-gray-100 flex flex-col">
                    {/* Autor y perfil */}
                    <div className="mb-3">
                        <div className="flex items-center space-x-3">
                            <img
                                src={profileImage}
                                alt={`Profile of ${imageUser}`}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-indigo-500"
                            />
                            <div>
                                <p className="text-sm md:text-base font-semibold text-gray-900">
                                    {imageUser}
                                </p>
                                <p className="text-xs text-gray-600">Photographer</p>
                            </div>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="mb-3">
                        <p className="text-sm text-gray-700 italic leading-tight">
                            {description || "No description available"}
                        </p>
                    </div>

                    {/* Info adicional */}
                    <div className="flex-1 flex flex-col justify-between text-gray-800 text-sm space-y-2">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-blue-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                </svg>
                                <p><strong>Downloads:</strong> {downloadCount}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                                <p><strong>Likes:</strong> {likeCount}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542-7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                                <p><strong>Views:</strong> {viewCount}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <p><strong>Published:</strong> {datePublished || "Unknown"}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-orange-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                    />
                                </svg>
                                <p><strong>Dimensions:</strong> {dimensions || "Unknown"}</p>
                            </div>
                        </div>

                        <div className="mt-3">
                            <a
                                href={unsplashURL}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="flex items-center justify-center space-x-2 bg-indigo-500 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-all duration-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                                <span>Ver más en Unsplash</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default ModalImage