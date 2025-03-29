import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
                {mapData && mapData.flatMap((mission) => (
                    mission.coordinates.map((coord, index) => (
                        <Marker key={`${mission._id}-${index}`} position={[coord.lat, coord.lng]}>
                            <Popup>{`${mission.name} - (${coord.lat}, ${coord.lng})`}</Popup>
                        </Marker>
                    ))
                ))}
            </MapContainer>
        </div>
    );
};

export default MissionMap;
