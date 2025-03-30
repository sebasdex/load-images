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
            <section className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white w-full max-w-6xl p-2">
                {images.slice(0, visibleImages).map((image) => (
                    <div
                        onClick={() => handleImageClick(image.urlImage)}
                        key={image.idImage}
                        className="flex flex-col items-center justify-center group hover:scale-[0.98] transition-all duration-300 ease-out shadow-sm hover:shadow-lg rounded-lg overflow-hidden hover:cursor-pointer"
                    >
                        <img
                            src={image.urlImage}
                            alt="Image"
                            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                        />
                        <p
                            className="absolute bottom-0 left-0 right-0 text-center text-sm font-medium text-gray-800 italic p-2 bg-gradient-to-t from-gray-100/90 to-transparent opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out"
                        >
                            by {image.imageUser}
                        </p>
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