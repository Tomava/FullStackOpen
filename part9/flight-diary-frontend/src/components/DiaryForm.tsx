import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

export const DiaryForm = ({ handleEntryCreation }: { handleEntryCreation: (newEntry: NewDiaryEntry) => Promise<void>; }) => {
  const [entryDate, setEntryDate] = useState("");
  const [entryVisibility, setEntryVisibility] = useState("");
  const [entryWeather, setEntryWeather] = useState("");
  const [entryComment, setEntryComment] = useState("");

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry: NewDiaryEntry = {
      date: entryDate,
      visibility: entryVisibility as Visibility,
      weather: entryWeather as Weather,
      comment: entryComment
    }
    setEntryComment("");
    handleEntryCreation(newEntry);
  }
  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={addEntry}>
        <div>
          date: {" "}
          <input
          id="entry-date"
          type="date"
          value={entryDate}
          name="date"
          onChange={({ target }) => setEntryDate(target.value)}
          />
        </div>
        <div>
          visibility: {" "}
          <input
          id="entry-visibility-great"
          type="radio"
          value={entryVisibility}
          name="visibility"
          onChange={() => setEntryVisibility("great")}
          />
          <label htmlFor="entry-visibility-great"> great</label>
          <input
          id="entry-visibility-good"
          type="radio"
          value={entryVisibility}
          name="visibility"
          onChange={() => setEntryVisibility("good")}
          />
          <label htmlFor="entry-visibility-good"> good</label>
          <input
          id="entry-visibility-ok"
          type="radio"
          value={entryVisibility}
          name="visibility"
          onChange={() => setEntryVisibility("ok")}
          />
          <label htmlFor="entry-visibility-ok"> ok</label>
          <input
          id="entry-visibility-poor"
          type="radio"
          value={entryVisibility}
          name="visibility"
          onChange={() => setEntryVisibility("poor")}
          />
          <label htmlFor="entry-visibility-poor"> poor</label>
        </div>
        <div>
          weather: {" "}
          <input
          id="entry-weather-sunny"
          type="radio"
          value={entryWeather}
          name="weather"
          onChange={() => setEntryWeather("sunny")}
          />
          <label htmlFor="entry-visibility-sunny"> sunny</label>
          <input
          id="entry-weather-rainy"
          type="radio"
          value={entryWeather}
          name="weather"
          onChange={() => setEntryWeather("rainy")}
          />
          <label htmlFor="entry-visibility-rainy"> rainy</label>
          <input
          id="entry-weather-cloud"
          type="radio"
          value={entryWeather}
          name="weather"
          onChange={() => setEntryWeather("cloud")}
          />
          <label htmlFor="entry-visibility-cloud"> cloud</label>
          <input
          id="entry-weather-stormy"
          type="radio"
          value={entryWeather}
          name="weather"
          onChange={() => setEntryWeather("stormy")}
          />
          <label htmlFor="entry-visibility-stormy"> stormy</label>
          <input
          id="entry-weather-windy"
          type="radio"
          value={entryWeather}
          name="weather"
          onChange={() => setEntryWeather("windy")}
          />
          <label htmlFor="entry-visibility-windy"> windy</label>
        </div>
        <div>
          comment: {" "}
          <input
          id="entry-comment"
          type="text"
          value={entryComment}
          name="comment"
          onChange={({ target }) => setEntryComment(target.value)}
          />
        </div>
        <button id="submit-button" type="submit">create</button>
      </form>
    </div>
  )
}