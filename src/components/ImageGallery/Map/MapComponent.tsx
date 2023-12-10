import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

interface IPosition {
    latitude: number;
    longitude: number;
}

interface IMapProps {
    positions: IPosition[];
}

export const MapComponent = ({ positions }: IMapProps) => {
    if (positions.length === 0) {
        return null;
    }

    const center = [positions[0].latitude, positions[0].longitude];
    const polylinePositions = positions.map((pos) => [pos.latitude, pos.longitude]);

    return (
        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
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
    );
};



