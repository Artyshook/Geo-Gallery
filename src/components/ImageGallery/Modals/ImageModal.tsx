import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { reverseGeocode } from '../../../utils/geocodeUtils';
import { ImageData } from '../types';

interface ImageModalProps {
    show: boolean;
    onHide: () => void;
    imageData: ImageData;
    onNext: () => void;
    onPrev: () => void;
}

interface LocationInfo {
    address?: {
        city?: string;
        country?: string;
    };
}

export const ImageModal = ({
                        show,
                        onHide,
                        imageData,
                        onNext,
                        onPrev,
                    }: ImageModalProps) => {
    const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);

    useEffect(() => {
        if (show && imageData.metadata?.latitude && imageData.metadata?.longitude) {
            reverseGeocode(imageData.metadata.latitude, imageData.metadata.longitude)
                .then((data) => setLocationInfo(data))
                .catch((error) => console.error('Reverse geocoding failed:', error));
        }
    }, [show, imageData]);

    return (
        <Modal show={show} onHide={onHide} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {locationInfo ? (
                        <>
                            {locationInfo.address?.city ? `${locationInfo.address.city}, ` : ''}
                            {locationInfo.address?.country || 'Image Location'}
                        </>
                    ) : (
                        'Image Location'
                    )}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={imageData.src} alt='Gallery Image' className='img-fluid' />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onPrev}>
                    Previous
                </Button>
                <Button variant='secondary' onClick={onNext}>
                    Next
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
