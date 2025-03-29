import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { fetchMissionById } from '../redux/missions/missionSlice';

const MissionDetailsModal = ({ show, onClose, missionId }) => {
    const dispatch = useDispatch();
    const mission = useSelector((state) =>
        state.missions.missions.find((mission) => mission._id === missionId)
    );

    useEffect(() => {
        if (!mission) {
            dispatch(fetchMissionById(missionId));
        }
    }, [dispatch, missionId, mission]);

    if (!mission) {
        return <div>Loading...</div>;
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Mission Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Name:</strong> {mission.name}</p>
                <p><strong>Status:</strong> {mission.status || 'Pending'}</p>
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