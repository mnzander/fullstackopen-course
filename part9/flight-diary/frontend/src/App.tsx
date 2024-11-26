import { useEffect, useState } from "react";
import { Diary, Visibility, Weather } from "./types";
import { createDiaryEntry, getAllDiary } from "./diaryService";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newVisibility, setNewVisibility] = useState("");
  const [newWeather, setNewWeather] = useState("");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getAllDiary().then((data) => {
      setDiaries(data);
    });
  }, []);

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!newDate || !newVisibility || !newWeather || !newComment) {
      alert("Please fill all the fields");
      return;
    }

    const newEntry = {
      date: newDate,
      visibility: newVisibility as Visibility,
      weather: newWeather as Weather,
      comment: newComment,
    };

    createDiaryEntry(newEntry).then((data) => {
      setDiaries(diaries.concat(data));
    });

    setNewDate("");
    setNewVisibility("");
    setNewWeather("");
    setNewComment("");
  };

  return (
    <>
      <div>
        <h1>Add new entry</h1>
        <form onSubmit={entryCreation}>
          <input
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
          <br />
          <br />
          <fieldset>
            <legend>Select the visibility</legend>
            <div>
              <input
                type="radio"
                id="great"
                name="visibility"
                value={Visibility.Great}
                onChange={(event) => setNewVisibility(event.target.value)}
              />
              <label htmlFor="great">Great</label>
            </div>
            <div>
              <input
                type="radio"
                id="good"
                name="visibility"
                value={Visibility.Good}
                onChange={(event) => setNewVisibility(event.target.value)}
              />
              <label htmlFor="good">Good</label>
            </div>
            <div>
              <input
                type="radio"
                id="ok"
                name="visibility"
                value={Visibility.Ok}
                onChange={(event) => setNewVisibility(event.target.value)}
              />
              <label htmlFor="ok">Ok</label>
            </div>
            <div>
              <input
                type="radio"
                id="poor"
                name="visibility"
                value={Visibility.Poor}
                onChange={(event) => setNewVisibility(event.target.value)}
              />
              <label htmlFor="poor">Poor</label>
            </div>
          </fieldset>
          <br />
          <fieldset>
            <legend>Select the weather</legend>
            <div>
              <input
                type="radio"
                id="sunny"
                name="weather"
                value={Weather.Sunny}
                onChange={(event) => setNewWeather(event.target.value)}
              />
              <label htmlFor="sunny">Sunny</label>
            </div>
            <div>
              <input
                type="radio"
                id="rainy"
                name="weather"
                value={Weather.Rainy}
                onChange={(event) => setNewWeather(event.target.value)}
              />
              <label htmlFor="rainy">Rainy</label>
            </div>
            <div>
              <input
                type="radio"
                id="cloudy"
                name="weather"
                value={Weather.Cloudy}
                onChange={(event) => setNewWeather(event.target.value)}
              />
              <label htmlFor="cloudy">Cloudy</label>
            </div>
            <div>
              <input
                type="radio"
                id="stormy"
                name="weather"
                value={Weather.Stormy}
                onChange={(event) => setNewWeather(event.target.value)}
              />
              <label htmlFor="stormy">Stormy</label>
            </div>
            <div>
              <input
                type="radio"
                id="windy"
                name="weather"
                value={Weather.Windy}
                onChange={(event) => setNewWeather(event.target.value)}
              />
              <label htmlFor="windy">Windy</label>
            </div>
          </fieldset>
          <br />
          Comment:
          <input
            type="text"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
          <br />
          <br />
          <button type="submit">add</button>
        </form>
      </div>
      <div>
        <h1>Diary Entries</h1>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h2>{diary.date}</h2>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
