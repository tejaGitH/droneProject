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
export const fetchAvailableDrones = createAsyncThunk(
    'fleet/fetchAvailableDrones',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:5000/api/available');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
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
            })
            .addCase(fetchAvailableDrones.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAvailableDrones.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.drones = action.payload;
            })
            .addCase(fetchAvailableDrones.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default fleetSlice.reducer