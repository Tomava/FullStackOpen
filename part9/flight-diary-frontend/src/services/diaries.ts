import axios from "axios"
import { DiaryEntry, NewDiaryEntry, ResponseData } from "../types"
const baseUrl = '/api/diaries'
axios.defaults.baseURL = "http://localhost:3000";

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get(baseUrl)
  return response.data;
}

const add = async (newDiary: NewDiaryEntry) => {
  const returnData: ResponseData = { data: null, error: null };
  try {
    const response = await axios.post(baseUrl, newDiary)
    returnData.data = response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      returnData.error = error.response?.data;
    }
    else if (error instanceof Error) {
      returnData.error = error.message;
    }
    else returnData.error = "Error!";
  }
  return returnData;
}

export default { getAll, add }