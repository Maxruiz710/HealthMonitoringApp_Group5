import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./Styles/Home.css";

function Home() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userName = user.displayName;
        setUserName(userName);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard, {userName ? userName : 'User'}!</h1>
      <div className="button-container">
       <button onClick={() => navigate('/editprofile')}>Edit Profile</button>
        <button>Enter Data</button>
        <button>Trend Analysis</button>
        <button>Change Data</button>
        <button onClick={() => navigate('/Settings')}>Settings</button>
        <button>Set Goals</button>
      </div>
    </div>
  );
}

export default Home;