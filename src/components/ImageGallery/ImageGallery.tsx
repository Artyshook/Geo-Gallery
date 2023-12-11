import './ImageGallery.css';
import { useState } from 'react';
import { MapComponent } from "./Map/MapComponent"; // Component to render the map
import { InView } from "react-intersection-observer"; // Component to detect when an element is in the viewport
import {ImageData, IPosition} from "./types";
import { useImageData } from "./utils/useImageData"; // Hook to fetch image data
import { ImageItem } from "./ImageItem/ImageItem"; // Component to render each image
import { ImageModal } from "./Modals/ImageModal"; // Modal component for image details

export const ImageGallery = () => {
    const [visibleImages, setVisibleImages] = useState<ImageData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    // Fetching image data using a custom hook
    const images = useImageData();

    const openModal = (index: number) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const showNextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % visibleImages.length);
    };

    const showPrevImage = () => {
        setCurrentImageIndex(prevIndex => prevIndex === 0 ? visibleImages.length - 1 : (prevIndex - 1) % visibleImages.length);
    };

    // const handleImageVisible = (image: ImageData) => {
    //     if (image.metadata?.latitude && image.metadata?.longitude) {
    //         setMapCenter({
    //             latitude: image.metadata.latitude,
    //             longitude: image.metadata.longitude,
    //         });
    //     }
    // };

    return (
        <div className="container">
            <div className="gallery">
                <div className="image-gallery-row">
                    {/* Render each image using the ImageItem component */}
                    {images.map((image, index) => (
                        <div key={index}>
                            {/* Lazy load images as they come into the viewport */}
                            <InView as="div" onChange={(inView) => {
                                if (inView) {
                                    // Add image to visibleImages state if it's not already present
                                    setVisibleImages(prev => !prev.some(vImage => vImage.src === image.src) ? [...prev, image] : prev);
                                }
                            }}>
                                <ImageItem
                                    image={image}
                                    onClick={() => openModal(index)}
                                />
                            </InView>
                        </div>
                    ))}
                </div>
            </div>
            <div className="map">
                {/* Render the map with markers for each visible image */}
                {visibleImages.length > 0 && (
                    <MapComponent
                        positions={visibleImages.map(({ metadata }) => ({
                            latitude: metadata?.latitude || 0,
                            longitude: metadata?.longitude || 0
                        }))}
                        visibleImages={visibleImages}
                    />
                )}
            </div>
            {/* Render the ImageModal if isModalOpen is true */}
            {isModalOpen && (
                <ImageModal
                    imageData={visibleImages[currentImageIndex]}
                    show={isModalOpen}
                    onHide={closeModal}
                    onNext={showNextImage}
                    onPrev={showPrevImage}
                />
            )}
        </div>
    );
};
