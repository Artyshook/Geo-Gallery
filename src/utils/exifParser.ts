import exifr from 'exifr';

interface ExifMetadata {
    latitude?: number;
    longitude?: number;
    azimuth?: number;
}

export const parseExifData = async (imagePath: string): Promise<ExifMetadata | null> => {
    try {
        const exifData = await exifr.parse(imagePath);

        if (exifData) {
            const metadata: ExifMetadata = {
                latitude: exifData.latitude,
                longitude: exifData.longitude,
                azimuth: exifData.GPSImgDirection,
            };
            return metadata;
        }
    } catch (error) {
        console.error("Error parsing EXIF data: ", error);
    }
    return null;
};
