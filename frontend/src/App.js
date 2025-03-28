import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMissions } from './redux/missions/missionSlice';
import MissionForm from './components/MissionForm';
import MissionList from './components/MissionList';
import MissionReport from './components/MissionReport';
import MissionDetails from './components/MissionDetails';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMissions());
    }, [dispatch]);

    return (
        <div className="App">
            <h1 className="text-center mt-4">Drone Survey Management System</h1>
            <MissionForm />
            <MissionList />
            <MissionReport />
        </div>
    );
}

export default App;