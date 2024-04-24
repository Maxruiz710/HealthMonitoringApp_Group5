import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./Styles/EditProfile.css";

function EditProfile() {
    const auth = getAuth();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        // Initialize state with current user's information
        if (auth.currentUser) {
            const names = auth.currentUser.displayName ? auth.currentUser.displayName.split(" ") : ["", ""];
            setFirstName(names[0]);
            setLastName(names.length > 1 ? names[1] : '');
        }
    }, [auth]);

    const handleSave = () => {
        const user = auth.currentUser;
        if (user) {
            updateProfile(user, {
                displayName: `${firstName} ${lastName}`
            }).then(() => {
                navigate('/home'); // Navigate to the home page after profile update
            }).catch((error) => {
                console.error('Error updating profile: ', error);
            });
        } else {
            console.error('No user is logged in.');
        }
    };

    return (
        <div className="edit-profile-container">
            <h1>Edit Profile</h1>
            <div className="input-container">
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <button onClick={handleSave}>Save Changes</button>
        </div>
    );
}

export default EditProfile;
