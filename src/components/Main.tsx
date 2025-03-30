import { useEffect, useState } from "react";
import ModalImage from "./ModalImage";

interface UnsplashImage {
    id: string;
    urls: { regular: string };
    slug: string;
    user: { username: string };
}

interface UnsplashImageData {
    idImage: string;
    urlImage: string;
    imageSlug: string;
    imageUser: string;
}

function Main() {
    const [images, setImages] = useState<UnsplashImageData[]>([]);
    const [visibleImages, setVisibleImages] = useState(9);
    const [loading, setLoading] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const getImages = async () => {
            setLoading(true);
            try {
                const API_URL = `https://api.unsplash.com/photos/random?count=9`;
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

    const handleImageClick = (url: string) => {
        setSelectedImageUrl(url);
    };

    const handleCloseModal = () => {
        setSelectedImageUrl(null);
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <section className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl p-6 rounded-xl">
                {images.slice(0, visibleImages).map((image) => (
                    <div
                        onClick={() => handleImageClick(image.urlImage)}
                        key={image.idImage}
                        className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl hover:scale-[0.98] transition-all duration-300 ease-out cursor-pointer bg-white"
                    >
                        <img
                            src={image.urlImage}
                            alt={image.imageUser}
                            className="w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-95"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-800/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                            <p className="text-center text-sm font-medium text-white italic">
                                by {image.imageUser}
                            </p>
                        </div>
                    </div>
                ))}
            </section>

            {loading ? (
                <div className="flex justify-center items-center my-4">
                    <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <button
                    className="px-3 py-1.5 bg-transparent border-2 border-teal-500 text-teal-600 font-semibold rounded-lg w-full max-w-xs my-4 hover:bg-teal-500 hover:text-white hover:border-transparent hover:cursor-pointer transition-all duration-300 ease-out"
                    onClick={() => setVisibleImages((prev) => prev + 9)}
                >
                    Ver más
                </button>
            )}

            {selectedImageUrl && (
                <ModalImage imageURL={selectedImageUrl} setIsImageOpen={handleCloseModal} />
            )}
        </main>
    );
}

export default Main;