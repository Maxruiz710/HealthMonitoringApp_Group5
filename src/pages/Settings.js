import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
//import "./settings.css";

function logout() {
    sessionStorage.clear();

  }

function settings({ onLogout }) {
    return (
        <div className="settings">
            <h1>Settings Page</h1>
            <button onClick={() => alert("Functionality to be implemented!")}>Button 1</button>
            <button onClick={() => alert("Functionality to be implemented!")}>Button 2</button>
            <button onClick={() => logout()}>Log Out</button>
        </div>
    );
}

export default settings;