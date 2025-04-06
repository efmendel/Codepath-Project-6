import React from "react";
import { useState, useEffect } from "react";

function OnThisDayList({ datesData }) {
  const [featuredList, setFeaturedList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minEventYear, setMinEventYear] = useState(0); 



  const filteredList = featuredList.filter((item) => {
    const dateString = `${item.date?.month}/${item.date?.day}`;
    const passesSearch = dateString.includes(searchQuery);
    const passesYearFilter = item.event && parseInt(item.event.year) >= minEventYear;
    return passesSearch && passesYearFilter;
  });

  useEffect(() => {
    if (datesData.length === 0) return;

    const getRandomItem = (array) => {
      if (!array || array.length === 0) return null;
      return array[Math.floor(Math.random() * array.length)];
    };

    const list = datesData.map((dateData) => {
      const date = dateData.date;
      return {
        date: dateData.date,
        event: getRandomItem(dateData.data.Events),
        birth: getRandomItem(dateData.data.Births),
        death: getRandomItem(dateData.data.Deaths),
      };
    });

    setFeaturedList(list);
  }, [datesData]);

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by date (MM/DD)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <div className="slider-container">
          <label htmlFor="yearSlider">
            Min Event Year: {minEventYear}
          </label>
          <input
            id="yearSlider"
            type="range"
            min="0"
            max="2025"
            step="1"
            value={minEventYear}
            onChange={(e) => setMinEventYear(Number(e.target.value))}
            className="slider"
          />
        </div>
      </div>

      {" "}
      <table className="featured-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Birth</th>
            <th>Death</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((item, index) => (
            <tr key={index}>
              <td>{`${item.date.month}/${item.date.day}`}</td>
              <td>
                {item.event ? (
                  <>
                    <strong>{item.event.year}</strong>: {item.event.text}
                  </>
                ) : (
                  "—"
                )}
              </td>
              <td>
                {item.birth ? (
                  <>
                    <strong>{item.birth.year}</strong>: {item.birth.text}
                  </>
                ) : (
                  "—"
                )}
              </td>
              <td>
                {item.death ? (
                  <>
                    <strong>{item.death.year}</strong>: {item.death.text}
                  </>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OnThisDayList;
