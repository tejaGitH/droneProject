import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import { deleteMission, updateMissionStatus } from '../redux/missions/missionSlice';

const MissionList = () => {
    const missions = useSelector((state) => state.missions.missions);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteMission(id));
    };

    const handleStatusToggle = (id) => {
        dispatch(updateMissionStatus({ id }));
    };

    return (
        <div>
            <h2>Mission List</h2>
            <ListGroup>
                {missions.map((mission) => (
                    <ListGroup.Item key={mission._id}>
                        {mission.name} - Status: {mission.status || 'Pending'}
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
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default MissionList;
