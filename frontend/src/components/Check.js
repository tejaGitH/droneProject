import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';

const Check = ({ mission }) => {
    if (!mission) {
        return <p>No mission selected</p>;
    }

    return (
        <Container className="mt-4">
            <h3>Mission Check</h3>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Mission ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Start Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{mission._id}</td>
                        <td>{mission.name}</td>
                        <td>{mission.status}</td>
                        <td>{new Date(mission.startTime).toLocaleString()}</td>
                        <td>
                            <Button variant="primary" size="sm">View</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default Check;