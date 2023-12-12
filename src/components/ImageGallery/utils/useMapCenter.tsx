import { useState, useEffect } from 'react';
import {ImageData, IPosition} from "../types";

export function useMapCenter(activeImages: ImageData[]): IPosition | null {
    const [mapCenter, setMapCenter] = useState<IPosition | null>(null);

    useEffect(() => {
        if (activeImages.length > 0) {
            const firstPosition = activeImages[0];
            const lastPosition = activeImages[activeImages.length - 1];

            const newCenter = {
                latitude: (firstPosition.metadata?.latitude + lastPosition.metadata?.latitude) / 2,
                longitude: (firstPosition.metadata?.longitude + lastPosition.metadata?.longitude) / 2,
            };

            const timeoutId = setTimeout(() => {
                setMapCenter(newCenter);
            }, 400);

            return () => clearTimeout(timeoutId);
        }
    }, [activeImages]);

    return mapCenter;
}

