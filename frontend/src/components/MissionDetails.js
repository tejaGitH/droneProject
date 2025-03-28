import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMissionById } from '../redux/missions/missionSlice';

const MissionDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const mission = useSelector((state) => state.missions.selectedMission);

    useEffect(() => {
        dispatch(fetchMissionById(id));
    }, [dispatch, id]);

    if (!mission) return <p>Loading...</p>;

    return (
        <div>
            <h2>Mission Details</h2>
            <p>Name: {mission.name}</p>
            <p>Coordinates: {mission.areaCoordinates}</p>
            <p>Status: {mission.status}</p>
            <p>Created At: {new Date(mission.createdAt).toLocaleString()}</p>
        </div>
    );
};

export default MissionDetails;