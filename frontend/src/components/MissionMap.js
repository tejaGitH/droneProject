import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';

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
                {mapData && mapData.map((mission) => {
                    const coordinates = mission.areaCoordinates;

                    if (Array.isArray(coordinates) && coordinates.every(coord => typeof coord.lat === 'number' && typeof coord.lng === 'number')) {
                        const positions = coordinates.map((coord) => [coord.lat, coord.lng]);

                        return (
                            <React.Fragment key={mission._id}>
                                <Polyline positions={positions} color="blue" />
                                {positions.map((pos, index) => (
                                    <Marker position={pos} key={`${mission._id}-${index}`}>
                                        <Popup>
                                            {`${mission.name} - Point ${index + 1} (${pos[0]}, ${pos[1]})`}
                                        </Popup>
                                    </Marker>
                                ))}
                            </React.Fragment>
                        );
                    } else {
                        console.error("Invalid coordinates format for mission:", mission.name, coordinates);
                    }
                    return null;
                })}
            </MapContainer>
        </div>
    );
};

export default MissionMap;