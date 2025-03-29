import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMissions } from '../redux/missions/missionSlice';
import { Container, Button } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import L from 'leaflet';
import Check from './Check';

const MissionMonitor = () => {
    const [selectedMission, setSelectedMission] = useState(null);
    const dispatch = useDispatch();
    const missions = useSelector((state) => state.missions.missions);

    useEffect(() => {
        dispatch(fetchMissions());
    }, [dispatch]);

    const handleSelectMission = (mission) => {
        setSelectedMission(mission);
    };

    // Custom map marker using Leaflet's default icon
    const customMarker = new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    return (
        <Container className="mt-4">
            <h2>Mission Monitoring Interface</h2>
            <div className="mb-3">
                {missions.map((mission) => (
                    <Button
                        key={mission._id}
                        variant="outline-primary"
                        className="m-1"
                        onClick={() => handleSelectMission(mission)}
                    >
                        {mission.name}
                    </Button>
                ))}
            </div>

            {selectedMission && (
                <>
                    <Check mission={selectedMission} />
                    {selectedMission.coordinates && selectedMission.coordinates.length > 0 ? (
                        <MapContainer
                            center={[
                                selectedMission.coordinates[0].lat,
                                selectedMission.coordinates[0].lng,
                            ]}
                            zoom={13}
                            style={{ height: '400px', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; OpenStreetMap contributors'
                            />
                            {selectedMission.coordinates.map((coord, index) => (
                                <Marker
                                    key={index}
                                    position={[coord.lat, coord.lng]}
                                    icon={customMarker}
                                >
                                    <Popup>
                                        <strong>{selectedMission.name}</strong>
                                        <br />
                                        Status: {selectedMission.status}
                                        <br />
                                        Coordinate {index + 1}: ({coord.lat}, {coord.lng})
                                    </Popup>
                                </Marker>
                            ))}

                            {selectedMission.coordinates.length > 1 && (
                                <Polyline
                                    positions={selectedMission.coordinates.map(coord => [coord.lat, coord.lng])}
                                    color="blue"
                                />
                            )}
                        </MapContainer>
                    ) : (
                        <p>No location data available for this mission.</p>
                    )}
                </>
            )}
        </Container>
    );
};

export default MissionMonitor;