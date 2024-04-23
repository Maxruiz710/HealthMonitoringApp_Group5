import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
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
        <div className="edit-profile">
            <h1>Edit Profile</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <button type="submit">Save Changes</button>
            </form>
            <button onClick={logout}>Log Out</button>
        </div>
    );
}

export default EditProfile;
