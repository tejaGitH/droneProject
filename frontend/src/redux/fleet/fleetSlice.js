import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all drones
export const fetchDrones = createAsyncThunk('fleet/fetchDrones', async () => {
    const response = await axios.get('http://localhost:5000/api/drones');
    return response.data;
});

// Update drone status
export const updateDroneStatus = createAsyncThunk(
    'fleet/updateDroneStatus',
    async ({ droneId, status, coordinates, batteryLevel }) => {
        const response = await axios.patch(`http://localhost:5000/api/drones/${droneId}`, { status, coordinates, batteryLevel });
        return response.data;
    }
);

const fleetSlice = createSlice({
    name: 'fleet',
    initialState: {
        drones: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDrones.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDrones.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.drones = action.payload;
            })
            .addCase(fetchDrones.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateDroneStatus.fulfilled, (state, action) => {
                const updatedDrone = action.payload;
                const existingDrone = state.drones.find((drone) => drone.droneId === updatedDrone.droneId);
                if (existingDrone) {
                    Object.assign(existingDrone, updatedDrone);
                }
            });
    },
});

export default fleetSlice.reducer