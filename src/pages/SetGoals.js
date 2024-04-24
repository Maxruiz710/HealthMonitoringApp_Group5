import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Styles/SetGoals.css";

const SetGoalsPage = () => {
  const [steps, setSteps] = useState('');
  const [caloriesToBurn, setCaloriesToBurn] = useState('');
  const [goalList, setGoalList] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = { steps, caloriesToBurn };
    setGoalList([...goalList, newGoal]);
    setSteps('');
    setCaloriesToBurn('');
  };

  return (
    <div>
      <h2>Set Goals</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="stepsInput">Steps:</label>
          <input
            type="number"
            id="stepsInput"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="caloriesToBurnInput">Calories to Burn:</label>
          <input
            type="number"
            id="caloriesToBurnInput"
            value={caloriesToBurn}
            onChange={(e) => setCaloriesToBurn(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Goals:</h3>
        <ul>
          {goalList.map((goal, index) => (
            <li key={index}>{`Steps: ${goal.steps}, Calories to Burn: ${goal.caloriesToBurn}`}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => navigate('/home')}>Back</button>
    </div>
  );
};

export default SetGoalsPage;
