import './ImageGallery.css';
import {useEffect, useRef, useState} from 'react';
import { MapComponent } from "./Map/MapComponent"; // Component to render the map
import { InView } from "react-intersection-observer"; // Component to detect when an element is in the viewport
import {ImageData} from "./types";
import { useImageData } from "./utils/useImageData"; // Hook to fetch image data
import { ImageItem } from "./ImageItem/ImageItem"; // Component to render each image
import { ImageModal } from "./Modals/ImageModal"; // Modal component for image details

export const ImageGallery = () => {
    const [visibleImages, setVisibleImages] = useState<ImageData[]>([]);
    const [activeImages, setActiveImages] = useState<ImageData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [selectedMarker, setSelectedMarker] = useState<string>('');

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
                                    if (!visibleImages.includes(image)) {
                                        setActiveImages(prev => [...prev, image]);
                                    }
                                    setActiveImages(prev => !prev.some(vImage => vImage.src === image.src) ? [...prev, image] : prev);
                                } else {
                                    setActiveImages(prev => prev.filter(img => img !== image));
                                }
                                if (inView) {
                                    // Add image to visibleImages state if it's not already present
                                    setVisibleImages(prev => !prev.some(vImage => vImage.src === image.src) ? [...prev, image] : prev);
                                    // updateVisibleImages(image, inView);
                                }
                            }}>
                                <ImageItem
                                    image={image}
                                    onClick={() => openModal(index)}
                                    selected={selectedMarker === image.src}
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
                        positions={visibleImages.map(({ metadata, src }) => ({
                            latitude: metadata?.latitude || 0,
                            longitude: metadata?.longitude || 0,
                            src: src
                        }))}
                        activeImages={activeImages}
                        onMarkerClick={(src) => setSelectedMarker(src)} // Callback for marker click
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
