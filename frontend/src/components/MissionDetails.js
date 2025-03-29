import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMissionById } from '../redux/missions/missionSlice';

const MissionDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const mission = useSelector((state) => 
        state.missions.missions.find((mission) => mission._id === id)
    );

    useEffect(() => {
        if (!mission) {
            dispatch(fetchMissionById(id));
        }
    }, [dispatch, id, mission]);

    if (!mission) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Mission Details</h2>
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
        </div>
    );
};

export default MissionDetails;