import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import {ImageData} from "../types";
import {useEffect, useState} from "react";
import {RecenterAutomatically} from "../utils/RecenterAutomatically";
import {useMapCenter} from "../utils/useMapCenter";

interface IPosition {
    latitude: number;
    longitude: number;
    src: string
}

interface IMapProps {
    positions: IPosition[];
    activeImages: ImageData[];
    onMarkerClick: (index: any) => void;
}

export const MapComponent = ({ positions, activeImages, onMarkerClick }: IMapProps) => {
    const mapCenter = useMapCenter(activeImages);
    const center = mapCenter && [mapCenter.latitude, mapCenter.longitude]
    const polylinePositions = positions.map((pos) => [pos.latitude, pos.longitude]);

    return (
        <>
            {mapCenter &&
                <MapContainer center={center}
                              zoom={10}
                              style={{ height: '100%', width: '100%', overflowY: 'auto'}}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline positions={polylinePositions} color="blue" />
                    {positions.map((pos, index) => (
                        <Marker
                            key={index}
                            position={[pos.latitude, pos.longitude]}
                            eventHandlers={{
                                click: () => onMarkerClick(pos.src), // Call onMarkerClick function with marker index
                            }}
                        >
                            <Popup>
                                Latitude: {pos.latitude}, Longitude: {pos.longitude}
                            </Popup>
                        </Marker>
                    ))}
                    <RecenterAutomatically lat={mapCenter.latitude} lng={mapCenter.longitude} />
                </MapContainer>
            }
        </>
    );
};



