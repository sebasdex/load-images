import { useEffect } from "react";

interface ModalImageProps {
    imageURL: string;
    setIsImageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalImage({ imageURL, setIsImageOpen }: ModalImageProps) {
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
        <dialog className="fixed z-10 inset-0 min-h-screen w-full bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center"
        >
            <button className="absolute top-4 right-4 p-2 text-white rounded-full hover:bg-white group hover:cursor-pointer"
                onClick={handleCloseModal}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-black text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div className="bg-white rounded-lg p-4 w-full max-w-xl">
                <img src={imageURL} alt="Image" className="object-cover h-full mx-auto" />
            </div>
        </dialog>
    )
}

export default ModalImage