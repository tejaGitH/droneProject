import React from 'react';
import { useSelector } from 'react-redux';

const MissionReport = () => {
    const missions = useSelector((state) => state.missions.missions);
    const totalMissions = missions.length;
    const completedMissions = missions.filter((mission) => mission.status === 'Completed').length;

    return (
        <div>
            <h2>Mission Report</h2>
            <p>Total Missions: {totalMissions}</p>
            <p>Completed Missions: {completedMissions}</p>
        </div>
    );
};

export default MissionReport;