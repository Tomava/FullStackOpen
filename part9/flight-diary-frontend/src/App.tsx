import { useEffect, useState } from 'react';
import './App.css';
import { Diaries } from './components/Diaries';
import { DiaryEntry, ResponseData } from './types';
import diaryService from "./services/diaries";
import { DiaryForm } from './components/DiaryForm';
import { NewDiaryEntry } from './types';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDiaryCreation = async (newDiary: NewDiaryEntry) => {
    const responseData: ResponseData = await diaryService.add(newDiary);
    if (responseData.data) {
      setDiaryEntries(diaryEntries.concat(responseData.data));
    }
    if (responseData.error) {
      setErrorMessage(responseData.error);
    }
  }

  useEffect(() => {
    diaryService.getAll().then((entries) => setDiaryEntries(entries));
  }, [])

  return (
    <div>
      <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
      <DiaryForm handleEntryCreation={handleDiaryCreation}></DiaryForm>
      <Diaries diaryEntries={diaryEntries}></Diaries>
    </div>
  );
}

export default App;
