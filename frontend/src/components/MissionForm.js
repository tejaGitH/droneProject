import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMission } from '../redux/missions/missionSlice';
import { Form, Button } from 'react-bootstrap';

const MissionForm = () => {
    const [name, setName] = useState('');
    const [areaCoordinates, setAreaCoordinates] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const missionData = { name, areaCoordinates };
        dispatch(addMission(missionData));
        setName('');
        setAreaCoordinates('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Create Mission</h2>
            <Form.Group controlId="formMissionName">
                <Form.Label>Mission Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Mission Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formAreaCoordinates" className="mt-2">
                <Form.Label>Area Coordinates</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Area Coordinates"
                    value={areaCoordinates}
                    onChange={(e) => setAreaCoordinates(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Create Mission</Button>
        </Form>
    );
};

export default MissionForm;