import { useEffect, useState } from "react"
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
    useEffect(() => {
        const getImages = async () => {
            const API_URL = "https://api.unsplash.com/photos/random?count=12";
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
            const imagesData = data.map((image: UnsplashImage) => ({
                idImage: image.id,
                urlImage: image.urls.regular,
                imageSlug: image.slug,
                imageUser: image.user.username,
            }))
            setImages(imagesData);
        }
        getImages();
    }, [])
    return (
        <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <section className="grid grid-cols-3 gap-4 bg-white w-full max-w-6xl p-2">
                {images.map((image) => (
                    <div
                        key={image.idImage}
                        className="relative flex flex-col items-center justify-center group hover:scale-[0.98] transition-all duration-300 ease-out shadow-sm hover:shadow-lg rounded-lg overflow-hidden"
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
        </main>
    )
}

export default Main