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
    <div className="setgoals-page">
      <div className="setgoals-container">
      <div className="setgoals">
      <h2><center>Set Goals</center></h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="stepsInput"><h3>Steps:</h3></label>
          <input
            type="number"
            id="stepsInput"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="caloriesToBurnInput"><h3>Calories to Burn:</h3></label>
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
      </div>
    </div>
  );
};

export default SetGoalsPage;
