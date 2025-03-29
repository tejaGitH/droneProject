// Updated MissionDetailsModal Component
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const MissionDetailsModal = ({ show, onClose, missionId }) => {
    const mission = useSelector((state) =>
        state.missions.missions.find((mission) => mission._id === missionId)
    );

    if (!mission) {
        return null;
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Mission Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Name:</strong> {mission.name}</p>
                <p><strong>Status:</strong> {mission.status || 'Pending'}</p>
                <p><strong>Assigned Drone:</strong> {mission.assignedDrone || 'N/A'}</p>
                <h3>Coordinates:</h3>
                <ul>
                    {mission.coordinates.map((coord, index) => (
                        <li key={index}>
                            Latitude: {coord.lat}, Longitude: {coord.lng}
                        </li>
                    ))}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MissionDetailsModal;
