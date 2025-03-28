const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//connect to MongoDB Atlas
mongoose.connect('mongodb+srv://navyateja:navyateja@droneproject.rnq5xfd.mongodb.net/?retryWrites=true&w=majority&appName=droneProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("Connected to MongoDB Atlas"))
.catch((err)=>console.log('Error connecting to MongoDB Atlas', err));


//Define the mission schema
const missionSchema = new mongoose.Schema({
    name: String,
    areaCoordinates: String,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

const Mission = mongoose.model('Mission', missionSchema);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

//in memory storage for missions
//let missions = [];

//End point to create a mission
app.post('/missions', async (req,res)=>{
    const {name, areaCoordinates} =req.body;

    //creating a new mission instance and save it to database
    const newMission = new Mission({name, areaCoordinates});

    try {
        await newMission.save(); //save to Mongodb
        res.status(201).send(newMission);
        console.log('New mission created:', newMission);
    } catch (error){
        res.status(400).send({error: 'Error creating mission'});
        console.error('Error creating mission:', error);
    }
})

//Endpont to get all missions
app.get('/missions', async (req,res)=>{
    try {
        const missions = await Mission.find();
        res.send(missions);
    } catch (error){
        res.status(500).send({error: 'Error fetching missions'});
        console.error('Error fetching missions:', error);
    }
});

app.patch('/missions/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedMission = await Mission.findByIdAndUpdate(id, { status }, { new: true });
        res.send(updatedMission);
    } catch (error) {
        res.status(400).send({ error: 'Error updating mission status' });
        console.error('Error updating mission status:', error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})