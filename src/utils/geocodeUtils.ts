import axios from 'axios';

export const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
            params: {
                lat: latitude,
                lon: longitude,
                format: 'json',
                'accept-language': 'en',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in reverse geocoding: ", error);
        return null;
    }
};
