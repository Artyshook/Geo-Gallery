import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import {ImageData} from "../types";
import {useEffect, useState} from "react";

interface IPosition {
    latitude: number;
    longitude: number;
}

interface IMapProps {
    positions: IPosition[];
    visibleImages: ImageData[];
}

export const MapComponent = ({ positions, visibleImages }: IMapProps) => {
    const [mapCenter, setMapCenter] = useState<IPosition | null>();
    const [mapZoom, setMapZoom] = useState<number>(13); // Initial zoom level

    useEffect(() => {
        if (positions.length > 0) {
            console.log('positions:', positions);

            // Calculate bounds of the last positions
            const lastPosition = positions[positions.length - 1];
            const newCenter = { latitude: lastPosition.latitude, longitude: lastPosition.longitude };

            // Update the map's center and zoom level
            setMapCenter(newCenter);
            // You can set an appropriate zoom level here based on your requirements
            setMapZoom(10); // Adjust the zoom level as needed
        }
    }, [positions]);


    const center = mapCenter && [mapCenter.latitude, mapCenter.longitude]
    console.log(center)

    // if (positions.length === 0) {
    //     return null;
    // }
    //
    // useEffect(() => {
    //     if (visibleImages.length > 0) {
    //         // Get the coordinates of the first visible image
    //         const firstVisibleImage = visibleImages[0];
    //         const lastVisibleImage = visibleImages[visibleImages.length -1];
    //         console.log(lastVisibleImage)
    //         const latitude = firstVisibleImage.metadata?.latitude || 0;
    //         const longitude = lastVisibleImage.metadata?.longitude || 0;
    //
    //         // Update the map's center and zoom level to fit the visible image
    //         setMapCenter({ latitude, longitude });
    //     }
    // }, [visibleImages]);
    //
    // const center = [mapCenter?.latitude || 0, mapCenter?.longitude || 0];
    const polylinePositions = positions.map((pos) => [pos.latitude, pos.longitude]);
    console.log("positions", positions)
    // const center = [positions[0].latitude, positions[positions.length -1].longitude];
    // console.log(center)


    return (
        <>
            {mapCenter &&
                <MapContainer center={center} zoom={mapZoom} style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline positions={polylinePositions} color="blue" />
                    {positions.map((pos, index) => (
                        <Marker key={index} position={[pos.latitude, pos.longitude]}>
                            <Popup>
                                Latitude: {pos.latitude}, Longitude: {pos.longitude}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            }
        </>
    );
};



