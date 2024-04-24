/*  ------------------------------ API Calls ------------------------------  */

const FitbitDataComponent = ({ accessToken }) => {
    const APIRequest = async (endpoint, requestHeaders) => {
      const response = await fetch(endpoint, requestHeaders);
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error('Error fetching Fitbit data');
      }
    };
  
    const getProfile = async () => {
      const profileEndpoint = 'https://api.fitbit.com/1/user/-/profile.json';
      const profileHeaders = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      };
  
      return await APIRequest(profileEndpoint, profileHeaders);
    };
  
    const getUID = async () => {
      try {
        const profileData = await getProfile();
        const fitbitUserID = profileData.user?.encodedId;
  
        if (fitbitUserID) {
          console.log('Fitbit User ID:', fitbitUserID);
          return fitbitUserID;
        } else {
          console.error('Fitbit User ID not found in profile data.');
          return null;
        }
      } catch (error) {
        console.error("Error fetching Fitbit profile data: ", error);
        return null;
      }
    };
  
    const getSleepLogbyDateRange = async (start, end) => {
      const SleepSeriesEndpoint = `https://api.fitbit.com/1.2/user/-/sleep/date/${start}/${end}.json`;
      const SleepSeriesHeaders = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      };
  
      return await APIRequest(SleepSeriesEndpoint, SleepSeriesHeaders);
    };


    const getTemp = async (start, end) => {
      const TempSeriesEndpoint = `https://api.fitbit.com/1/user/-/temp/core/date/${start}/${end}.json`;
      const  TempSeriesHeaders = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      };
  
      return await APIRequest( TempSeriesEndpoint,  TempSeriesHeaders);
    };
  
    return {
      getProfile,
      getUID,
      getSleepLogbyDateRange,
      getTemp,
    };
  };
  
  export default FitbitDataComponent;
