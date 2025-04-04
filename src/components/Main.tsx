import { useEffect, useState, useRef } from "react";
import ModalImage from "./ModalImage";

interface UnsplashImage {
    id: string;
    urls: { regular: string };
    slug: string;
    user: { username: string; profile_image: { large: string } };
    downloads: number;
    likes: number;
    views: number;
    alt_description: string;
    created_at: string;
    width: number;
    height: number;
    links: { html: string };
    topic_submissions: { name: string }[];
}

interface UnsplashImageData {
    idImage: string;
    urlImage: string;
    imageSlug: string;
    imageUser: string;
    profileImage: string;
    downloadsNumber: number;
    likesNumber: number;
    viewsNumber: number;
    imageDescription: string;
    datePublished: string;
    dimensions: string;
    unsplashURL: string;
    topics: string[];
}

function Main({ isDark }: { isDark: boolean }) {
    const [images, setImages] = useState<UnsplashImageData[]>([]);
    const [visibleImages, setVisibleImages] = useState(27);
    const [loading, setLoading] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [downloadCount, setDownloadCount] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);
    const [description, setDescription] = useState("");
    const [imageUser, setImageUser] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [datePublished, setDatePublished] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [unsplashURL, setUnsplashURL] = useState("");
    const [topics, setTopics] = useState<string[]>([]);
    const scrollToTopRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const getImages = async () => {
            setLoading(true);
            try {
                const API_URL = `https://api.unsplash.com/photos/random?count=27`;
                const response = await fetch(API_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`,

                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch images");
                }

                const data: UnsplashImage[] = await response.json();
                const newImages = data.map((image: UnsplashImage) => ({
                    idImage: image.id,
                    urlImage: image.urls.regular,
                    imageSlug: image.slug,
                    imageUser: image.user.username,
                    profileImage: image.user.profile_image.large,
                    downloadsNumber: image.downloads,
                    likesNumber: image.likes,
                    viewsNumber: image.views,
                    imageDescription: image.alt_description,
                    datePublished: image.created_at,
                    dimensions: image.width + " x " + image.height,
                    unsplashURL: image.links.html,
                    topics: Object.keys(image.topic_submissions),
                }));

                setImages((prev) => {
                    const existingIds = new Set(prev.map((img) => img.idImage));
                    const filteredImages = newImages.filter((img) => !existingIds.has(img.idImage));
                    return [...prev, ...filteredImages];
                });
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        if (visibleImages > images.length && !loading) {
            getImages();
        }
    }, [visibleImages, images.length]);

    // Bloquear scroll si hay un modal abierto
    useEffect(() => {
        if (selectedImageUrl) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedImageUrl]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition >= 1500);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleImageClick = (url: string, image: UnsplashImageData) => {
        setSelectedImageUrl(url);
        setDownloadCount(image.downloadsNumber);
        setLikeCount(image.likesNumber);
        setViewCount(image.viewsNumber);
        setDescription(image.imageDescription);
        setImageUser(image.imageUser);
        setProfileImage(image.profileImage);
        setDatePublished(() => {
            const date = new Date(image.datePublished);
            return date.toLocaleDateString('es-ES', {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        });
        setDimensions(image.dimensions);
        setUnsplashURL(image.unsplashURL);
        setTopics(image.topics);
    };

    const handleCloseModal = () => {
        setSelectedImageUrl(null);
    };

    return (
        <main className={`${isDark ? "dark" : ""} relative min-h-screen min-w-80 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900`}>
            <section className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl p-6 rounded-xl bg-white dark:bg-gray-900">
                {images.slice(0, visibleImages).map((image) => (
                    <div
                        onClick={() => handleImageClick(image.urlImage as string, image)}
                        key={image.idImage}
                        className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl hover:scale-[0.98] transition-all duration-300 ease-out cursor-pointer bg-white dark:bg-gray-700"
                    >
                        <img
                            src={image.urlImage}
                            alt={`Photo by ${image.imageUser}`}
                            loading="lazy"
                            className="w-full h-64 object-cover flex items-center justify-center transition-opacity duration-300 group-hover:opacity-90"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-800/80 dark:from-gray-900/80 to-transparent p-2 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                            <img
                                src={image.profileImage}
                                alt={`Profile of ${image.imageUser}`}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                            <p className="text-xs font-medium text-white italic">
                                by {image.imageUser}
                            </p>
                        </div>
                    </div>
                ))}
            </section>

            {loading ? (
                <div className="flex justify-center items-center my-4">
                    <div className="w-8 h-8 border-4 border-teal-500 dark:border-teal-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <button
                    className="px-3 py-1.5 bg-transparent border-2 border-teal-500 dark:border-teal-400 text-teal-600 dark:text-teal-400 font-semibold rounded-lg w-full max-w-xs my-4 hover:bg-teal-500 dark:hover:bg-teal-400 hover:text-white hover:border-transparent hover:cursor-pointer transition-all duration-300 ease-out"
                    onClick={() => setVisibleImages((prev) => prev + 27)}
                >
                    Ver más
                </button>
            )}

            {selectedImageUrl && (
                <ModalImage
                    imageURL={selectedImageUrl}
                    setIsImageOpen={handleCloseModal}
                    downloadCount={downloadCount}
                    likeCount={likeCount}
                    viewCount={viewCount}
                    description={description}
                    imageUser={imageUser}
                    profileImage={profileImage}
                    datePublished={datePublished}
                    dimensions={dimensions}
                    unsplashURL={unsplashURL}
                    topics={topics}
                />
            )}
            <div
                className={`fixed bottom-4 right-4 justify-center items-center bg-white dark:bg-gray-700/10 rounded-full shadow-lg p-2 transition-all duration-300 ease-in-out ${isVisible ? "flex opacity-100 scale-100" : "opacity-0 scale-80 pointer-events-none"
                    }`}
                ref={scrollToTopRef}
            >
                <button
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none hover:cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Scroll to top"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            </div>
        </main>
    );
}

export default Main;