import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./Styles/Settings.css";

function Settings() {
    const navigate = useNavigate();
    const [unit, setUnit] = useState('km'); // Default to kilometers

    useEffect(() => {
        // Load the saved units preference from localStorage or default to 'km'
        const savedUnit = localStorage.getItem('unit') || 'km';
        setUnit(savedUnit);
    }, []);

    const toggleUnit = () => {
        const newUnit = unit === 'km' ? 'miles' : 'km';
        setUnit(newUnit);
        localStorage.setItem('unit', newUnit); // Save the new preference to localStorage
    };

    function logout() {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error signing out: ', error);
            });
    }

    return (
        <div className="settings-page">
            <div className="settings-container">
                <div className="settings">
                    <h1>Settings Page</h1>
                    <div className="unit-toggle">
                        <label>
                            {unit === 'km' ? 'Kilometers' : 'Miles'}
                        </label>
                        <button onClick={toggleUnit}>
                            Switch to {unit === 'km' ? 'Miles' : 'Kilometers'}
                        </button>
                    </div>
                    <button onClick={logout}>Log Out</button>
                    <button onClick={() => navigate('/home')}>Back</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
