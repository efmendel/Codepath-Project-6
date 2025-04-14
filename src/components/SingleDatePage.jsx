import { useParams } from "react-router";

function SingleDatePage({ datesData }) {
  const { month, day } = useParams();
  const dateData = datesData.find(
    (d) => d.date.month === parseInt(month) && d.date.day === parseInt(day)
  );

  const getRandom = (arr) => arr?.[Math.floor(Math.random() * arr.length)];

  return (
    <div className="single-date-container">
      <h2>
        📅 {month}/{day}
      </h2>

      <div className="single-summary">
        <h3>🎉 Event</h3>
        <p>
          {getRandom(dateData?.data?.Events)?.year}:{" "}
          {getRandom(dateData?.data?.Events)?.text}
        </p>

        <h3>🎂 Birth</h3>
        <p>
          {getRandom(dateData?.data?.Births)?.year}:{" "}
          {getRandom(dateData?.data?.Births)?.text}
        </p>

        <h3>💀 Death</h3>
        <p>
          {getRandom(dateData?.data?.Deaths)?.year}:{" "}
          {getRandom(dateData?.data?.Deaths)?.text}
        </p>
      </div>
    </div>
  );
}

export default SingleDatePage;