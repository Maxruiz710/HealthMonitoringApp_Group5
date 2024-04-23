import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./Styles/EditProfile.css";

function EditProfile() {
    const auth = getAuth();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSave = () => {
        updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`,
            email: email
        }).then(() => {
            navigate('/home'); // Navigate to the home page after profile update
        }).catch((error) => {
            console.error('Error updating profile: ', error);
        });
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
            <div className="input-container">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button onClick={handleSave}>Save Changes</button>
        </div>
    );
}

export default EditProfile;
