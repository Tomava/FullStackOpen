import { DiaryEntry } from "../types"
import { Diary } from "./Diary";

export const Diaries = ({ diaryEntries }: { diaryEntries: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaryEntries.length > 0 && diaryEntries.map((diary) => (
        <Diary key={diary.id} {...diary}></Diary>
      ))}
    </div>
  )
};