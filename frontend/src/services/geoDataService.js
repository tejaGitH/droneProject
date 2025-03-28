// geoDataService.js
import axios from 'axios';

export const fetchGeoData = async () => {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching geospatial data:', error);
        throw error;
    }
};
