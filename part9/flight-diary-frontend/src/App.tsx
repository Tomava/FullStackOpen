import { useEffect, useState } from 'react';
import './App.css';
import { Diaries } from './components/Diaries';
import { DiaryEntry } from './types';
import diaryService from "./services/diaries";
import { DiaryForm } from './components/DiaryForm';
import { NewDiaryEntry } from './types';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  
  const handleDiaryCreation = async (newDiary: NewDiaryEntry) => {
    const createdDiary: DiaryEntry = await diaryService.add(newDiary);
    setDiaryEntries(diaryEntries.concat(createdDiary));
  }

  useEffect(() => {
    diaryService.getAll().then((entries) => setDiaryEntries(entries));
  }, [])

  return (
    <div>
      <DiaryForm handleEntryCreation={handleDiaryCreation}></DiaryForm>
      <Diaries diaryEntries={diaryEntries}></Diaries>
    </div>
  );
}

export default App;
