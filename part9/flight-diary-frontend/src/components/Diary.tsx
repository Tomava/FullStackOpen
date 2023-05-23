import { DiaryEntry } from "../types";

export const Diary = (diary: DiaryEntry) => {
  return (
    <div>
      <h4>{diary.date}</h4>
      <p>
        visibility: {diary.visibility}<br />
        weather: {diary.weather}
      </p>
    </div>
  )
}