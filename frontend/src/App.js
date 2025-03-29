// Updated App Component
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { fetchMissions } from './redux/missions/missionSlice';
import MissionForm from './components/MissionForm';
import MissionList from './components/MissionList';
import MissionReport from './components/MissionReport';
import MissionMap from './components/MissionMap';
import FleetDashboard from './components/FleetDashboard';
import MissionMonitor from './components/MissionMonitor';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMissions());
    }, [dispatch]);

    return (
        <Router>
            <div className="App">
                <h1 className="text-center mt-4">Drone Survey Management System</h1>
                <nav className="mb-4 text-center">
                    <Link to="/" className="mx-2">Home</Link>
                    <Link to="/missions" className="mx-2">Mission List</Link>
                    <Link to="/report" className="mx-2">Mission Report</Link>
                    <Link to="/map" className="mx-2">Mission Map</Link>
                    <Link to="/fleet" className="mx-2">Fleet Management</Link>
                    <Link to="/monitor" className="mx-2">Mission Monitor</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<MissionForm />} />
                    <Route path="/missions" element={<MissionList />} />
                    <Route path="/monitor" element={<MissionMonitor />} />
                    <Route path="/report" element={<MissionReport />} />
                    <Route path="/map" element={<MissionMap />} />
                    <Route path="/fleet" element={<FleetDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
