import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMission } from '../redux/missions/missionSlice';

const MissionForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [coordinates, setCoordinates] = useState([{ lat: '', lng: '' }]);

    const handleAddCoordinate = () => {
        setCoordinates([...coordinates, { lat: '', lng: '' }]);
    };

    const handleCoordinateChange = (index, field, value) => {
        const updatedCoordinates = [...coordinates];
        updatedCoordinates[index][field] = value;
        setCoordinates(updatedCoordinates);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedCoordinates = coordinates.map(coord => ({
            lat: parseFloat(coord.lat),
            lng: parseFloat(coord.lng),
        }));
        const mission = {
            name,
            areaCoordinates: formattedCoordinates,
            status: 'Pending',
        };
        dispatch(addMission(mission));
        setName('');
        setCoordinates([{ lat: '', lng: '' }]);
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
            <h3>Coordinates</h3>
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
            <button type="button" onClick={handleAddCoordinate}>Add Coordinate</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default MissionForm;