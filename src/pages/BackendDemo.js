import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import dbHandler from '../backend/dbHandler';
import FitbitDataComponent from '../fitbit/fitbitDataComponent';
import { useFitbitAuth } from '../fitbit/fitbitAuth';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

function BackendDemo() {
    const [fitbitUID, setFitbitUID] = useState("");
    const [firebaseUID, setFirebaseUID] = useState("");
    const [allData, setAllData] = useState("");
    const [UIDData, setUIDData] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [arg1, setArg1] = useState('');
    const [arg2, setArg2] = useState('');
    const [durationsInHours, setDurationsInHours] = useState([]);
    const [temperature, setTemperature] = useState([]);

    // instance of dbHandler for the collections "users"
    const { getAllData, getDataByDocID, addData } = dbHandler({ collectionName: "users/" });

    // Use the useFitbitAuth hook to get the access token
    const accessToken = useFitbitAuth();

    useEffect(() => {
        // Check if accessToken is available and fetch user data only if it's available
        if (accessToken) {
            const fetchData = async () => {
                const { getProfile, getUID, getSleepLogbyDateRange, getTemp } = FitbitDataComponent({ accessToken });
    
                try {
                    const auth = getAuth();
                    onAuthStateChanged(auth, async (user) => {
                        if (user) {
                            // set states with Firebase user email and UID
                            setUserEmail(user.email);
                            setFirebaseUID(user.uid);
    
                            // set FitBit UID state
                            const FBUID = await getUID();
                            setFitbitUID(FBUID);
    
                            const sampleData = {
                                heartrate: 123,
                                test: "test string",
                            };

                            // set doc ID with Fitbit UID to getProfile and sampleData
                            await addData(FBUID, await getProfile());
                            await addData(FBUID, sampleData);
                            
                            // set doc ID with Firebase UID to getProfile
                            await addData(user.uid, await getProfile());

                            const Temp = await getTemp('2024-04-04', '2024-04-20');
                            const temperature = Temp.tempCore.map(entry => entry.value);
                            console.log(Temp)
                            setTemperature(temperature);

                            // Fetch sleep log data
                            const sleeplog = await getSleepLogbyDateRange('2024-04-04', '2024-04-20');
                            const durations = sleeplog.sleep.map(entry => entry.duration);
                            const durationsInHours = durations.map(duration => (duration / 3600000).toFixed(2));
                            setDurationsInHours(durationsInHours);

                            // Fetch temperature values
                            
    
                            getDataByDocID(user.uid).then((data) => {
                                console.log('Data by UID:', data);
                                setUIDData(data);
                            });
    
                            getAllData().then((data) => {
                                console.log('All data from collection:', data);
                                setAllData(data);
                            });
                        }
                    });
    
                } catch (error) {
                    console.error('Error in fetching data:', error);
                }
            };
    
            fetchData();
        }
    }, [accessToken]);
    
    
    // submit button for write data fields
    const handleSubmit = (e) => {
        e.preventDefault();
        addData(firebaseUID, { [arg1]: arg2 })
            .then(() => {
                getAllData().then((data) => setAllData(data));
                getDataByDocID(firebaseUID).then((data) => setUIDData(data));
            })
            .catch((error) => {
                console.error('Error adding data:', error);
            });
    }

    // Create a line chart for duration
    useEffect(() => {
        if (durationsInHours.length > 0) {
            const ctx = document.getElementById('durationChart');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: durationsInHours.map((_, index) => index + 1),
                    datasets: [{
                        label: 'Duration (Hours)',
                        data: durationsInHours,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [durationsInHours]);

    // Create a line chart for temperature
    useEffect(() => {
        if (temperature.length > 0) {
            const ctx = document.getElementById('temperatureChart');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: temperature.map((_, index) => index + 1),
                    datasets: [{
                        label: 'Temperature',
                        data: temperature,
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [temperature]);

    return (
        <div>
            <h1>Backend Demo</h1>
            <p><b>Firebase Auth UID: </b> {firebaseUID}</p>
            <p><b>FitBit UID: </b> {fitbitUID}</p>
            <p><b>User Email: </b> {userEmail}</p>
            <p><Link to="/login">Log in</Link> <Link to="/register">Register</Link></p>
            <div>
                <canvas id="durationChart"></canvas>
            </div>
            <div>
                <canvas id="temperatureChart"></canvas>
            </div>
        </div>
    );
}

export default BackendDemo;
