import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMission } from '../redux/missions/missionSlice';
import { fetchAvailableDrones, updateDroneStatus } from '../redux/fleet/fleetSlice';

const MissionForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [coordinates, setCoordinates] = useState([{ lat: '', lng: '' }]);
    const [selectedDrone, setSelectedDrone] = useState('');

    const drones = useSelector((state) => state.fleet.drones);

    useEffect(() => {
        dispatch(fetchAvailableDrones());
    }, [dispatch]);

    const handleAddCoordinate = () => {
        setCoordinates([...coordinates, { lat: '', lng: '' }]);
    };

    const handleCoordinateChange = (index, field, value) => {
        const updatedCoordinates = [...coordinates];
        updatedCoordinates[index][field] = parseFloat(value);
        setCoordinates(updatedCoordinates);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mission = { name, coordinates, droneId: selectedDrone };

        // Add the mission
        await dispatch(addMission(mission));

        // Update drone status to "In Mission"
        await dispatch(updateDroneStatus({ droneId: selectedDrone, status: 'In Mission' }));

        // Re-fetch available drones to reflect the updated status
        dispatch(fetchAvailableDrones());

        setName('');
        setCoordinates([{ lat: '', lng: '' }]);
        setSelectedDrone('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Mission</h2>
            <input
                type="text"
                placeholder="Mission Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            {coordinates.map((coord, index) => (
                <div key={index}>
                    <input
                        type="number"
                        placeholder="Latitude"
                        value={coord.lat}
                        onChange={(e) => handleCoordinateChange(index, 'lat', e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Longitude"
                        value={coord.lng}
                        onChange={(e) => handleCoordinateChange(index, 'lng', e.target.value)}
                        required
                    />
                </div>
            ))}
            <select value={selectedDrone} onChange={(e) => setSelectedDrone(e.target.value)} required>
                <option value="">Select Drone</option>
                {drones.map((drone) => (
                    <option key={drone.droneId} value={drone.droneId}>{drone.name}</option>
                ))}
            </select>
            <button type="button" onClick={handleAddCoordinate}>Add Coordinate</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default MissionForm;