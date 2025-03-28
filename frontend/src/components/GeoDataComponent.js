// GeoDataComponent.js
import React, { useState, useEffect } from 'react';
import { fetchGeoData } from '../services/geoDataService';

const GeoDataComponent = () => {
    const [geoData, setGeoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchGeoData();
                setGeoData(data.features);
            } catch (err) {
                setError('Failed to fetch geospatial data.');
                console.error('Error fetching geospatial data:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <p>Loading geospatial data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Geospatial Data</h2>
            <ul>
                {geoData.map((feature, index) => (
                    <li key={index}>
                        {feature.properties.name || 'Unknown Location'} - Coordinates: {feature.geometry.coordinates.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GeoDataComponent;
