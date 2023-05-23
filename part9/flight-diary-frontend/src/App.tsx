import { useEffect, useState } from 'react';
import './App.css';
import { Diaries } from './components/Diaries';
import { DiaryEntry } from './types';
import diaryService from "./services/diaries";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const handleBlogList = async () => {
    const entries: DiaryEntry[] = await diaryService.getAll();
    setDiaryEntries(entries);
  }

  useEffect(() => {
    handleBlogList();
  }, [])

  return (
    <div>
      <Diaries diaryEntries={diaryEntries}></Diaries>
    </div>
  );
}

export default App;
