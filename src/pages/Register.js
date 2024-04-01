import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../backend/firebaseConfig";
import { initializeApp } from "firebase/app";
import { useNavigate, Link } from "react-router-dom";
import "./signin.css";

const Register = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            navigate('/home');
        }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const registerAccount = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in">
      <form onSubmit={registerAccount}>
        <h1>Create Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <br /> <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
};

export default Register;
