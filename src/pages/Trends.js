import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { getSleepLogbyDateRange } from '../fitbit/fitbitDataComponent';
import { useFitbitAuth } from '../fitbit/fitbitAuth'; // Import the useFitbitAuth hook
import './Styles/trends.css';

function Trends() {
    const accessToken = useFitbitAuth(); // Use the useFitbitAuth hook to get the access token
    const [sleepLogData, setSleepLogData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (accessToken) {
                try {
                    const data = await getSleepLogbyDateRange(accessToken, '2024-04-04', '2024-04-20');
                    setSleepLogData(data);
                } catch (error) {
                    console.error('Error fetching sleep log data:', error);
                }
            }
        };

        fetchData();
    }, [accessToken]);

    return (
        <div className="trends-container">
            <h1>Trends</h1>
            <div className="chart-container">
                <canvas id="sleepChart"></canvas>
            </div>
        </div>
    );
};

export default Trends;
