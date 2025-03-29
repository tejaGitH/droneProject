import React, { useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDrones } from '../redux/fleet/fleetSlice';

const FleetDashboard = () => {
    const dispatch = useDispatch();
    const { drones, status, error } = useSelector((state) => state.fleet);

    useEffect(() => {
        dispatch(fetchDrones());
    }, [dispatch]);

    return (
        <Container className="mt-4">
            <h2>Fleet Management Dashboard</h2>
            {status === 'loading' && <p>Loading drones...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Drone ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Battery Level</th>
                        <th>Last Update</th>
                    </tr>
                </thead>
                <tbody>
                    {drones.map((drone) => (
                        <tr key={drone.droneId}>
                            <td>{drone.droneId}</td>
                            <td>{drone.name}</td>
                            <td>{drone.status}</td>
                            <td>{drone.batteryLevel}%</td>
                            <td>{new Date(drone.lastUpdate).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default FleetDashboard;