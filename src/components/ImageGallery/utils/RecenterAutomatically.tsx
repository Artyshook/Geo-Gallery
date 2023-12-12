import { useEffect } from 'react';
import {useMap} from "react-leaflet";

export const RecenterAutomatically = ({ lat, lng }) => {
    const map = useMap();

    useEffect(() => {
        if(lat && lng) {
            map.setView([lat, lng]);
        }
    }, [lat, lng, map]);

    return null;
}
