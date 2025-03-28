import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        <Router>
            <div className="App">
                <h1 className="text-center mt-4">Drone Survey Management System</h1>
                <MissionForm />
                <Routes>
                    <Route path="/" element={<MissionList />} />
                    <Route path="/missions/:id" element={<MissionDetails />} />
                </Routes>
                <MissionReport />
            </div>
        </Router>
    );
}

export default App;