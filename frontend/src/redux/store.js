import { configureStore } from '@reduxjs/toolkit';
import missionReducer from './missions/missionSlice';
import fleetReducer from './fleet/fleetSlice';

const store = configureStore({
    reducer: {
        missions: missionReducer,
        fleet: fleetReducer,
    },
});

export default store;