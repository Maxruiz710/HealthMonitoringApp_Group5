import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { useFitbitAuth } from '../fitbit/fitbitAuth';
import getSleepLogbyDateRange from '../fitbit/fitbitDataComponent';



function Trends() {

  useEffect(() => {

  getSleepLogbyDateRange('2024-04-04', '2024-04-20');
  
  console.log(getSleepLogbyDateRange('2024-04-04', '2024-04-20'));


  });


  return (
    <div>

    </div>
  );
};

export default Trends;