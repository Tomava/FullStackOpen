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
    setEntryDate("");
    setEntryVisibility("");
    setEntryWeather("");
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
          type="text"
          value={entryDate}
          name="date"
          onChange={({ target }) => setEntryDate(target.value)}
          />
        </div>
        <div>
          visibility: {" "}
          <input
          id="entry-visibility"
          type="text"
          value={entryVisibility}
          name="visibility"
          onChange={({ target }) => setEntryVisibility(target.value)}
          />
        </div>
        <div>
          weather: {" "}
          <input
          id="entry-weather"
          type="text"
          value={entryWeather}
          name="weather"
          onChange={({ target }) => setEntryWeather(target.value)}
          />
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