import { useEffect, useState } from "react";
import "./App.css";
import SingleSummary from "./components/SingleSummary";
import OnThisDayList from "./components/OnThisDayList";

function App() {
  const [datesData, setdatesData] = useState([]);
  let dates = get11DateStrings();
  const [todayDateData, setTodayDateData] = useState({});
  const today = new Date();

  function get11DateStrings() {
    const today = new Date();
    const result = [];

    for (let offset = -5; offset <= 5; offset++) {
      const tempDate = new Date(today);
      tempDate.setDate(today.getDate() + offset);

      const month = tempDate.getMonth() + 1;
      const day = tempDate.getDate();

      result.push({ month, day });
    }

    return result;
  }

  const callAPI = async (queryList) => {
    try {
      const responses = queryList.map((query) =>
        fetch(query).then((response) => {
          return response.json();
        })
      );
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const summaryUrl = `https://history.muffinlabs.com/date/${month}/${day}`;
      const summaryResponse = await fetch(summaryUrl);
      const summaryData = await summaryResponse.json();
      setTodayDateData(summaryData);

      const results = await Promise.all(responses);
      const resultsWithDates = results.map((result, idx) => ({
        ...result,
        date: dates[idx], 
      }));
      setdatesData(resultsWithDates);
    } catch (error) {
      console.error("Error fetching date data:", error);
      alert("Oops! Something went wrong, please try again.");
    }
  };

  const makeQuery = async () => {
    const baseURL = "https://history.muffinlabs.com/date";
    const queryList = dates.map(
      (date) => `${baseURL}/${date.month}/${date.day}`
    );
    callAPI(queryList);
  };

  useEffect(() => {
    makeQuery();
  }, []);

  return (
    <div class="everything-container">
      <div class="nav-container">
        <h1>⌛ Recent Days in the Past</h1>
        <h1>🏠 Dashboard</h1>
        <h1>🔍 Search</h1>
        <h1>ℹ️ About</h1>
      </div>
      <div class="contents-container">
        <div class="full-summary-container">
          <div class="single-summary-container">
            {todayDateData?.data?.Births?.length > 0 && (
              <SingleSummary
                year={
                  todayDateData.data.Births[
                    todayDateData.data.Births.length - 1
                  ].year
                }
                text={
                  todayDateData.data.Births[
                    todayDateData.data.Births.length - 1
                  ].text
                }
                date={`${today.getMonth() + 1}/${today.getDate()}`}
                summaryStat="Celeb Births"
              />
            )}
          </div>
          <div class="single-summary-container">
            {todayDateData?.data?.Deaths?.length > 0 && (
              <SingleSummary
                year={
                  todayDateData.data.Deaths[
                    todayDateData.data.Deaths.length - 1
                  ].year
                }
                text={
                  todayDateData.data.Deaths[
                    todayDateData.data.Deaths.length - 1
                  ].text
                }
                date={`${today.getMonth() + 1}/${today.getDate()}`}
                summaryStat="Celeb Deaths"
              />
            )}
          </div>
          <div class="single-summary-container">
            {todayDateData?.data?.Events?.length > 0 && (
              <SingleSummary
                year={
                  todayDateData.data.Events[
                    todayDateData.data.Events.length - 1
                  ].year
                }
                text={
                  todayDateData.data.Events[
                    todayDateData.data.Events.length - 1
                  ].text
                }
                date={`${today.getMonth() + 1}/${today.getDate()}`}
                summaryStat="Events"
              />
            )}
          </div>
        </div>

        <div class="table-container">
          <OnThisDayList datesData={datesData}></OnThisDayList>
        </div>
      </div>
    </div>
  );
}

export default App;
