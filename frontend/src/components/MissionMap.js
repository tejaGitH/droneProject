import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useSelector } from 'react-redux';
import L from 'leaflet';

const colors = ['red', 'blue', 'green', 'orange', 'purple', 'pink', 'cyan'];

const getColor = (index) => colors[index % colors.length];

const createCustomIcon = (color) => {
    return L.divIcon({
        html: `<i class="fas fa-map-marker-alt" style="color: ${color}; font-size: 24px;"></i>`,
        iconSize: [24, 24],
        className: 'custom-marker',
    });
};

const MissionMap = () => {
    const missions = useSelector((state) => state.missions.missions);
    const [mapData, setMapData] = useState([]);

    useEffect(() => {
        if (missions && Array.isArray(missions)) {
            setMapData(missions);
        }
    }, [missions]);

    return (
        <div style={{ height: '400px', width: '100%', margin: '20px 0' }}>
            <h2>Mission Map</h2>
            <MapContainer center={[51.505, -0.09]} zoom={5} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                {mapData && mapData.map((mission, missionIndex) => {
                    const color = getColor(missionIndex);

                    // Extracting coordinates
                    const coordinates = mission.coordinates.map((coord) => [coord.lat, coord.lng]);

                    return (
                        <React.Fragment key={mission._id}>
                            {coordinates.length > 1 && (
                                <Polyline
                                    pathOptions={{ color: color, weight: 4 }}
                                    positions={coordinates}
                                />
                            )}
                            {coordinates.map((position, index) => (
                                <Marker
                                    key={`${mission._id}-${index}`}
                                    position={position}
                                    icon={createCustomIcon(color)}
                                >
                                    <Popup>
                                        <strong>{mission.name}</strong><br />
                                        Latitude: {position[0]}<br />
                                        Longitude: {position[1]}
                                    </Popup>
                                </Marker>
                            ))}
                        </React.Fragment>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default MissionMap;