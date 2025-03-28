import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const MissionForm = ({ onMissionAdded }) => {
    const [name, setName] = useState('');
    const [areaCoordinates, setAreaCoordinates] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/missions', {
            name,
            areaCoordinates,
        });
        onMissionAdded(response.data);
        setName('');
        setAreaCoordinates('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Create Mission</h2>
            <Form.Group controlId="formMissionName">
                <Form.Label>Mission Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Mission Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formAreaCoordinates">
                <Form.Label>Area Coordinates</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Area Coordinates'
                    value={areaCoordinates}
                    onChange={(e) => setAreaCoordinates(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type='submit'>Create Mission</Button>
        </Form>
    );
};

export default MissionForm;
