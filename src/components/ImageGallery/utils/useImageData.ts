import { useState, useEffect } from 'react';
import {parseExifData} from "../../../utils/exifParser";
import {ImageData} from "../types";

export function useImageData() {
    const [images, setImages] = useState<ImageData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imageContext = import.meta.glob('/content/*.{png,jpg,jpeg,svg}');
                const imageKeys = Object.keys(imageContext);

                const imagesData: ImageData[] = await Promise.all(
                    imageKeys.map(async (key) => {
                        const imageFunction = imageContext[key];
                        const src = (await imageFunction()).default;
                        const metadata = await parseExifData(src);
                        const image: ImageData = { src, metadata };
                        return image;
                    })
                );

                setImages(imagesData);
            } catch (error) {
                console.error('Chyba při načítání dat:', error);
            }
        };

        fetchData();
    }, []);

    return images;
}
