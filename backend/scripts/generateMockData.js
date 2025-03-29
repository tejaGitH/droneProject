const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Drone = require("../models/Drone");

dotenv.config();
connectDB(); // Reusing the existing connection logic

// Generate random coordinates within a reasonable range
function getRandomCoordinates() {
    return {
        lat: parseFloat((Math.random() * 180 - 90).toFixed(6)),  // Latitude between -90 and 90
        lng: parseFloat((Math.random() * 360 - 180).toFixed(6)), // Longitude between -180 and 180
    };
}

// Generate random battery level between 0 and 100
function getRandomBatteryLevel() {
    return Math.floor(Math.random() * 101);
}

// Generate random drone status
function getRandomStatus() {
    const statuses = ["Available", "In Mission", "Maintenance"];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

// Create mock drones
async function generateMockDrones() {
    try {
        const droneCount = 20;  // Number of mock drones to generate

        const drones = Array.from({ length: droneCount }, (_, index) => ({
            droneId: `DRONE_${index + 1}`,
            name: `Drone ${index + 1}`,
            status: getRandomStatus(),
            coordinates: getRandomCoordinates(),
            batteryLevel: getRandomBatteryLevel(),
        }));

        await Drone.insertMany(drones);
        console.log(`${droneCount} mock drones created successfully!`);
        process.exit(0);  // Exit the script after successful creation
    } catch (error) {
        console.error("Error generating mock drones:", error);
        process.exit(1);  // Exit with error
    }
}

generateMockDrones();