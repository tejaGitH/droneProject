import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMissionById } from '../redux/missions/missionSlice';
import { Button } from 'react-bootstrap';

const MissionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
            <Button variant="secondary" onClick={() => navigate('/')}>
                Back to Mission List
            </Button>
        </div>
    );
};

export default MissionDetails;