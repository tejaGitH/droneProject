import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import { deleteMission, updateMissionStatus } from '../redux/missions/missionSlice';
import MissionDetailsModal from './MissionDetailsModal';

const MissionList = () => {
    const missions = useSelector((state) => state.missions.missions);
    const dispatch = useDispatch();
    const [selectedMissionId, setSelectedMissionId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (id) => {
        dispatch(deleteMission(id));
    };

    const handleStatusToggle = (id) => {
        dispatch(updateMissionStatus({ id }));
    };

    const handleViewDetails = (id) => {
        setSelectedMissionId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMissionId(null);
    };

    return (
        <div>
            <h2>Mission List</h2>
            <ListGroup>
                {missions.map((mission) => (
                    <ListGroup.Item key={mission._id} className="d-flex justify-content-between align-items-center">
                        <div onClick={() => handleViewDetails(mission._id)} style={{ cursor: 'pointer' }}>
                            {mission.name} - Status: {mission.status || 'Pending'}
                        </div>
                        <div>
                            <Button
                                variant={mission.status === 'Completed' ? 'warning' : 'success'}
                                className="ms-2"
                                onClick={() => handleStatusToggle(mission._id)}
                            >
                                {mission.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDelete(mission._id)}
                                className="ms-2"
                            >
                                Delete
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {selectedMissionId && (
                <MissionDetailsModal
                    show={showModal}
                    onClose={handleCloseModal}
                    missionId={selectedMissionId} // Passing the ID only
                />
            )}
        </div>
    );
};

export default MissionList;