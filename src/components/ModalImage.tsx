import { useEffect } from "react";
import CloseIcon from "../icons/CloseIcon";
import DownloadIcon from "../icons/DownloadIcon";
import LikeIcon from "../icons/LikeIcon";
import ViewsIcon from "../icons/ViewsIcon";
import DateIcon from "../icons/DateIcon";
import DimensionIcon from "../icons/DimensionIcon";
import MoreIcon from "../icons/MoreIcon";

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
    topics: string[];
}

function ModalImage({ imageURL, setIsImageOpen, downloadCount, likeCount, viewCount, description, imageUser, profileImage, datePublished, dimensions, unsplashURL, topics }: ModalImageProps) {
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
        <dialog className="fixed z-10 inset-0 w-full h-full bg-black/70 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6">
            {/* Botón de cerrar */}
            <button
                className="absolute top-3 right-3 p-1.5 bg-gray-900/50 dark:bg-gray-700/50 text-white dark:text-gray-200 rounded-full hover:bg-white dark:hover:bg-gray-600 group transition-all duration-200 hover:cursor-pointer"
                onClick={handleCloseModal}
            >
                <CloseIcon />
            </button>

            {/* Contenedor principal */}
            <div className="rounded-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
                {/* Imagen */}
                <div className="w-full md:w-2/3 h-64 md:h-[32rem] relative">
                    <img
                        src={imageURL}
                        alt={`Photo by ${imageUser}`}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Datos */}
                <div className="w-full md:w-1/3 p-4 md:p-5 bg-gray-100 dark:bg-gray-700 flex flex-col">
                    {/* Autor y perfil */}
                    <div className="mb-3">
                        <div className="flex items-center space-x-3">
                            <img
                                src={profileImage}
                                alt={`Profile of ${imageUser}`}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-indigo-500 dark:border-indigo-400"
                            />
                            <div>
                                <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100">
                                    {imageUser}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Photographer</p>
                            </div>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="mb-3">
                        <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-tight">
                            {description || "No description available"}
                        </p>
                    </div>

                    {/* Topics */}
                    <div className="mb-4 space-y-1">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">Topics:</p>
                        <div className="flex flex-wrap gap-1.5">
                            {topics.length > 0 ? (
                                topics.map((topic, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-500"
                                    >
                                        {topic}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-600 dark:text-gray-400 text-xs italic">
                                    No topics available
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Info adicional */}
                    <div className="flex-1 flex flex-col justify-between text-gray-800 dark:text-gray-200 text-sm space-y-2">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <DownloadIcon />
                                <p><strong>Downloads:</strong> {downloadCount}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <LikeIcon />
                                <p><strong>Likes:</strong> {likeCount}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <ViewsIcon />
                                <p><strong>Views:</strong> {viewCount}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <DateIcon />
                                <p><strong>Published:</strong> {datePublished || "Unknown"}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <DimensionIcon />
                                <p><strong>Dimensions:</strong> {dimensions || "Unknown"}</p>
                            </div>
                        </div>

                        <div className="mt-3">
                            <a
                                href={unsplashURL}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="flex items-center justify-center space-x-2 bg-indigo-500 dark:bg-indigo-600 text-white dark:text-gray-100 text-sm font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-all duration-200"
                            >
                                <MoreIcon />
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