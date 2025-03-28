import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MissionForm from './MissionForm';
import MissionList from './MissionList';
import MissionReport from './MissionReport';

function App() {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        const fetchMissions = async () => {
            const response = await axios.get('http://localhost:5000/missions');
            setMissions(response.data);
        };
        fetchMissions();
    }, []);

    const handleMissionAdded = (newMission) => {
        setMissions((prevMissions) => [...prevMissions, newMission]);
    };

    return (
        <div className='App'>
             <h1 className='text-center mt-6'>Drone Survey Management System</h1>
            <MissionForm onMissionAdded={handleMissionAdded} />
            <MissionList missions={missions} setMissions={setMissions} />
            <MissionReport missions={missions} />
        </div>
    );
}

export default App;
