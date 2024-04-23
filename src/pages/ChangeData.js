import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import firebaseConfig from "../backend/firebaseConfig";
import { initializeApp } from "firebase/app";
import { useNavigate, Link } from "react-router-dom";
import "./Styles/signin.css";

function ChangeData() {
//   const auth = getAuth();
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const userName = user.displayName;
//         setUserName(userName);
//       } else {
//         navigate('/login');
//       }
//     });

  //   return () => unsubscribe();
  // }, [auth, navigate]);

return (
        <div className="change-data">

        </div>
    );
};


export default Home;
