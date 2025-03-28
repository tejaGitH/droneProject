import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch missions
export const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
    const response = await axios.get('http://localhost:5000/api/missions');
    return response.data;
});

// Async action to add a mission
export const addMission = createAsyncThunk('missions/addMission', async (missionData) => {
    const response = await axios.post('http://localhost:5000/api/missions', missionData);
    return response.data;
});


// Fetch a specific mission
export const fetchMissionById = createAsyncThunk('missions/fetchMissionById', async (id) => {
    const response = await axios.get(`http://localhost:5000/api/missions/${id}`);
    return response.data;
});

// Update mission status
export const updateMissionStatus = createAsyncThunk(
    'missions/updateMissionStatus',
    async ({ id }) => {
        const response = await axios.patch(`http://localhost:5000/api/missions/${id}`);
        return response.data;
    }
);

// Delete mission
export const deleteMission = createAsyncThunk('missions/deleteMission', async (id) => {
    await axios.delete(`http://localhost:5000/api/missions/${id}`);
    return id;
});
const missionSlice = createSlice({
    name: 'missions',
    initialState: {
        missions: [],
        loading: false,
        error: null,
        selectedMission: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMissions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMissions.fulfilled, (state, action) => {
                state.loading = false;
                state.missions = action.payload;
            })
            .addCase(fetchMissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addMission.fulfilled, (state, action) => {
                state.missions.push(action.payload);
            })
            .addCase(updateMissionStatus.fulfilled, (state, action) => {
                const index = state.missions.findIndex((mission) => mission._id === action.payload._id);
                if (index !== -1) {
                    state.missions[index] = action.payload;
                }
            })
            .addCase(deleteMission.fulfilled, (state, action) => {
                state.missions = state.missions.filter((mission) => mission._id !== action.payload);
            })
            .addCase(fetchMissionById.fulfilled, (state, action) => {
                state.selectedMission = action.payload;
            });
    },
});

export default missionSlice.reducer;