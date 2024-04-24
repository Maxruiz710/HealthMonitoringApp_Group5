import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/signin.css";

function EnterData() {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [dataType, setDataType] = useState('');
  const [dataValue, setDataValue] = useState('');

  const handleSave = async () => {
    try {
      // Ensure user is signed in
      if (!auth.currentUser) {
        console.error("No user is signed in.");
        return;
      }

      // Get the signed-in user's UID
      const userUID = auth.currentUser.uid;

      // Determine the collection based on the selected dataType
      let collectionName;
      if (dataType === "heartRate") {
        collectionName = "heart-rate-data";
      } else if (dataType === "steps") {
        collectionName = "steps-data";
      } else if (dataType === "calories") {
        collectionName = "calories-data";
      }

      // Get a reference to the signed-in user's collection
      const userCollectionRef = collection(db, "users", userUID, collectionName);

      // Create a new document in the signed-in user's collection
      const docRef = await addDoc(userCollectionRef, {
        dateTime: date,
        value: parseFloat(dataValue) // Convert dataValue to a number if needed
      });

      console.log("Document written with ID: ", docRef.id);
      navigate('/home'); // Navigate to the home page after saving data
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="enter-data">
      <h1>Enter Data</h1>
      <div className="input-container">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Data Type:</label>
        <select
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
        >
          <option value="">Select data type</option>
          <option value="heartRate">Heart Rate</option>
          <option value="steps">Steps</option>
          <option value="calories">Calories</option>
          {/* Add more options for different types of data */}
        </select>
      </div>
      <div className="input-container">
        <label>Data Value:</label>
        <input
          type="text"
          value={dataValue}
          onChange={(e) => setDataValue(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save Data</button>
    </div>
  );
}

export default EnterData;
