import React from 'react';
import { ListGroup } from 'react-bootstrap';

const MissionList = ({ missions }) => {
    return (
        <div>
            <h2>Mission List</h2>
            <ListGroup>
                {missions.map((mission) => (
                    <ListGroup.Item key={mission.id}>
                        {mission.name} - Coordinates: {mission.areaCoordinates} - Status: {mission.status || 'Pending'}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default MissionList;
