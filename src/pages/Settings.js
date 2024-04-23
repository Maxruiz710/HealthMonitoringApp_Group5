import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./Styles/Settings.css";

function Settings() {
    const navigate = useNavigate();

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
    <div className="settings-container">
        <div className="settings">
         <h1>Settings Page</h1>
            <button onClick={() => alert("Functionality to be implemented!")}>Button 1</button>
            <button onClick={() => alert("Functionality to be implemented!")}>Button 2</button>
            <button onClick={logout}>Log Out</button>
            <button onClick={() => navigate('/home')}>Back</button>
        </div>
    </div>

    );
}

export default Settings;